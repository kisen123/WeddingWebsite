import './MainPage.scss';

import { ContactPage } from '../../pages/ContactPage.tsx';
import { ProgramPage } from '../../pages/ProgramPage.tsx';
import { QaPage } from '../../pages/QaPage.tsx';
import { RsvpPage } from '../../pages/RsvpPage.tsx';
import { WeAreGettingMarried } from '../WeAreGettingMarried/WeAreGettingMarried.tsx';

export function MainPage() {
  return (
    <main className="main-page">
      <section id="home">
        <WeAreGettingMarried />
      </section>
      <section id="program">
        <ProgramPage />
      </section>
      <section id="rsvp">
        <RsvpPage />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
      <section id="qa">
        <QaPage />
      </section>
    </main>
  );
}
