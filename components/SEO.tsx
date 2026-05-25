import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  jsonLd?: object | object[];
}

const DEFAULT_IMAGE = 'https://academy.nexiuslabs.com/images/social/agentic-ai-courses.jpg';
const BASE_URL = 'https://academy.nexiuslabs.com';

const normalizeCanonical = (path?: string) => {
  if (!path || path === '/') return `${BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`}`;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  robots = 'index,follow',
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt = 'Nexius Academy AI training for business teams in Singapore',
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  twitterTitle,
  twitterDescription,
  jsonLd,
}) => {
  const fullCanonical = normalizeCanonical(canonical);
  const image = ogImage || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content={robots} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <link rel="alternate" hrefLang="en-SG" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Nexius Academy" />
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@nexiuslabs" />
      <meta name="twitter:creator" content="@melverick" />

      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
