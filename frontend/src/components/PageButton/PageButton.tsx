import './PageButton.scss';

import { useState } from 'react';
import { NavLink } from 'react-router';

export function PageButton({ text, to }: { text: string; to: string }) {
  const [clicking, setClicking] = useState(false);

  function handleClick() {
    setClicking(true);
    setTimeout(() => setClicking(false), 80);
  }

  return (
    <NavLink
      className={({ isActive }) =>
        [
          'page-button',
          clicking && 'page-button--clicking',
          isActive ? 'page-button--active' : 'page-button--inactive',
        ]
          .filter(Boolean)
          .join(' ')
      }
      to={to}
      onClick={handleClick}
      end={to === '/'}
    >
      {text}
    </NavLink>
  );
}
