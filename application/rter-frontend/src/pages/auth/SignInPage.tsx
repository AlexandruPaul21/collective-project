import SignInForm from "@/components/SignInForm";
import logo from "./LoginImage.png";
import {Link} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import "./Login.css";


// The sign-in page
// Contains the sign-in form, a link to the sign-up page and an image
// Has 2 different layouts for small and large screens
// Shows a toast message if the credentials are invalid
const SignInPage = () => {
  return (
    <div className="">

      {/* BIG SCREENS */}
      <div className="hidden lg:flex loginwrapper w-full">

        {/* IMAGE */}
        <div className="flex-column flex w-3/5 items-center justify-center ">
          <img
            // className="sm:p-[80px] lg:p-[100px]"
            src={logo}
            alt="login img"
          />
        </div>

        {/* SIGNIN FORM */}
        <div
          className=" flex w-2/5 flex-col items-center justify-center
          rounded-l-[80px] border-b-4  border-l-4 border-t-4
         border-[#88C8FB] bg-[#F5F5F5] shadow-2xl"
        >
          <div className="w-1/2 scale-150 space-y-6">
            <div className="font-overpass text-darkgray  text-2xl font-extrabold tracking-wider">
              WELCOME BACK!
            </div>
            <div className="font-nunito text-darkgray  font] text-sm tracking-wider">
              Don't have an account,{" "}
              <Link
                to="/sign-up"
                className="text-lightblu font-semibold hover:text-[#2076C1]"
              >
                Sign up
              </Link>
            </div>
            <SignInForm/>
          </div>
          <Toaster/>
        </div>
      </div>

      {/* SMALL SCREENS */}
      <div className="loginwrapper lg:hidden flex items-center justify-center">
        <div className="flex h-[600px] justify-center">
          <div
            className=" flex small-screen-login-container  flex-col items-center justify-center rounded-[80px] border-4
         border-[#88C8FB] bg-[#F5F5F5] shadow-2xl"
          >
            <div className="w-1/2 scale-125 space-y-6">
              <div className="font-overpass text-darkgray  text-2xl font-extrabold tracking-wider">
                WELCOME BACK!
              </div>
              <div className="font-nunito text-darkgray  font] text-sm tracking-wider">
                Don't have an account,{" "}
                <Link
                  to="/sign-up"
                  className="text-lightblu font-semibold hover:text-[#2076C1]"
                >
                  Sign up
                </Link>
              </div>
              <SignInForm/>
            </div>
            <Toaster/>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignInPage;
