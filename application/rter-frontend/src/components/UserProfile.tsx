import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {UserService} from "@/apis/profile/UserService";
import {Gender, User} from "@/utils/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const UserProfile: React.FC = () => {

  const [updateScreen, setUpdateScreen] = useState(false);


  const [name, setName] = useState("ana");
  const [email, setEmail] = useState("anaekool@gmail.yep");
  const [address, setAddress] = useState("Santa Land, 123 Rudolph Street, 12345");
  const [gender, setGender] = useState("FEMALE");
  const [description, setDescription] = useState("");

  const [updateName, setUpdateName] = useState("ana");
  const [updateEmail, setUpdateEmail] = useState("anaekool@gmail.yep");
  const [updateAddress, setUpdateAddress] = useState("Santa Land, 123 Rudolph Street, 12345");
  const [updateGender, setUpdateGender] = useState("FEMALE");
  const [updateDescription, setUpdateDescription] = useState("");

  useEffect(()=> {
    loadUserInfo();
  },[]);

  const loadUserInfo = async () => {
    // get user info from srv
    await UserService.getCurrentUser()
        .then((user)=> {
          setName(user.name);
          setEmail(user.email);
          setAddress(user.address);
          setGender(user.gender);
          setDescription(user.description);
        });
  };

  const switchToUpdateScreenHandler = () => {
    setUpdateName(name);
    setUpdateEmail(email);
    setUpdateAddress(address);
    setUpdateGender(gender);
    setUpdateDescription(description);

    setUpdateScreen(true);
  }

  const switchToProfileScreenHandler = () => {
    setUpdateScreen(false);
  }

  const saveChanges = async () => {
    // user validation

    // send to srv
    await UserService.updateCurrentUser({name:updateName, email:updateEmail, gender:updateGender, description:updateDescription, address:updateAddress  } as User)
        .then((user)=> {
          setName(user.name);
          setEmail(user.email);
          setAddress(user.address);
          setGender(user.gender);
          setDescription(user.description);
        });

    // go back to update screen
    setUpdateScreen(false);
  }

  return (
    <div>
        <div>
          <ul>
            <li className="mt-3">
              <label className="text-sm">
                Name:
              </label>
            </li>
            <li>
              <input
                type="text"
                className="font-nunito text-sm border-lightblu rounded-xl border-[1px] w-full p-1"
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
                className="font-nunito text-sm border-lightblu  rounded-xl border-[1px] w-full p-1"
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
                className="font-nunito text-sm border-lightblu rounded-xl  border-[1px] w-full resize-none p-1"
                disabled = {!updateScreen}
                value={ !updateScreen ? address : updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
              />
            </li>

            <li className="mt-1">
              <label className="text-sm">
                Gender:
              </label>
            </li>
            <li>
              <Select
                onValueChange={(e) => setUpdateGender(e)}
                defaultValue={gender}
                disabled = {!updateScreen}
              >
                <SelectTrigger className="font-nunito text-sm disabled:border-[1px]  disabled:border-red border-lightblu rounded-xl border-[1px]">
                  <SelectValue placeholder="Choose"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Male</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
            </li>

            <li className="mt-3">
              <label className="text-sm">
                Description:
              </label>
            </li>
            <li>
              <textarea
                  className="font-nunito text-sm border-lightblu rounded-xl border-[1px] w-full resize-none p-1"
                  placeholder="Tell us about yourself"
                  rows = {5}
                  disabled = {!updateScreen}
                  value={ !updateScreen ? description : updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </li>

            {
              updateScreen ? (
                <div className="w-full">
                  <Button  className="bg-[#5b9ed9] w-1/2 rounded-full hover:bg-[#195f9c]" onClick={switchToProfileScreenHandler}>
                    Cancel
                  </Button>
                  <Button className="bg-[#2076C1] w-1/2 rounded-full hover:bg-[#195f9c]" onClick={saveChanges}>
                    Save
                  </Button>
                </div>
              ) : (<> </>)
            }

          </ul>

          {
            !updateScreen ? (
              <Button className="bg-[#2076C1] w-full rounded-full hover:bg-[#195f9c]" onClick={switchToUpdateScreenHandler}>
                Update information
              </Button>
            ) : (<> </>)
          }

        </div>
    </div>
  );
};

export default UserProfile;
