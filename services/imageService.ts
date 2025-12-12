import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'website-images';

export interface StorageImage {
  name: string;
  url: string;
}

let cachedImages: StorageImage[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchBucketImages(): Promise<StorageImage[]> {
  const now = Date.now();

  if (cachedImages.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedImages;
  }

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error fetching images:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    cachedImages = data
      .filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      .map(file => {
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: urlData.publicUrl
        };
      });

    lastFetchTime = now;
    return cachedImages;
  } catch (error) {
    console.error('Error fetching bucket images:', error);
    return [];
  }
}

export function getRandomImage(images: StorageImage[]): string {
  if (images.length === 0) {
    return 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800';
  }
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex].url;
}

export function getRandomImages(images: StorageImage[], count: number): string[] {
  if (images.length === 0) {
    return Array(count).fill('https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800');
  }

  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(img => img.url);
}
