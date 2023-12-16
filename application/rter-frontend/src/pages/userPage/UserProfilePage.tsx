import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";

const UserProfilePage: React.FC = () => {
  return (
      <div className="flex flex-col justify-center items-center">
        <Navbar/>
        <div className="mt-44 scale-150">
          <UserProfile/>
        </div>
      </div>
  );
};

export default UserProfilePage;
