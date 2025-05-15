import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Show Error page
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center">No Connections Found</h1>;

  return (
    <div className="text-center my-auto">
      <h1 className="text-bold text-2xl mb-6">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center justify-between gap-4 p-4 mb-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-1/2 mx-auto bg-base-300 rounded-xl shadow hover:scale-95 hover:bg-base-200 transition-all duration-200"
          >
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
            <Link to={"/chat/" + _id}>
              <button className="btn btn-md bg-yellow-500 hover:bg-yellow-400 text-black">
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
