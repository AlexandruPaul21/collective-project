import MainPage from "./pages/mainPage/MainPage";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsPage from "./pages/mainPage/DonationsPage";
import FavouritesPage from "./pages/mainPage/FavouritesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/favourites" element={<FavouritesPage/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
