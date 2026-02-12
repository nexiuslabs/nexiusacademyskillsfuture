import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EnterpriseAIInsightsPage from './pages/EnterpriseAIInsightsPage';
import AnthropicAISkillsPage from './pages/AnthropicAISkillsPage';
import WhatIsAgenticAIPage from './pages/WhatIsAgenticAIPage';
import BestAICoursesPage from './pages/BestAICoursesPage';
import SMEsNoCodeAIPage from './pages/SMEsNoCodeAIPage';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses/agentic-ai" element={<CoursePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/beyond-chatgpt-ai-powered-company" element={<BlogPostPage />} />
        <Route path="/blog/enterprise-ai-insights" element={<EnterpriseAIInsightsPage />} />
        <Route path="/blog/anthropic-ai-skills" element={<AnthropicAISkillsPage />} />
        <Route path="/blog/what-is-agentic-ai-guide" element={<WhatIsAgenticAIPage />} />
        <Route path="/blog/best-ai-courses-singapore-2026" element={<BestAICoursesPage />} />
        <Route path="/blog/smes-no-code-ai-automation-singapore" element={<SMEsNoCodeAIPage />} />
      </Routes>
    </Router>
  );
};

export default App;