import MainPage from "./pages/mainPage/MainPage";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsPage from "./pages/mainPage/DonationsPage";
import FavouritesPage from "./pages/mainPage/FavouritesPage";

import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/favourites" element={<FavouritesPage/>} />

            <Route path="/sign-in" element={<SignInPage/>} />
            <Route path="/sign-up" element={<SignUpPage/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
