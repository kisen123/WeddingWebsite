import './Countdown.scss';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WEDDING_DATE } from '../../constants/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: t('countdown.days'), value: timeLeft.days },
    { label: t('countdown.hours'), value: timeLeft.hours },
    { label: t('countdown.minutes'), value: timeLeft.minutes },
    { label: t('countdown.seconds'), value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      <p className="countdown__label">{t('countdown.label')}</p>
      <div className="countdown__units">
        {units.map(({ label, value }) => (
          <div key={label} className="countdown__unit">
            <span className="countdown__value">
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown__unit-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
