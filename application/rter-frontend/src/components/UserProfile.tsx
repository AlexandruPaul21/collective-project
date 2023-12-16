import { Button } from "@/components/ui/button";
import {useState} from "react";

const UserProfile: React.FC = () => {

  const [updateScreen, setUpdateScreen] = useState(false);


  const [name, setName] = useState("ana");
  const [email, setEmail] = useState("anaekool@gmail.yep");
  const [address, setAddress] = useState("Santa Land, 123 Rudolph Street, 12345");
  const [gender, setGender] = useState("female");

  const [updateName, setUpdateName] = useState("ana");
  const [updateEmail, setUpdateEmail] = useState("anaekool@gmail.yep");
  const [updateAddress, setUpdateAddress] = useState("Santa Land, 123 Rudolph Street, 12345");
  const [updateGender, setUpdateGender] = useState("female");

  const switchToUpdateScreenHandler = () => {
    setUpdateName(name);
    setUpdateEmail(email);
    setUpdateAddress(address);
    setUpdateGender(gender);

    setUpdateScreen(true);
  }

  const switchToProfileScreenHandler = () => {
    setUpdateScreen(false);
  }

  const saveChanges = () => {
    // user validation

    // send to srv

    // go back to update screen
    setUpdateScreen(false);
  }

  return (
    <div>

      <div className=" rounded-lg border-[1px] border-gray-200 bg-white">

        <div className="m-5">

          <h3 className="text-md mb-2 mt-[30px] font-semibold  text-center">
            User Profile
          </h3>

          <ul>
            <li className="mt-3">
              <label className="text-sm">
                Name:
              </label>
            </li>
            <li>
              <input
                type="text"
                className="border-lightblu marker:text-lightblu rounded-lg border-[1px] w-full"
                disabled = {!updateScreen}
                value={ !updateScreen ? name : updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </li>

            <li className="mt-3">
              <label className="text-sm">
                Email:
              </label>
            </li>
            <li>
              <input
                type="text"
                className="border-lightblu marker:text-lightblu rounded-lg border-[1px] w-full"
                disabled = {!updateScreen}
                value={ !updateScreen ? email : updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
              />
            </li>

            <li className="mt-3">
              <label className="text-sm">
                Address:
              </label>
            </li>
            <li>
              <textarea
                className="border-lightblu marker:text-lightblu rounded-lg  border-[1px] w-full"
                disabled = {!updateScreen}
                value={ !updateScreen ? address : updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
              />
            </li>

            <li className="mt-3">
              <label className="text-sm">
                Gender:
              </label>
            </li>
            <li>
              <input
                type="text"
                className="border-lightblu marker:text-lightblu rounded-lg border-[1px] w-full"
                disabled = {!updateScreen}
                value={ !updateScreen ? gender : updateGender}
                onChange={(e) => setUpdateGender(e.target.value)}
              />
            </li>

            {
              updateScreen ? (
                <div className="my-10 ml-auto mr-auto w-full">
                  <button className="w-1/2 rounded border-[1px] p-2" onClick={switchToProfileScreenHandler}>
                    Cancel
                  </button>
                  <button className="w-1/2 rounded border-[1px] p-2" onClick={saveChanges}>
                    Save
                  </button>
                </div>
              ) : (<> </>)
            }

          </ul>

          {
            !updateScreen ? (
              <Button className="mt-10 ml-auto mr-auto w-full" onClick={switchToUpdateScreenHandler}>
                Update information
              </Button>
            ) : (<> </>)
          }

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
