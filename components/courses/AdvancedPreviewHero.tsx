import { ArrowRight, ArrowDown } from 'lucide-react';
import { ADVANCED_COURSE_SCHEDULES } from '../../constants';
import { openLeadModal } from '../../services/leadModal';
export default function AdvancedPreviewHero() {
  const next = ADVANCED_COURSE_SCHEDULES.find(s => !s.registrationClosed);
  return <section className="academy-advanced-hero"><div className="academy-container">
    <div className="academy-course-breadcrumb"><a href="/#courses">Courses</a><span aria-hidden="true">/</span><span>Advanced Agentic AI</span></div>
    <div className="academy-advanced-layout"><div className="academy-advanced-intro">
      <h1>Agentic AI-Driven Business Innovation for Productivity</h1>
      <p className="academy-course-subtitle">Strategies for the Frontier Firm</p>
      <p>A practical advanced Agentic AI course for anyone who wants to understand Frontier Firm strategy, agent orchestration, governance, and how human-agent work will operate in the future.</p>
      <div className="academy-hero-links"><a href="#curriculum" className="academy-text-link">Explore what you’ll learn <ArrowDown size={18} aria-hidden="true" /></a><a href="#schedule" className="academy-text-link">Check course schedule <ArrowDown size={18} aria-hidden="true" /></a></div>
      <div className="academy-collaboration"><span>In collaboration with</span><img src="/images/partners/temasek-poly-full-color-right-align.png" alt="Temasek Polytechnic collaboration logo" /></div>
    </div><aside className="academy-registration-dossier" aria-label="Course dates and registration">
      <h2>Your next step</h2>
      <dl><div><dt>Next open cohort</dt><dd>{next?.dates || 'Register interest for the next intake'}</dd></div><div className="academy-dossier-format"><div><dt>Format</dt><dd>In person</dd></div><div><dt>Duration</dt><dd>3 days</dd></div></div><div><dt>Net fee from</dt><dd className="academy-dossier-price">S$190.50<span>including GST*</span></dd></div></dl>
      <p className="academy-small">*For eligible Singapore Citizens aged 40+ or eligible SME-sponsored learners. Subject to final eligibility and funding approval.</p>
      <button className="academy-action" type="button" onClick={() => openLeadModal('course_page_cta', 'reserve_seat', {page:'/courses/advanced-agentic-ai',position:'frontier_firm_hero_register_interest',ctaLabel:'register_interest'})}>Apply now <ArrowRight size={18} aria-hidden="true" /></button>
      <a className="academy-text-link" href="#pricing">View all fees and eligibility</a>
      <p className="academy-small">Request help with official registration. An enquiry does not reserve a place.</p>
    </aside></div>
    <nav className="academy-learning-path" aria-label="Explore course themes"><a href="#curriculum"><span>Strategy</span><span>Transformation roadmap</span></a><ArrowRight aria-hidden="true"/><a href="#curriculum"><span>Orchestration</span><span>Human-agent workflows</span></a><ArrowRight aria-hidden="true"/><a href="#curriculum"><span>Governance</span><span>Accountability & control</span></a></nav>
  </div></section>;
}
