import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    try {
      setErr("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-9">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  value={about}
                  className="textarea h-24"
                  placeholder="Bio"
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                ></textarea>
              </fieldset>
              <p className="text-red-500">{err}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
