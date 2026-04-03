import './PageButton.scss';

import { useState } from 'react';

export function PageButton({
  text,
  isActive,
  onClick,
}: {
  text: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [clicking, setClicking] = useState(false);

  function handleClick() {
    setClicking(true);
    setTimeout(() => setClicking(false), 80);
    onClick();
  }

  return (
    <button
      className={[
        'page-button',
        clicking && 'page-button--clicking',
        isActive ? 'page-button--active' : 'page-button--inactive',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
