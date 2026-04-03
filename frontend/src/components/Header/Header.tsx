import './Header.scss';

import { useTranslation } from 'react-i18next';

import { PageButton } from '../PageButton/PageButton';

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="header">
      <nav className="header__nav">
        <PageButton text={t('nav.home')} to="/" />
        <PageButton text={t('nav.info')} to="/info" />
        <PageButton text={t('nav.rsvp')} to="/rsvp" />
        <PageButton text={t('nav.contact')} to="/contact" />
        <PageButton text={t('nav.qA')} to="/q-a" />
      </nav>
    </header>
  );
}
