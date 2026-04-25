import './RsvpFrame.scss';

import type { PropsWithChildren } from 'react';

import RSVPFrameProd from '../../assets/RSVPFrameProd.svg';

export function RsvpFrame({ children }: PropsWithChildren) {
  return (
    <div className="rsvpFrame">
      <img
        className="rsvpFrame__image"
        src={RSVPFrameProd}
        alt=""
        aria-hidden="true"
      />
      <div className="rsvpFrame__content">{children}</div>
    </div>
  );
}
