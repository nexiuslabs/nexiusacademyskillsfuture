import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { BLOG_POSTS } from '../constants';

const BlogPage: React.FC = () => {
  // Sort by id descending (newest first)
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => b.id - a.id);

  return (
    <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
      <SEO
        title="AI Training Blog | Agentic AI Insights & Guides | Nexius Academy"
        description="Explore the latest insights on agentic AI, business automation, AI training Singapore trends, and practical guides for non-technical professionals looking to master AI skills."
        canonical="/blog"
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0F1829] opacity-95"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-bold text-accent tracking-wide uppercase mb-6">
                AI Training Blog
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Insights on <span className="text-accent">Agentic AI</span> & Business Automation
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Practical guides, industry analysis, and expert perspectives on AI training Singapore professionals need to stay ahead.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-neutral">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="overflow-hidden h-52">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                      <span className="text-6xl opacity-30">📰</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {post.featured && (
                      <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                        Featured
                      </span>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> {post.views} Views
                      </span>
                    </div>

                    <h3 className="font-bold text-primary text-lg mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <span className="text-accent text-sm font-bold uppercase tracking-wide flex items-center gap-1">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {sortedPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Master Agentic AI?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join our SkillsFuture-eligible AI training course designed for non-technical business professionals.
            </p>
            <Link
              to="/courses/agentic-ai"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all"
            >
              Explore Our Courses
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
