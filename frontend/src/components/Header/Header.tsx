import './Header.scss';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageButton } from '../PageButton/PageButton';

const SECTIONS = ['home', 'program', 'rsvp', 'contact', 'qa'] as const;
type SectionId = (typeof SECTIONS)[number];

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Header() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <PageButton
          text={t('nav.home')}
          isActive={activeSection === 'home'}
          onClick={() => scrollToSection('home')}
        />
        <PageButton
          text={t('nav.program')}
          isActive={activeSection === 'program'}
          onClick={() => scrollToSection('program')}
        />
        <PageButton
          text={t('nav.rsvp')}
          isActive={activeSection === 'rsvp'}
          onClick={() => scrollToSection('rsvp')}
        />
        <PageButton
          text={t('nav.contact')}
          isActive={activeSection === 'contact'}
          onClick={() => scrollToSection('contact')}
        />
        <PageButton
          text={t('nav.qA')}
          isActive={activeSection === 'qa'}
          onClick={() => scrollToSection('qa')}
        />
      </nav>
    </header>
  );
}
