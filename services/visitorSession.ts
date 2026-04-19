const VISITOR_ID_KEY = 'nexius_visitor_id';
const SESSION_ID_KEY = 'nexius_session_id';
const LANDING_PATH_KEY = 'nexius_landing_path';
const LANDING_REFERRER_KEY = 'nexius_landing_referrer';
const UTM_SOURCE_KEY = 'nexius_utm_source';
const UTM_MEDIUM_KEY = 'nexius_utm_medium';
const UTM_CAMPAIGN_KEY = 'nexius_utm_campaign';

export type VisitorContext = {
  visitorId: string;
  sessionId: string;
  landingPath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
};

const getStorage = (storageType: 'local' | 'session') => {
  if (typeof window === 'undefined') return null;
  return storageType === 'local' ? window.localStorage : window.sessionStorage;
};

const getOrCreateId = (key: string, storageType: 'local' | 'session') => {
  const storage = getStorage(storageType);
  if (!storage) return null;

  let value = storage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    storage.setItem(key, value);
  }

  return value;
};

const setIfMissing = (key: string, value: string | null | undefined, storageType: 'local' | 'session') => {
  const storage = getStorage(storageType);
  if (!storage || !value || storage.getItem(key)) return;
  storage.setItem(key, value);
};

const getStoredValue = (key: string, storageType: 'local' | 'session') => {
  const storage = getStorage(storageType);
  return storage?.getItem(key) || undefined;
};

const getDeviceType = (): VisitorContext['deviceType'] => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const initializeVisitorSession = (pagePath?: string): VisitorContext | null => {
  if (typeof window === 'undefined') return null;

  const visitorId = getOrCreateId(VISITOR_ID_KEY, 'local');
  const sessionId = getOrCreateId(SESSION_ID_KEY, 'session');

  if (!visitorId || !sessionId) return null;

  const currentPath = pagePath || `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const searchParams = new URLSearchParams(window.location.search);

  setIfMissing(LANDING_PATH_KEY, currentPath, 'session');
  setIfMissing(LANDING_REFERRER_KEY, document.referrer || undefined, 'session');
  setIfMissing(UTM_SOURCE_KEY, searchParams.get('utm_source'), 'session');
  setIfMissing(UTM_MEDIUM_KEY, searchParams.get('utm_medium'), 'session');
  setIfMissing(UTM_CAMPAIGN_KEY, searchParams.get('utm_campaign'), 'session');

  return {
    visitorId,
    sessionId,
    landingPath: getStoredValue(LANDING_PATH_KEY, 'session') || currentPath,
    referrer: getStoredValue(LANDING_REFERRER_KEY, 'session'),
    utmSource: getStoredValue(UTM_SOURCE_KEY, 'session'),
    utmMedium: getStoredValue(UTM_MEDIUM_KEY, 'session'),
    utmCampaign: getStoredValue(UTM_CAMPAIGN_KEY, 'session'),
    deviceType: getDeviceType(),
  };
};

export const getVisitorContext = () => initializeVisitorSession();
