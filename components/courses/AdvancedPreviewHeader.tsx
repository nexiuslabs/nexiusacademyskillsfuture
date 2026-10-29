import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import AcademyBrand from '../AcademyBrand';

const courseLinks = [
  { to: '/courses/agentic-ai/', label: 'Agentic AI Foundations (2-Day)' },
  {
    to: '/courses/advanced-agentic-ai/',
    label: 'Business Innovation (3-Day)',
    ariaLabel: 'Agentic AI-Driven Business Innovation for Productivity',
  },
];

export default function AdvancedPreviewHeader() {
  const [open, setOpen] = useState(false);
  const links = [['overview','Overview'],['curriculum','Curriculum'],['pricing','Fees'],['schedule','Schedule'],['instructors','Instructors'],['testimonials','Testimonials'],['faq','FAQ']];
  const closeMenu = () => setOpen(false);
  return <header className="academy-course-header"><div className="academy-container academy-nav-inner"><Link to="/" aria-label="Nexius Academy home"><AcademyBrand /></Link><button className="academy-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="advanced-course-navigation" aria-label={open ? 'Close course menu' : 'Open course menu'}>{open ? <X /> : <Menu />}</button><nav id="advanced-course-navigation" aria-label="Course sections" className={open ? 'academy-course-nav is-open' : 'academy-course-nav'}><details className="academy-course-switcher"><summary>Courses <ChevronDown size={14} aria-hidden="true" /></summary><div>{courseLinks.map((course) => <Link key={course.to} to={course.to} aria-label={'ariaLabel' in course ? course.ariaLabel : undefined} onClick={closeMenu}>{course.label}</Link>)}</div></details>{links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}</nav></div></header>;
}
