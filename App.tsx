import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EnterpriseAIInsightsPage from './pages/EnterpriseAIInsightsPage';
import AnthropicAISkillsPage from './pages/AnthropicAISkillsPage';
import WhatIsAgenticAIPage from './pages/WhatIsAgenticAIPage';
import BestAICoursesPage from './pages/BestAICoursesPage';
import SMEsNoCodeAIPage from './pages/SMEsNoCodeAIPage';
import CorporateAILiteracyPage from './pages/CorporateAILiteracyPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import SkillsFutureFundingGuidePage from './pages/SkillsFutureFundingGuidePage';
import FrontierFirmCoursePage from './pages/FrontierFirmCoursePage';
import AccountantCspLandingPage from './pages/AccountantCspLandingPage';
import CorporateClassLandingPage from './pages/CorporateClassLandingPage';
import PrivateClassPage from './pages/PrivateClassPage';
import ScrollToTop from './components/ScrollToTop';
import AIAdvisor from './components/courses/AIAdvisor';
import LeadCaptureModal from './components/leads/LeadCaptureModal';
import { initializeVisitorSession } from './services/visitorSession';
import { trackPageExit, trackPageView, trackSessionStarted } from './services/analytics';
import { recordBlogArticleView } from './services/blogViews';

const AppShell: React.FC = () => {
  const location = useLocation();
  const previousPathRef = useRef<string | null>(null);
  const pageStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const context = initializeVisitorSession(currentPath);

    if (context) {
      trackSessionStarted({
        pagePath: currentPath,
        referrer: context.referrer,
      });
    }
  }, []);

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const now = Date.now();

    if (previousPathRef.current) {
      trackPageExit({
        pagePath: previousPathRef.current,
        timeOnPageSeconds: Math.max(1, Math.round((now - pageStartTimeRef.current) / 1000)),
        exitReason: 'route_change',
      });
    }

    trackPageView({
      pagePath: currentPath,
      referrer: document.referrer || undefined,
    });

    const articleMatch = location.pathname.match(/^\/blog\/([^/]+)$/);
    if (articleMatch) {
      void recordBlogArticleView(articleMatch[1]).catch(() => undefined);
    }

    previousPathRef.current = currentPath;
    pageStartTimeRef.current = now;
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    const handlePageHide = () => {
      if (!previousPathRef.current) return;

      trackPageExit({
        pagePath: previousPathRef.current,
        timeOnPageSeconds: Math.max(1, Math.round((Date.now() - pageStartTimeRef.current) / 1000)),
        exitReason: 'pagehide',
      });
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skillsfuture-funding-guide" element={<SkillsFutureFundingGuidePage />} />
        <Route path="/courses/agentic-ai" element={<CoursePage />} />
        <Route path="/private-class" element={<PrivateClassPage />} />
        <Route path="/courses/agentic-ai-company-class" element={<CorporateClassLandingPage />} />
        <Route path="/courses/frontier-firm-agent-boss" element={<FrontierFirmCoursePage />} />
        <Route path="/courses/agentic-ai-accountants" element={<AccountantCspLandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/beyond-chatgpt-ai-powered-company" element={<BlogPostPage />} />
        <Route path="/blog/enterprise-ai-insights" element={<EnterpriseAIInsightsPage />} />
        <Route path="/blog/anthropic-ai-skills" element={<AnthropicAISkillsPage />} />
        <Route path="/blog/what-is-agentic-ai-guide" element={<WhatIsAgenticAIPage />} />
        <Route path="/blog/best-ai-courses-singapore-2026" element={<BestAICoursesPage />} />
        <Route path="/blog/smes-no-code-ai-automation-singapore" element={<SMEsNoCodeAIPage />} />
        <Route path="/blog/ai-literacy-corporate-learning-2026" element={<CorporateAILiteracyPage />} />
      </Routes>
      <AIAdvisor />
      <LeadCaptureModal />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default App;
