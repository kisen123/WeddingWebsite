import { Header } from "./components/Header/Header.tsx";
import { MainPage } from "./components/MainPage/MainPage.tsx";

export default function App() {
  

  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-height, 7rem)" }}>
        <MainPage />
      </main>
    </>
  );
}