import './Rsvp.scss';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { submitRsvp } from '../../api.ts';
import { RsvpFrame } from './RsvpFrame.tsx';

export function Rsvp() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    try {
      const result = await submitRsvp({
        name,
        email,
        attending,
        dietaryRequirements,
        songRequest,
      });

      setMessage(result.message);
      setName('');
      setEmail('');
      setAttending(true);
      setDietaryRequirements('');
      setSongRequest('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('rsvp.error'));
    }
  }

  return (
    <div className="rsvpContents">
      <RsvpFrame>
        <section className="rsvp">
          <div className="rsvp__names">
            <h1 className="rsvp__groom">Kristian</h1>
            <span>&</span>
            <h1 className="rsvp__bride">Kaja</h1>
          </div>

          <div className="rsvp__invitation_text">
            {t('rsvp.invitationText')}
          </div>

          <form className="rsvp__form" onSubmit={handleSubmit}>
            <input
              placeholder={t('rsvp.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder={t('rsvp.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="rsvp__attending">
              <input
                type="checkbox"
                checked={attending}
                onChange={(e) => setAttending(e.target.checked)}
              />
              {t('rsvp.attending')}
            </label>
            <input
              placeholder={t('rsvp.dietaryRequirements')}
              value={dietaryRequirements}
              onChange={(e) => setDietaryRequirements(e.target.value)}
            />
            <input
              placeholder={t('rsvp.songRequest')}
              value={songRequest}
              onChange={(e) => setSongRequest(e.target.value)}
            />
            <button type="submit">{t('rsvp.submit')}</button>
          </form>
          {message && (
            <p className="rsvp__message" aria-live="polite">
              {message}
            </p>
          )}
        </section>
      </RsvpFrame>
    </div>
  );
}
