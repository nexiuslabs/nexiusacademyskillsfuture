import React from 'react';
import ResponsiveImage from '../ResponsiveImage';

const workshopPhotos = [
  {
    src: '/images/workshops/workshop-gallery-01.jpg',
    alt: 'Nexius Labs workshop participants posing together after a hands-on AI session',
  },
  {
    src: '/images/workshops/workshop-gallery-02.jpg',
    alt: 'Nexius Labs workshop group photo in a classroom setting',
  },
  {
    src: '/images/workshops/workshop-gallery-03.jpg',
    alt: 'Participants and trainers giving thumbs up at an AI business workshop',
  },
  {
    src: '/images/workshops/workshop-gallery-04.jpg',
    alt: 'Large cohort group photo at an AI training session',
  },
  {
    src: '/images/workshops/workshop-gallery-05.jpg',
    alt: 'Group photo from a Nexius Labs AI workshop in a learning studio',
  },
  {
    src: '/images/workshops/workshop-gallery-06.jpg',
    alt: 'Participants posing after an AI Ignite masterclass',
  },
  {
    src: '/images/workshops/workshop-gallery-07.jpg',
    alt: 'AI workshop participants working on laptops during a hands-on session',
  },
  {
    src: '/images/workshops/workshop-gallery-08.jpg',
    alt: 'Classroom view of a Nexius Labs AI workshop with participants at tables',
  },
  {
    src: '/images/workshops/workshop-gallery-09.jpg',
    alt: 'Small group selfie after an AI automation session',
  },
];

const WorkshopGallery: React.FC = () => {
  return (
    <section id="workshop-photos" className="bg-white py-20 scroll-mt-32 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-9 max-w-4xl">
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-primary md:text-4xl">
            From past workshops &amp; talks
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 md:text-xl">
            Moments from hands-on sessions, forums, and stages over the past few years.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workshopPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-xl border border-primary/10 bg-neutral shadow-sm"
            >
              <ResponsiveImage
                src={photo.src}
                alt={photo.alt}
                loading={index < 3 ? 'eager' : 'lazy'}
                widths={[480, 768]}
                sizes="(max-width: 1024px) 50vw, 33vw"
                fit="cover"
                className="aspect-[3/2] h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopGallery;
