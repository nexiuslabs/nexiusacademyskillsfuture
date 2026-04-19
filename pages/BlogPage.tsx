import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { openLeadModal } from '../services/leadModal';
import { Calendar, Eye, ArrowRight, Filter } from 'lucide-react';
import { trackBlogToCourseClick } from '../services/analytics';
import SEO from '../components/SEO';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { BLOG_POSTS } from '../constants';
import { fetchBlogViewCounts, mergeBlogPostsWithViews } from '../services/blogViews';

type BlogFilter = 'All' | 'SME Automation' | 'SkillsFuture' | 'Beginner Guides' | 'Case Studies';

const FILTERS: BlogFilter[] = ['All', 'SME Automation', 'SkillsFuture', 'Beginner Guides', 'Case Studies'];

const BlogPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('All');
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    void fetchBlogViewCounts(BLOG_POSTS.map((post) => post.slug))
      .then(setViewCounts)
      .catch(() => undefined);
  }, []);

  const postsWithViews = useMemo(() => mergeBlogPostsWithViews(BLOG_POSTS, viewCounts), [viewCounts]);
  const sortedPosts = [...postsWithViews].sort((a, b) => b.id - a.id);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') {
      return sortedPosts;
    }

    return sortedPosts.filter((post) => post.category === activeFilter);
  }, [activeFilter, sortedPosts]);

  return (
    <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
      <SEO
        title="AI Training Blog | Agentic AI Insights & Guides | Nexius Academy"
        description="Explore the latest insights on agentic AI, business automation, AI training Singapore trends, and practical guides for non-technical professionals looking to master AI skills."
        canonical="/blog"
      />
      <Navbar />

      <main className="flex-grow">
        <section className="bg-accent text-white pt-24 pb-4 text-center text-sm md:text-base font-semibold tracking-wide">
          <div className="container mx-auto px-6">
            Want to implement this in 2 days?{' '}
            <Link
              to="/courses/agentic-ai"
              onClick={() =>
                trackBlogToCourseClick({
                  sourceArea: 'blog_top_banner',
                  pagePath: '/blog',
                  targetPath: '/courses/agentic-ai',
                })
              }
              className="underline underline-offset-4 font-bold hover:text-primary transition-colors"
            >
              Join our next cohort.
            </Link>
          </div>
        </section>

        <section className="relative w-full pt-20 pb-14 md:pt-24 md:pb-16 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0F1829] opacity-95"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm font-bold text-accent tracking-wide uppercase mb-6">
                <Filter size={14} /> AI Training Blog
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

        <section className="py-14 bg-neutral border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-accent text-white shadow-md'
                        : 'bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="container mx-auto px-6 lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 duration-300"
                  >
                    <div className="overflow-hidden h-52">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {post.featured && (
                          <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            Featured
                          </span>
                        )}
                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

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

                      <p className="text-sm text-gray-500 mb-3 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <p className="text-xs text-gray-600 mb-4">
                        <span className="font-bold text-primary">Best for:</span> {post.bestFor}
                      </p>

                      <span className="text-accent text-sm font-bold uppercase tracking-wide flex items-center gap-1">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-gray-500 bg-white rounded-xl mt-8">
                  <p className="text-xl">No articles in this category yet. Try another filter.</p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-28 space-y-5">
                <div className="bg-white rounded-2xl border border-accent/20 p-6 shadow-sm">
                  <p className="text-xs font-bold tracking-widest uppercase text-accent mb-2">Get Subsidy Estimate</p>
                  <h3 className="text-2xl font-bold text-primary mb-3">Know your net fee before you apply.</h3>
                  <p className="text-sm text-gray-600 mb-5">
                    Check your estimated SkillsFuture-supported payable amount and get the fastest next step to secure your seat.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('blog_inline', 'subsidy_fit', {
                        page: '/blog',
                        position: 'blog_right_rail',
                        ctaLabel: 'get_subsidy_estimate',
                      })
                    }
                    className="w-full inline-flex justify-center items-center gap-2 bg-accent text-white px-5 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                  >
                    Get Subsidy Estimate
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="bg-primary rounded-2xl p-6 text-white">
                  <h4 className="text-lg font-bold mb-2">Want implementation support?</h4>
                  <p className="text-sm text-gray-200 mb-4">
                    Join our next cohort to build one real AI workflow in class with trainer guidance.
                  </p>
                  <Link
                    to="/courses/agentic-ai"
                    onClick={() =>
                      trackBlogToCourseClick({
                        sourceArea: 'blog_right_rail_support_card',
                        pagePath: '/blog',
                        targetPath: '/courses/agentic-ai',
                      })
                    }
                    className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
                  >
                    View next cohort
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
