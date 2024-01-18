import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import logo from "@/pages/userPage/cogs-hd.jpg";
import {Toaster} from "@/components/ui/toaster.tsx";
import "./ProfilePage.css";
const UserProfilePage: React.FC = () => {
  return (
      <div className="flex flex-col justify-center items-center">
        <Navbar/>

        <div >
          <div className="flex  w-full">

            {/* USERPROFILE FORM */}
            <div
              className="flex w-2/5 flex-col items-center justify-center rounded-r-[80px] border-b-[3px]  border-r-[3px] border-t-[3px]
         border-[#A1E7FF] bg-[#F5F5F5] shadow-2xl"
            >
              <div className="w-1/2 scale-150 space-y-6">
                <div className="font-overpass text-darkgray  text-2xl font-extrabold tracking-wider">
                  My Profile
                </div>
                <UserProfile/>
              </div>
              <Toaster/>
            </div>


            {/* IMAGE */}
            <div className="flex-column flex w-3/5 items-center justify-center ">
              <img
                className="sm:p-[80px] lg:p-[110px]"
                src={logo}
                alt="user profile img"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfilePage;
