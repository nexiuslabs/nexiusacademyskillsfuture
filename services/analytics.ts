declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', eventName, params);
};

export const trackCtaClick = (params: {
  page: string;
  position: string;
  ctaLabel: string;
  destinationType: 'internal' | 'external' | 'modal';
  destination?: string;
}) => {
  trackEvent('cta_click', {
    page: params.page,
    position: params.position,
    cta_label: params.ctaLabel,
    destination_type: params.destinationType,
    destination: params.destination,
  });
};

export const trackLeadModalOpen = (params: {
  sourceTag: string;
  intent: string;
  pagePath: string;
  openMethod: 'cta_click' | 'query_auto_open';
}) => {
  trackEvent('lead_form_open', {
    source_tag: params.sourceTag,
    intent: params.intent,
    page_path: params.pagePath,
    open_method: params.openMethod,
  });
};

export const trackLeadFormSubmit = (params: {
  sourceTag: string;
  intent: string;
  pagePath: string;
  status: 'success' | 'failed';
}) => {
  trackEvent('lead_form_submit', {
    source_tag: params.sourceTag,
    intent: params.intent,
    page_path: params.pagePath,
    status: params.status,
  });
};

export const trackOutboundClick = (params: {
  channel: 'skillsfuture' | 'whatsapp';
  pagePath: string;
  position: string;
}) => {
  trackEvent('outbound_click', {
    channel: params.channel,
    page_path: params.pagePath,
    position: params.position,
  });
};

export const trackCourseScrollDepth = (params: { depthPercent: number; pagePath: string }) => {
  trackEvent('course_scroll_depth', {
    depth_percent: params.depthPercent,
    page_path: params.pagePath,
  });
};

export const trackBlogToCourseClick = (params: {
  sourceArea: string;
  pagePath: string;
  targetPath: string;
}) => {
  trackEvent('blog_to_course_click', {
    source_area: params.sourceArea,
    page_path: params.pagePath,
    target_path: params.targetPath,
  });
};
