import { ArrowRight } from 'lucide-react';
import ResponsiveImage from '../ResponsiveImage';
export default function PreviewHero() {
  return <section className="academy-home-hero"><div className="academy-container">
    <div className="academy-welcome-layout">
      <div className="academy-welcome-copy">
        <h1>Practical agentic AI training for non-technical teams</h1>
        <p>Learn no-code AI workflows to draft faster, automate repetitive work, and improve team productivity.</p>
        <div className="academy-welcome-actions"><a href="#courses" className="academy-action">Explore our courses <ArrowRight size={18} aria-hidden="true" /></a><a href="#why-different" className="academy-text-link">Meet your learning experience <ArrowRight size={16} aria-hidden="true" /></a></div>
      </div>
      <figure className="academy-welcome-photo"><ResponsiveImage src="/images/homepage-hero.jpg" alt="Large classroom audience at a Nexius Academy workshop" loading="eager" fetchPriority="high" widths={[768,1200,1600]} sizes="(max-width: 850px) 100vw, 600px" fit="cover" className="academy-welcome-image"/><figcaption>Real people. Practical learning.</figcaption></figure>
    </div>
    <div className="academy-welcome-foundation"><p>SkillsFuture-supported training for working professionals and teams.</p><p>No-code learning. Hands-on practice. Workplace outcomes.</p></div>
  </div></section>;
}
