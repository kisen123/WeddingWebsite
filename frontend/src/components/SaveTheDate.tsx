import './SaveTheDate.scss';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import norwayFlag from '../../assets/norway.png';
import coupleImage from '../../assets/snupperne.jpeg';

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
    <div className="save-the-date">
      <div className="save-the-date__border">
        <p className="save-the-date__STD">Sett av datoen!</p>

        <div className="save-the-date__names">
          <p className="save-the-date__bride">Kaja</p>
          <p className="save-the-date__ampersand">&</p>
          <p className="save-the-date__groom">Kristian</p>
        </div>

        <div className="save-the-date__image-container">
          <img
            src={coupleImage}
            alt="Save the Date"
            className="save-the-date__image"
          />
        </div>

        <div className="save-the-date__date_and_location">
          <a
            ref={locationRef}
            href="https://maps.app.goo.gl/5Nir36Cdf3RzDVrq5"
            target="_blank"
            rel="noopener noreferrer"
            className="save-the-date__location-and-flag-container"
            onMouseEnter={handleLocationMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="save-the-date__location">Elgå, Norge</p>
            <img
              src={norwayFlag}
              alt="Norway flag"
              className="save-the-date__flag"
            />
          </a>

          <p className="save-the-date__date">28. august 2027</p>
        </div>

        <div className="save-the-date__more-info-to-come">
          <p>Mer informasjon kommer!</p>
        </div>
      </div>

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
              title="Elgå, Norge"
              loading="lazy"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
