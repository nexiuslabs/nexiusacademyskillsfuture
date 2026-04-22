declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

import { getVisitorContext } from './visitorSession';

type FirstPartyEventPayload = {
  elementId?: string;
  elementText?: string;
  sectionId?: string;
  timeOnPageSeconds?: number;
  scrollDepth?: number;
  pagePath?: string;
  metadata?: Record<string, unknown>;
};

const emitFirstPartyEvent = (
  eventName: string,
  params: EventParams = {},
  payload: FirstPartyEventPayload = {}
) => {
  if (typeof window === 'undefined') return;

  const visitorContext = getVisitorContext();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!visitorContext || !supabaseUrl || !supabaseAnonKey) return;

  const pagePath =
    payload.pagePath ||
    (typeof params.page_path === 'string' ? params.page_path : `${window.location.pathname}${window.location.search}${window.location.hash}`);

  void fetch(`${supabaseUrl}/functions/v1/track-visitor-event`, {
    method: 'POST',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({
      visitorId: visitorContext.visitorId,
      sessionId: visitorContext.sessionId,
      eventName,
      pagePath,
      elementId: payload.elementId,
      elementText: payload.elementText,
      sectionId: payload.sectionId,
      timeOnPageSeconds: payload.timeOnPageSeconds,
      scrollDepth: payload.scrollDepth,
      metadata: {
        ...params,
        landing_path: visitorContext.landingPath,
        referrer: visitorContext.referrer,
        utm_source: visitorContext.utmSource,
        utm_medium: visitorContext.utmMedium,
        utm_campaign: visitorContext.utmCampaign,
        device_type: visitorContext.deviceType,
        ...payload.metadata,
      },
    }),
  }).catch(() => undefined);
};

export const trackEvent = (
  eventName: string,
  params: EventParams = {},
  payload: FirstPartyEventPayload = {}
) => {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', eventName, params);
  emitFirstPartyEvent(eventName, params, payload);
};

export const trackSessionStarted = (params: {
  pagePath: string;
  referrer?: string;
}) => {
  trackEvent(
    'session_started',
    {
      page_path: params.pagePath,
      referrer: params.referrer,
    },
    {
      pagePath: params.pagePath,
      metadata: {
        referrer: params.referrer,
      },
    }
  );
};

export const trackPageView = (params: {
  pagePath: string;
  referrer?: string;
}) => {
  trackEvent(
    'page_view',
    {
      page_path: params.pagePath,
      referrer: params.referrer,
    },
    {
      pagePath: params.pagePath,
      metadata: {
        referrer: params.referrer,
      },
    }
  );
};

export const trackPageExit = (params: {
  pagePath: string;
  timeOnPageSeconds: number;
  exitReason: 'route_change' | 'pagehide';
}) => {
  trackEvent(
    'page_exit',
    {
      page_path: params.pagePath,
      time_on_page_seconds: params.timeOnPageSeconds,
      exit_reason: params.exitReason,
    },
    {
      pagePath: params.pagePath,
      timeOnPageSeconds: params.timeOnPageSeconds,
      metadata: {
        exit_reason: params.exitReason,
      },
    }
  );
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
  }, {
    pagePath: params.page,
    elementId: params.position,
    elementText: params.ctaLabel,
    metadata: {
      destination_type: params.destinationType,
      destination: params.destination,
    },
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
  }, {
    pagePath: params.pagePath,
    elementId: 'lead_capture_modal',
    metadata: {
      source_tag: params.sourceTag,
      intent: params.intent,
      open_method: params.openMethod,
    },
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
  }, {
    pagePath: params.pagePath,
    elementId: 'lead_capture_form',
    metadata: {
      source_tag: params.sourceTag,
      intent: params.intent,
      status: params.status,
    },
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
  }, {
    pagePath: params.pagePath,
    elementId: params.position,
    metadata: {
      channel: params.channel,
    },
  });
};

export const trackCourseScrollDepth = (params: { depthPercent: number; pagePath: string }) => {
  trackEvent('course_scroll_depth', {
    depth_percent: params.depthPercent,
    page_path: params.pagePath,
  }, {
    pagePath: params.pagePath,
    scrollDepth: params.depthPercent,
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
  }, {
    pagePath: params.pagePath,
    metadata: {
      source_area: params.sourceArea,
      target_path: params.targetPath,
    },
  });
};

export const trackSectionView = (params: {
  eventName: string;
  pagePath: string;
  sectionId: string;
}) => {
  trackEvent(
    params.eventName,
    {
      page_path: params.pagePath,
      section_id: params.sectionId,
    },
    {
      pagePath: params.pagePath,
      sectionId: params.sectionId,
    }
  );
};

export const trackTimeOnPage = (params: {
  pagePath: string;
  seconds: number;
}) => {
  const eventName = `time_on_page_${params.seconds}s`;
  trackEvent(
    eventName,
    {
      page_path: params.pagePath,
      time_on_page_seconds: params.seconds,
    },
    {
      pagePath: params.pagePath,
      timeOnPageSeconds: params.seconds,
    }
  );
};

export const trackLeadFormStarted = (params: {
  sourceTag: string;
  intent: string;
  pagePath: string;
}) => {
  trackEvent(
    'lead_form_started',
    {
      source_tag: params.sourceTag,
      intent: params.intent,
      page_path: params.pagePath,
    },
    {
      pagePath: params.pagePath,
      elementId: 'lead_capture_form',
      metadata: {
        source_tag: params.sourceTag,
        intent: params.intent,
      },
    }
  );
};

export const trackLeadFormFieldCompleted = (params: {
  pagePath: string;
  fieldName: string;
  intent: string;
}) => {
  trackEvent(
    'lead_form_field_completed',
    {
      page_path: params.pagePath,
      field_name: params.fieldName,
      intent: params.intent,
    },
    {
      pagePath: params.pagePath,
      elementId: params.fieldName,
      metadata: {
        intent: params.intent,
      },
    }
  );
};

export const trackLeadModalClose = (params: {
  sourceTag: string;
  intent: string;
  pagePath: string;
}) => {
  trackEvent(
    'lead_modal_close',
    {
      source_tag: params.sourceTag,
      intent: params.intent,
      page_path: params.pagePath,
    },
    {
      pagePath: params.pagePath,
      elementId: 'lead_capture_modal',
      metadata: {
        source_tag: params.sourceTag,
        intent: params.intent,
      },
    }
  );
};

export const trackRegistrationPathSelected = (params: {
  pagePath: string;
  payerType: 'self' | 'company_sponsored';
  sourceTag: string;
}) => {
  trackEvent(
    'registration_path_selected',
    {
      page_path: params.pagePath,
      payer_type: params.payerType,
      source_tag: params.sourceTag,
    },
    {
      pagePath: params.pagePath,
      elementId: 'registration_path_selector',
      metadata: {
        payer_type: params.payerType,
        source_tag: params.sourceTag,
      },
    }
  );
};

export const trackAdvisorInteraction = (params: {
  action: 'open' | 'close' | 'whatsapp_click';
  pagePath: string;
}) => {
  const eventName =
    params.action === 'whatsapp_click' ? 'advisor_widget_whatsapp_click' : `advisor_widget_${params.action}`;

  trackEvent(
    eventName,
    {
      page_path: params.pagePath,
    },
    {
      pagePath: params.pagePath,
      elementId: 'advisor_widget',
    }
  );
};
