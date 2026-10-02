import React from 'react';
const AcademyBrand: React.FC<{ inverse?: boolean }> = ({ inverse = false }) => (
  <span className={`academy-brand${inverse ? ' academy-brand-inverse' : ''}`} aria-label="Nexius Academy">
    <img src={`/images/brand/sculpted-loop-${inverse ? 'white' : 'black'}.svg`} alt="" width="48" height="48" />
    <span className="academy-wordmark" aria-hidden="true"><span>Nexius</span><span>Academy</span></span>
  </span>
);
export default AcademyBrand;
