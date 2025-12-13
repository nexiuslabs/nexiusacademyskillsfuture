import { supabase } from '../lib/supabase';

export interface ProcessedFile {
  title: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  extractedText: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 10MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are allowed.',
    };
  }

  return { valid: true };
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const pdfjsLib = await import('pdfjs-dist');

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF. The file may be corrupted or password-protected.');
  }
}

export async function extractTextFromWord(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const response = await fetch('/api/extract-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: arrayBuffer,
    });

    if (!response.ok) {
      throw new Error('Failed to extract text from Word document');
    }

    const { text } = await response.json();
    return text;
  } catch (error) {
    console.error('Error extracting text from Word:', error);
    return `[Text extraction from Word documents requires server-side processing. File uploaded: ${file.name}]`;
  }
}

export async function uploadToSupabase(file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('knowledge-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('knowledge-files')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw new Error('Failed to upload file to storage.');
  }
}

export async function processUploadedFile(file: File): Promise<ProcessedFile> {
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  let extractedText = '';

  if (file.type === 'application/pdf') {
    extractedText = await extractTextFromPDF(file);
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword'
  ) {
    extractedText = await extractTextFromWord(file);
  }

  const fileUrl = await uploadToSupabase(file);

  const fileType = file.type === 'application/pdf' ? 'pdf' : 'docx';

  return {
    title: file.name.replace(/\.[^/.]+$/, ''),
    fileUrl,
    fileType,
    fileSize: file.size,
    extractedText,
  };
}

export async function saveFileToDatabase(
  processedFile: ProcessedFile,
  category?: string,
  tags?: string[]
): Promise<void> {
  try {
    const { error } = await supabase.from('knowledge_files').insert({
      title: processedFile.title,
      file_url: processedFile.fileUrl,
      file_type: processedFile.fileType,
      file_size: processedFile.fileSize,
      extracted_text: processedFile.extractedText,
      category: category || null,
      tags: tags || [],
      is_active: true,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving file to database:', error);
    throw new Error('Failed to save file metadata to database.');
  }
}

export async function deleteFileFromStorage(fileUrl: string): Promise<void> {
  try {
    const fileName = fileUrl.split('/').pop();
    if (!fileName) throw new Error('Invalid file URL');

    const { error } = await supabase.storage
      .from('knowledge-files')
      .remove([fileName]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file from storage:', error);
    throw new Error('Failed to delete file from storage.');
  }
}
