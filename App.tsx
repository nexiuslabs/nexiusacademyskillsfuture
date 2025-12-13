import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import BlogPostPage from './pages/BlogPostPage';
import EnterpriseAIInsightsPage from './pages/EnterpriseAIInsightsPage';
import AnthropicAISkillsPage from './pages/AnthropicAISkillsPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses/agentic-ai" element={<CoursePage />} />
          <Route path="/blog/beyond-chatgpt-ai-powered-company" element={<BlogPostPage />} />
          <Route path="/blog/enterprise-ai-insights" element={<EnterpriseAIInsightsPage />} />
          <Route path="/blog/anthropic-ai-skills" element={<AnthropicAISkillsPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;