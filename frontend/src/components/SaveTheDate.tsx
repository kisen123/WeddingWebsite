import './SaveTheDate.scss';

import type { CSSProperties, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import coupleImage from '../../assets/snupperne.jpeg';
import wavyBorderMarkup from '../../assets/wavy_border_thinner.svg?raw';

type DecorationName = 'bow' | 'flower' | 'sparkles';

type DecorationProps = {
  className: string;
  name: DecorationName;
  src?: string;
};

type PannablePhotoProps = {
  alt: string;
  src: string;
  x?: string;
  y?: string;
  scale?: number;
};

type PhotoStyle = CSSProperties & {
  '--photo-scale': number;
  '--photo-x': string;
  '--photo-y': string;
};

const inlineBorderMarkup = wavyBorderMarkup.replace(
  '<svg ',
  '<svg class="save-the-date__border-svg" ',
);

function BowIcon() {
  return (
    <svg viewBox="0 0 72 52" aria-hidden="true">
      <path d="M34 25C23 8 5 8 8 20c2 9 17 9 26 5Zm4 0C49 8 67 8 64 20c-2 9-17 9-26 5ZM36 25c-8 4-10 18-9 24m10-24c8 4 10 18 9 24M34 23c0-6 6-6 6 0 0 6-6 7-6 0Z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 60 80" aria-hidden="true">
      <path d="m30 5 3 9 7 3-7 3-3 9-3-9-7-3 7-3 3-9Zm16 25 2 6 5 2-5 2-2 6-2-6-5-2 5-2 2-6ZM15 42l3 9 7 3-7 3-3 10-3-10-7-3 7-3 3-9Zm24 17 2 6 5 2-5 2-2 6-2-6-5-2 5-2 2-6Z" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg viewBox="0 0 76 92" aria-hidden="true">
      <path d="M36 88c4-25 3-42 2-59M18 48c10 2 16 7 20 14M59 39C49 45 43 52 39 63M36 29c-8-9-9-18-2-21 5-2 7 6 7 14 5-9 13-13 16-7 4 7-5 13-15 15-10 4-20 1-19-6 1-6 8-5 13 5Zm-18 19c-7-7-14-8-16-3-2 6 5 10 15 8 7 7 15 7 16 1 1-6-7-8-15-6Zm41-9c2-9 8-14 13-11 6 4 1 12-10 15-4 9-12 13-16 8-4-6 4-11 13-12Z" />
    </svg>
  );
}

const iconByName: Record<DecorationName, ReactNode> = {
  bow: <BowIcon />,
  flower: <FlowerIcon />,
  sparkles: <SparklesIcon />,
};

function Decoration({ className, name, src }: DecorationProps) {
  return (
    <span
      className={`save-the-date__decoration save-the-date__decoration--${className}`}
      aria-hidden="true"
    >
      {src ? <img src={src} alt="" /> : iconByName[name]}
    </span>
  );
}

function PannablePhoto({
  alt,
  src,
  x = '50%',
  y = '50%',
  scale = 1,
}: PannablePhotoProps) {
  const style: PhotoStyle = {
    '--photo-scale': scale,
    '--photo-x': x,
    '--photo-y': y,
  };

  return (
    <figure className="save-the-date__photo-frame">
      <img src={src} alt={alt} className="save-the-date__photo" style={style} />
    </figure>
  );
}

export default function SaveTheDate() {
  const [showMap, setShowMap] = useState(false);
  const [mapPos, setMapPos] = useState({ top: 0, left: 0 });
  const locationRef = useRef<HTMLAnchorElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLocationMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect();
      setMapPos({ top: rect.bottom + 8, left: rect.left });
    }
    setShowMap(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => setShowMap(false), 100);
  };

  const handleMapMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
  };

  return (
    <main className="save-the-date">
      <article className="save-the-date__card" aria-labelledby="couple-names">
        <div
          className="save-the-date__border"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: inlineBorderMarkup }}
        />

        <div className="save-the-date__content">
          <header className="save-the-date__intro">
            <div className="save-the-date__eyebrow">
              <Decoration className="bow" name="bow" />
              <p>Save the date</p>
              <Decoration className="sparkles-top" name="sparkles" />
            </div>

            <h1 id="couple-names" className="save-the-date__names">
              <span>
                Kaja <i>&amp;</i>
              </span>
              <span>Kristian</span>
            </h1>

            <p className="save-the-date__script-title">Sett av dagen</p>
          </header>

          <PannablePhoto
            src={coupleImage}
            alt="Kaja og Kristian sammen"
            x="50%"
            y="20%"
            scale={1.04}
          />

          <footer className="save-the-date__details">
            <Decoration className="sparkles-bottom" name="sparkles" />
            <Decoration className="flower" name="flower" />

            <a
              ref={locationRef}
              href="https://maps.app.goo.gl/5Nir36Cdf3RzDVrq5"
              target="_blank"
              rel="noopener noreferrer"
              className="save-the-date__location"
              onMouseEnter={handleLocationMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Elgå, Norge
            </a>
            <time className="save-the-date__date" dateTime="2027-08-28">
              28. august 2027
            </time>
            <p className="save-the-date__more-info">Mer informasjon kommer!</p>
          </footer>
        </div>
      </article>

      {showMap &&
        createPortal(
          <div
            className="save-the-date__map-preview"
            style={{ top: mapPos.top, left: mapPos.left }}
            onMouseEnter={handleMapMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <iframe
              src="https://maps.google.com/maps?q=Elg%C3%A5,+Norway&output=embed&z=12"
              title="Kart over Elgå, Norge"
              loading="lazy"
            />
          </div>,
          document.body,
        )}
    </main>
  );
}
