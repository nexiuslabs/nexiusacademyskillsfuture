import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SCHEDULES, ADVANCED_COURSE_SCHEDULES } from '../../constants';
export default function PreviewCourseList() {
  const foundation = SCHEDULES.find(s => !s.registrationClosed && !s.interestOnly && (s.slotsLeft === undefined || s.slotsLeft > 0));
  const advanced = ADVANCED_COURSE_SCHEDULES.find(s => !s.registrationClosed);
  const courses = [
    {category:'Foundation', title:'Agentic AI Foundations for Non-Technical Professionals', description:'Start with Foundation to build practical no-code workflows.', duration:'16 hours · In person', dates:foundation?.dates || 'Register interest for the next intake', fee:'S$113.03', path:'/courses/agentic-ai/'},
    {category:'Advanced', title:'Advanced Agentic AI', description:'Choose Advanced to develop AI-driven business innovation and productivity initiatives.', duration:'3 days · In person', dates:advanced?.dates || 'Register interest for the next intake', fee:'S$190.50', path:'/courses/advanced-agentic-ai/'}];
  return <section id="courses" className="academy-course-comparison academy-container"><div className="academy-section-intro"><h2>Find the right course for you</h2><p>Build practical no-code workflows with Foundation, or develop AI-driven business innovation with Advanced.</p></div>
    <div className="academy-course-rows">{courses.map(course => <article key={course.category} className="academy-course-row" aria-label={course.category+' course'}>
      <div className="academy-course-story"><h3><Link to={course.path}>{course.title}</Link></h3><p>{course.description}</p><p className="academy-course-trainer">Trainer: Melverick Ng</p></div>
      <dl className="academy-course-logistics"><div><dt>Format</dt><dd>{course.duration}</dd></div><div><dt>Next intake</dt><dd>{course.dates}</dd></div></dl>
      <div className="academy-course-decision"><dl><dt>Fee from</dt><dd>{course.fee}<small>including GST*</small></dd></dl><p className="academy-small">*For eligible enhanced-funded learners. See course page for eligibility and full fees.</p><Link className="academy-action" to={course.path}>Explore {course.category} <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
    </article>)}</div>
    <div className="academy-private-course-note"><p>Planning a private class for your team?</p><Link to="/private-class/" className="academy-text-link">Explore private classes <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </section>;
}
