import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // Local state for form
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "Other");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    // console.log({
    //   firstName,
    //   lastName,
    //   age,
    //   gender,
    //   photoUrl,
    //   skills,
    //   about,
    // });

    // Clear Errors

    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, skills, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      // remove toast after 2 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#111] text-white p-6 gap-6">
        {/* Left - User Info */}
        <div className="w-full lg:w-1/3 bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative w-52 h-52 rounded-full overflow-hidden mb-4 border-4 border-yellow-500">
              <img
                src={user.photoUrl}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-gray-400 mb-2">
              {user?.followers} Followers · {user?.following} Following
            </p>
            <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
            <p className="mt-3 text-center">{user.about}</p>
            <button className="mt-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
              My Profile
            </button>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Edit Form */}
        <div className="w-full lg:w-2/3 bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
          >
            {/* Name */}
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered bg-[#111]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered bg-[#111]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* Age */}
            <input
              type="number"
              placeholder="Age"
              className="input input-bordered bg-[#111]"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {/* Gender */}
            <div className="flex items-center gap-4">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
            {/* Skills input */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input input-bordered bg-[#111] flex-grow"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-sm bg-yellow-500 hover:bg-yellow-400 text-black"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* About */}
            <textarea
              placeholder="About"
              className="textarea textarea-bordered bg-[#111] col-span-1 md:col-span-2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            {/* Photo upload */}
            <input
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered bg-[#111]"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            {/* Submit */}

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="btn bg-yellow-500 hover:bg-yellow-400 text-black w-full mt-4"
              >
                Save Changes
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
