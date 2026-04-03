import './WeAreGettingMarried.scss';

import { useTranslation } from 'react-i18next';

export function WeAreGettingMarried() {
  const { t } = useTranslation();

  return (
    <section className="wagm">
      <div className="wagm__date-and-place">
        <div className="wagm__date">28.08.2027</div>
        <div className="wagm__place">Elgå, Norge</div>
      </div>
      <div className="wagm__names">
        <h1 className="wagm__groom">Kristian</h1>
        <span>&</span>
        <h1 className="wagm__bride">Kaja</h1>
      </div>

      <h1>{t('areGettingMarried.title')}</h1>
    </section>
  );
}
