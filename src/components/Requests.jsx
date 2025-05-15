import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center items-center">No Requests Found</h1>
    );

  return (
    <div className="text-center my-auto">
      <h1 className="text-bold text-2xl mb-6">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center justify-between gap-4 p-4 mb-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-1/2 mx-auto bg-base-300 rounded-xl shadow hover:scale-95 hover:bg-base-200 transition-all duration-200"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-4">
              <img
                alt="photo"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring ring-offset-base-100 ring-offset-2"
                src={photoUrl}
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age + " • " + gender}
                  </p>
                )}
                <p className="text-sm text-gray-400 truncate max-w-[200px]">
                  {about}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="btn btn-md bg-gray-700 hover:bg-gray-600 text-white"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-md bg-yellow-500 hover:bg-yellow-400 text-black"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
