import SignUpForm from "@/components/SignUpForm";
import logo from "./LoginImage.png";
import {Link} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";

const SignUpPage = () => {
  return (
    <div className="">
      <div className="flex h-screen w-full">
        {/* IMAGE */}
        <div className="flex-column flex w-3/5 items-center justify-center ">
          <img
            className="sm:p-[80px] lg:p-[100px]"
            src={logo}
            alt="login img"
          />
        </div>

        {/* SIGNUP FORM */}
        <div
          className=" flex w-2/5 flex-col items-center justify-center rounded-l-[80px] border-b-4  border-l-4 border-t-4
         border-[#88C8FB] bg-[#F5F5F5] shadow-2xl"
        >
          <div className="w-3/5 scale-125 space-y-7">
            <div className="font-overpass text-darkgray  text-3xl font-extrabold tracking-wider">
              WELCOME!
            </div>
            <div className="font-nunito text-darkgray  font] text-sm tracking-wider">
              Already have an account,{" "}
              <Link
                to="/sign-in"
                className="text-lightblu font-semibold hover:text-[#2076C1]"
              >
                Sign in
              </Link>
            </div>
            <SignUpForm/>
          </div>
          <Toaster/>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
