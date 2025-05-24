import React, { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../context/AppDataContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Error message state

  const { userName, setUserName, password, setPassword, setLoggedIn } =
    useContext(AppDataContext);
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (
      existingUser &&
      existingUser.username === userName &&
      existingUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true)
      navigate("/");
    } else {
      setError("Incorrect Credentials. Please try again");
    }
    setUserName("");
    setPassword("");
  };
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [error]);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#add8e6]">
      <div className="p-10 text-center text-2xl text-gray-600"> Login</div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 font-medium text-lg">USERNAME</div>
          <input
            type="text"
            placeholder="Enter Your UserName"
            onChange={handleUserName}
            value={userName}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <div className="p-4 font-medium text-lg">PASSWORD</div>
          <input
            type="password"
            placeholder="Enter password"
            onChange={handlePassword}
            value={password}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <button
            className="bg-blue-500 outline-none h-[3rem] w-[10rem] text-center text-xl text-white m-4 cursor-pointer"
            type="submit"
          >
            LOGIN
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div onClick={() => navigate("/register")} className="cursor-pointer">
        New User?
      </div>
    </div>
  );
};

export default Login;
