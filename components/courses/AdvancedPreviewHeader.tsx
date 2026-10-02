import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AcademyBrand from '../AcademyBrand';
export default function AdvancedPreviewHeader() {
  const [open, setOpen] = useState(false);
  const links = [['overview','Overview'],['curriculum','Curriculum'],['pricing','Fees'],['schedule','Schedule'],['instructors','Instructors'],['testimonials','Testimonials'],['faq','FAQ']];
  return <header className="academy-course-header"><div className="academy-container academy-nav-inner"><Link to="/" aria-label="Nexius Academy home"><AcademyBrand /></Link><button className="academy-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="advanced-course-navigation" aria-label={open ? 'Close course menu' : 'Open course menu'}>{open ? <X /> : <Menu />}</button><nav id="advanced-course-navigation" aria-label="Course sections" className={open ? 'academy-course-nav is-open' : 'academy-course-nav'}>{links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav></div></header>;
}
