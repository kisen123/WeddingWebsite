import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { InfoPage } from "./pages/InfoPage.tsx";
import { RsvpPage } from "./pages/RsvpPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { QaPage } from "./pages/QaPage.tsx";
import "./App.scss";

export default function App() {
  return (
    <div className="wedding-app">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/rsvp" element={<RsvpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/q-a" element={<QaPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}