import './App.scss';

import { useEffect } from 'react';

import { Header } from './components/Header/Header.tsx';
import { MainPage } from './components/MainPage/MainPage.tsx';

export default function App() {
  useEffect(() => {
    window.history.replaceState(null, '', '/');
  }, []);

  return (
    <div className="wedding-app">
      <Header />
      <MainPage />
    </div>
  );
}
