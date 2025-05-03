import React from "react";
import { BASE_URL, LOGO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeFeed());
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black">
      <div className="navbar bg-black shadow-sm px-4">
        {/* Left side (Logo) */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img className="w-44" src={LOGO} alt="Logo" />
          </Link>
        </div>

        {/* Right side (Welcome + Avatar Dropdown) */}
        <div className="flex items-center gap-4 text-white">
          {user && (
            <div className="flex items-center gap-2">
              <p className="text-sm">Welcome {user.firstName} !</p>

              {/* Dropdown starts */}
              <div className="dropdown dropdown-hover dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full overflow-hidden">
                    <img alt="User" src={user.photoUrl} />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
              {/* Dropdown ends */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
