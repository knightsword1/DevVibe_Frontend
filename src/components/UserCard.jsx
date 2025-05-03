import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, about, skills = [] } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card relative  w-[70%] md:w-[30%] h-[90vh] max-w-4xl mx-auto px-4 lg:px-8 my-auto">
      {/* Background Image */}
      <figure>
        <img
          src={photoUrl}
          alt="Photo"
          className="absolute inset-0 w-full h-full object-cover overflow-hidden rounded-3xl"
        />
      </figure>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 rounded-3xl" />
      <div className="card-body relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white">
        <div>
          <h2 className="card-title text-3xl sm:text-4xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            {firstName} {lastName}
            {age && (
              <p className="text-white">
                {" , "}
                {age}
              </p>
            )}
          </h2>
          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* About */}
          <p className="mt-4 text-sm sm:text-base text-gray-300 font-semibold">
            {about}
          </p>

          {/* Buttons */}
          <div className="card-actions mt-6 flex gap-5">
            <button
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-xl flex-1"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded-xl flex-1 font-bold"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
