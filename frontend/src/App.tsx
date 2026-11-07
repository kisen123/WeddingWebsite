import './App.scss';

import { lazy, Suspense, useEffect } from 'react';

import { Header } from './components/Header/Header.tsx';
import { MainPage } from './components/MainPage/MainPage.tsx';

// The original save-the-date card lives on its own route. It is lazy-loaded so
// its global CSS variables and handwritten font only load on that page.
const SaveTheDate = lazy(
  () => import('./components/SaveTheDate/SaveTheDate.tsx'),
);

export const SAVE_THE_DATE_PATH = '/save-the-date';

function isSaveTheDateRoute() {
  return window.location.pathname.replace(/\/+$/, '') === SAVE_THE_DATE_PATH;
}

function WeddingSite() {
  useEffect(() => {
    // Sections are navigated by scrolling; keep the URL clean.
    window.history.replaceState(null, '', '/');
  }, []);

  return (
    <div className="wedding-app">
      <Header />
      <MainPage />
    </div>
  );
}

export default function App() {
  if (isSaveTheDateRoute()) {
    return (
      <Suspense fallback={null}>
        <SaveTheDate />
      </Suspense>
    );
  }

  return <WeddingSite />;
}
