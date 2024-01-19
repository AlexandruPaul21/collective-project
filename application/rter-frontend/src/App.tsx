import MainPage from "./pages/mainPage/MainPage";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsPage from "./pages/donationsPage/DonationsPage";
import FavouritesPage from "./pages/favouritesPage/FavouritesPage";

import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VolunteerPage from "./pages/volunteerPage/VolunteerPage";
import { Toaster } from "sonner";
import UserProfilePage from "@/pages/userPage/UserProfilePage";
import { SearchProvider } from "./components/providers/SearchProvider";
import ChooseDonationMethodPage from "./pages/donatePages/ChooseDonationMethodPage";
import DonateMoney from "./pages/donatePages/donateMoney/DonateMoney";
import DonateItems from "./pages/donatePages/donateItems/DonateItems";

function App() {
  return (
    <>
      <SearchProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Toaster />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/donations" element={<DonationsPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route
                path="/donate/:ngoId/:emailFlag"
                element={<ChooseDonationMethodPage />}
              />
              <Route path="/donate/items/:ngoId" element={<DonateItems />} />
              <Route path="/donate/money/:ngoId" element={<DonateMoney />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route
                path="/volunteer/:ngoId/:ngoEmail"
                element={<VolunteerPage />}
              />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;
