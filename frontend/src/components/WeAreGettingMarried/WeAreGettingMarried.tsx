import './WeAreGettingMarried.scss';

import { useTranslation } from 'react-i18next';

import { WEDDING_DATE_DISPLAY, WEDDING_PLACE } from '../../constants/wedding';
import { Countdown } from '../Countdown/Countdown.tsx';

export function WeAreGettingMarried() {
  const { t } = useTranslation();

  return (
    <section className="wagm">
      <div className="wagm__date-and-place">
        <div className="wagm__date">{WEDDING_DATE_DISPLAY}</div>
        <div className="wagm__place">{WEDDING_PLACE}</div>
      </div>
      <div className="wagm__names">
        <h1 className="wagm__bride">Kaja</h1>
        <span>&</span>
        <h1 className="wagm__groom">Kristian</h1>
      </div>

      <h1 className="wagm__title">{t('areGettingMarried.title')}</h1>
      <Countdown />
    </section>
  );
}
