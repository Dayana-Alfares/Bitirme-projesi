import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";

import axios from "axios";

const Login = () => {
  const [captchaRnadomNumber, setCaptchaRandomNumber] = useState(0);
  const [captchaInput, setCaptchaInput] = useState(""); // Captcha input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = useState(false);

  useEffect(() => {
    setCaptchaRandomNumber(Math.floor(Math.random() * 10000));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/");
    }
  }, []);

  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const userRef = React.createRef();

  const navigate = useNavigate();

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handlePersist = () => setPersist((prev) => !prev);

  const errclassName = errMsg ? "text-red-500" : "text-gray-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !captchaInput) {
      setErrMsg("Please fill in all the fields");
      return;
    }

    if (captchaInput !== captchaRnadomNumber.toString()) {
      setErrMsg("Invalid captcha");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <header className="flex items-center justify-center mb-12 space-x-3 lg:mb-0">
          <div className="relative w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="relative w-2 h-2 bg-pink-500 rounded-full"></div>
        </header>
        <div className="flex items-center justify-center w-full mb-4 lg:justify-start lg:w-auto">
          <a
            href="#"
            className="flex items-center justify-center text-2xl font-bold tracking-wide text-gray-800 uppercase dark:text-white lg:mr-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2 text-blue-500 fill-current dark:text-blue-400"
              viewBox="0 0 512 512"
            >
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 469.3c-117.8 0-213.3-95.5-213.3-213.3S138.2 42.7 256 42.7 469.3 138.2 469.3 256 373.8 469.3 256 469.3z"></path>
              <path d="M256 106.7c-58.9 0-106.7 47.8-106.7 106.7S197.1 320 256 320s106.7-47.8 106.7-106.7S314.9 106.7 256 106.7zm0 170.7c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path>
            </svg>
            <span className="text-xl font-bold tracking-wide text-gray-800 uppercase dark:text-white">
              Login Form
            </span>
          </a>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {/* error message */}
            <p className={`${errclassName} text-sm`}>{errMsg}</p>
            {/* form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Username"
                  required={true}
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={password}
                  onChange={handlePwdInput}
                  autoComplete="off"
                />
              </div>
              <div className="w-1/2 h-10">
                <div className="flex items-center justify-between h-full px-3 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center">
                    <span
                      className="text-lg text-gray-900 dark:text-white"
                      style={{ letterSpacing: "0.5rem" }}
                    >
                      {captchaRnadomNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-500 dark:text-blue-400"
                    onClick={() =>
                      setCaptchaRandomNumber(Math.floor(Math.random() * 10000))
                    }
                  >
                    Refresh
                  </button>
                </div>
              </div>
              <input
                type="text"
                name="captcha"
                id="captcha"
                placeholder="Enter the number above"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  // Render loading spinner when isLoading is true
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                  </div>
                ) : (
                  // Render "Sign in" when not loading
                  "Sign in"
                )}
              </button>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember_me"
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-600"
                    checked={persist}
                    onChange={handlePersist}
                  />
                  <label
                    htmlFor="remember_me"
                    className="block ml-2 text-sm text-gray-900"
                    checked={true}
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
