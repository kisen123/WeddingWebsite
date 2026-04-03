import './App.scss';

import { Header } from './components/Header/Header.tsx';
import { MainPage } from './components/MainPage/MainPage.tsx';

export default function App() {
  return (
    <div className="wedding-app">
      <Header />
      <MainPage />
    </div>
  );
}
