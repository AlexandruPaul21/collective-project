import MainPage from "./pages/mainPage/MainPage";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsPage from "./pages/donationsPage/DonationsPage";
import FavouritesPage from "./pages/fauvoritesPage/FavouritesPage";

import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VolunteerPage from "./pages/volunteerPage/VolunteerPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />

            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
