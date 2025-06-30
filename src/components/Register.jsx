import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import bcrypt, { genSaltSync } from "bcryptjs";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Minimum length of password is 8 and should contain atleast one uppercase, one lowercase letter and one special character ");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match, please enter correctly");
      return;
    }
    const encryptedPassword = bcrypt.hashSync(password, genSaltSync(10))
    const newUser = { username, email, encryptedPassword };
    const existingUsers = JSON.parse(localStorage.getItem("user")) || []
    const users = [...existingUsers, newUser]
    localStorage.setItem("user", JSON.stringify(users));
    navigate("/");

    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
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
      <div className="p-10 text-center text-2xl text-white font-serif">Register</div>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 font-medium text-lg">Username</div>
          <input
            type="text"
            placeholder="Enter Your UserName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <div className="p-4 font-medium text-lg">Email</div>
          <input
            type="text"
            placeholder="Enter Your email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <div className="p-4 font-medium text-lg">Password</div>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <div className="p-4 font-medium text-lg">Confirm Password</div>
          <input
            type="password"
            placeholder="Re-enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          />
          <button
            className="bg-blue-500 outline-none h-[3rem] w-[10rem] text-center text-xl text-white m-4 cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 bg-orange-50">{error}</div>}
    </div>
  );
};

export default Register;
