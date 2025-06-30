import React, { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../context/AppDataContext";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

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
    const existingUser = JSON.parse(localStorage.getItem("user")).find(user => user.username === userName);
    if (
      existingUser &&
      existingUser.username === userName &&
      bcrypt.compareSync(password, existingUser.encryptedPassword)
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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-5 text-center text-2xl text-white font-serif"> Login</div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 text-lg">Username</div>
          <input
            type="text"
            placeholder="Enter username"
            onChange={handleUserName}
            value={userName}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <div className="p-4 text-lg">Password</div>
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
      <div onClick={() => navigate("/register")} className="cursor-pointer text-fuchsia-100">
        New User? Register here
      </div>
    </div>
  );
};

export default Login;
