import { ArrowRight, ArrowDown, CheckCircle } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';
import { SCHEDULES } from '../../constants';

export default function CourseHero() {
  const next = SCHEDULES.find(s => !s.registrationClosed && !s.interestOnly && (s.slotsLeft === undefined || s.slotsLeft > 0));
  return <section className="academy-advanced-hero academy-foundation-hero"><div className="academy-container">
    <div className="academy-course-breadcrumb"><a href="/#courses">Courses</a><span aria-hidden="true">/</span><span>Agentic AI Foundations</span></div>
    <div className="academy-advanced-layout"><div className="academy-advanced-intro">
      <h1>Agentic AI Foundations for Non-Technical Professionals</h1>
      <p className="academy-course-subtitle">Enhancing Productivity and Business Process Automation</p>
      <p>Turn one everyday work task into an AI workflow, with guided practice and human review. No coding background required.</p>
      <a href="#curriculum" className="academy-text-link">Explore what you’ll learn <ArrowDown size={18} aria-hidden="true" /></a>
      <ul className="academy-foundation-benefits"><li><CheckCircle size={18} aria-hidden="true" /> SkillsFuture Eligible</li><li><CheckCircle size={18} aria-hidden="true" /> No coding required</li><li><CheckCircle size={18} aria-hidden="true" /> Up to 90% Subsidy</li></ul>
    </div><aside className="academy-registration-dossier" aria-label="Course dates and registration">
      <h2>Your next step</h2>
      <dl><div><dt>Next open cohort</dt><dd>{next?.dates ?? 'Next intake to be confirmed'}</dd></div><div><dt>Class hours</dt><dd>{next?.time ?? '16 hours over two days'}</dd></div><div className="academy-dossier-format"><div><dt>Format</dt><dd>In person</dd></div><div><dt>Duration</dt><dd>2 days · 16 hours</dd></div></div><div><dt>Venue</dt><dd>{next?.venue ?? 'Venue to be confirmed'}</dd></div><div><dt>Net fee from</dt><dd className="academy-dossier-price">S$113.03<span>including GST*</span></dd></div></dl>
      <a className="academy-foundation-other-dates" href="#schedule">Other dates <ArrowDown size={14} aria-hidden="true" /></a>
      <p className="academy-small">*Subject to final learner eligibility and funding approval.</p>
      <button id="foundation-hero-register" className="academy-action" type="button" onClick={() => openLeadModal('course_page_cta', 'reserve_seat', {
        page: '/courses/agentic-ai', position: 'course_hero_registration_help', ctaLabel: 'get_help_registering', courseSlug: 'agentic-ai', cohortCode: next?.cohortCode,
        preferredIntake: next ? `${next.dates} (${next.time})` : undefined,
      })}>{next ? 'Sign Me Up' : 'Register Interest'} <ArrowRight size={18} aria-hidden="true" /></button>
      <a className="academy-text-link" href="#pricing">View all fees and eligibility</a>
      <p className="academy-small">Request help with official registration. An enquiry does not reserve a place.</p>
    </aside></div>
  </div></section>;
}
