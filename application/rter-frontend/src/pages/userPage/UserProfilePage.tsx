import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import logo from "@/pages/userPage/cogs-hd.jpg";
import {Toaster} from "@/components/ui/toaster.tsx";
import "./ProfilePage.css";


// The user profile page
// Contains the user profile form and an image
// Has 2 different layouts for small and large screens
// Shows a toast message if any modified data is invalid
const UserProfilePage: React.FC = () => {
  return (
      <div className="flex flex-col justify-center items-center">
        <Navbar/>

        {/* BIG SCREEN */}
        <div className="profilepageheight hidden lg:flex w-full">

            {/* USERPROFILE FORM */}
            <div
              className="profileheight flex w-2/5 flex-col items-center justify-center
              rounded-r-[80px] border-b-[3px]  border-r-[3px] border-t-[3px]
         border-[#A1E7FF] bg-[#F5F5F5] shadow-2xl"
            >
              <div className="w-1/2 scale-125  space-y-6">
                <div className="font-overpass text-darkgray
                text-2xl font-extrabold tracking-wider">
                  My Profile
                </div>
                <UserProfile/>
              </div>
              <Toaster/>
            </div>

            {/* IMAGE */}
            <div className="profileheight flex-column flex w-3/5 items-center justify-center ">
              <img
                className="w-[500px] h-[500px]"
                src={logo}
                alt="user profile img"
              />
          </div>
        </div>


      {/*  SMALL SCREEN */}
        <div className="profilepageheight  lg:hidden flex items-center justify-center">
          <div className=" flex h-[600px] justify-center">
            <div
              className=" p-8 flex flex-col items-center justify-center
              rounded-[80px] border-[3px] border-[#A1E7FF] bg-[#F5F5F5] shadow-2xl"
            >
              <div className="space-y-6">
                <div className="font-overpass text-darkgray
                text-2xl font-extrabold tracking-wider">
                  My Profile
                </div>
                <UserProfile/>
              </div>
              <Toaster/>
            </div>
          </div>
        </div>


      </div>
  );
};

export default UserProfilePage;
