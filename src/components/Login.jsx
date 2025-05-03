import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { LANDING_PAGE_IMG } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side Form Code */}
      <div className="card w-[40%] flex items-center justify-center px-8 py-8">
        <div className=" card-body w-full max-w-md space-y-6 text-white rounded-3xl shadow-2xl transform-gpu backdrop-blur-lg bg-gradient-to-tr from-gray-300/20 via-gray-500/10 to-gray-700 border border-white/10 hover:scale-[1.01] transition-all duration-300">
          <h2 className="flex justify-center card-title text-3xl font-bold tracking-wide bg-gradient-to-r from-yellow-500 via-yellow-300 to-red-500 bg-clip-text text-transparent uppercase">
            {isLoginForm ? "Welcome Back" : "Create Account"}
          </h2>
          <div>
            <div>
              {!isLoginForm && (
                <div className="space-y-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-base text-left">
                      What is your name?
                    </legend>
                    <input
                      type="text"
                      value={firstName}
                      className=" my-2 w-full px-4 py-2 rounded bg-gray-800/10 border border-gray-600 focus:outline-none focus:border-[#ffffff]"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={lastName}
                      className=" my-2 w-full px-4 py-2 rounded bg-gray-800/10 border border-gray-600 focus:outline-none focus:border-[#ffffff]"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </fieldset>
                </div>
              )}
              <legend className="fieldset-legend space-y-4">Email Id</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  value={emailId}
                  placeholder="Your Email Address"
                  required
                  className="w-full px-4 py-2 rounded  border border-gray-600 focus:outline-none focus:border-[#ffffff]"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            <div className="my-4">
              <legend className="fieldset-legend">Password</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  value={password}
                  required
                  className="w-full px-4 py-2 rounded  border border-gray-600 focus:outline-none focus:border-[#ffffff]"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
          <div className="card-actions flex justify-center items-center">
            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Sign In" : "Sign Up"}
              {/* Create a method for sign in through google account */}
            </button>
          </div>
          <p className="my-3 text-sm text-center">
            {isLoginForm ? (
              <span>
                <span>
                  New User ?
                  <span
                    className="hover:underline cursor-pointer mx-2 text-[#e7e730]"
                    onClick={() => setIsLoginForm((value) => !value)}
                  >
                    Sign Up Here
                  </span>
                </span>
              </span>
            ) : (
              <span>
                <span>Existing User ?</span>
                <span
                  className="hover:underline cursor-pointer mx-2 text-[#e7e730]"
                  onClick={() => setIsLoginForm((value) => !value)}
                >
                  Sign In Here
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
      {/* Right Side Image */}
      <div className="w-[60%] relative rounded-3xl overflow-hidden mt-8 mr-8 mb-6">
        <img
          src={LANDING_PAGE_IMG}
          alt="Landing Page Image"
          className="w-full h-full object-cover "
        />
      </div>
    </div>
  );
};

export default Login;
