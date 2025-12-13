import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import BlogPostPage from './pages/BlogPostPage';
import EnterpriseAIInsightsPage from './pages/EnterpriseAIInsightsPage';
import AnthropicAISkillsPage from './pages/AnthropicAISkillsPage';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/layouts/MainLayout';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/courses/agentic-ai" element={<MainLayout><CoursePage /></MainLayout>} />
        <Route path="/blog/beyond-chatgpt-ai-powered-company" element={<BlogPostPage />} />
        <Route path="/blog/enterprise-ai-insights" element={<EnterpriseAIInsightsPage />} />
        <Route path="/blog/anthropic-ai-skills" element={<AnthropicAISkillsPage />} />
      </Routes>
    </Router>
  );
};

export default App;