import React from 'react';

type ResponsiveImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  widths?: number[];
  sizes?: string;
  fit?: 'contain' | 'cover' | 'fill';
  fetchPriority?: 'high' | 'low' | 'auto';
};

const DEFAULT_WIDTHS = [480, 768, 1200];

const isOptimizable = (src?: string) =>
  Boolean(src && (src.startsWith('/') || src.startsWith('https://')));

const canUseNetlifyImageCdn = () => {
  if (typeof window === 'undefined') return false;
  return !['localhost', '127.0.0.1'].includes(window.location.hostname);
};

const imageCdnUrl = (src: string, width: number, fit: ResponsiveImageProps['fit']) => {
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: '78',
  });

  if (fit) {
    params.set('fit', fit);
  }

  return `/.netlify/images?${params.toString()}`;
};

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  widths = DEFAULT_WIDTHS,
  sizes = '(max-width: 768px) 100vw, 50vw',
  fit,
  loading = 'lazy',
  decoding = 'async',
  srcSet,
  className,
  ...props
}) => {
  const generatedSrcSet =
    !srcSet && isOptimizable(src) && canUseNetlifyImageCdn()
      ? widths.map((width) => `${imageCdnUrl(src as string, width, fit)} ${width}w`).join(', ')
      : srcSet;

  return (
    <img
      {...props}
      src={src}
      srcSet={generatedSrcSet}
      sizes={generatedSrcSet ? sizes : undefined}
      loading={loading}
      decoding={decoding}
      className={className ? `block ${className}` : 'block'}
    />
  );
};

export default ResponsiveImage;
