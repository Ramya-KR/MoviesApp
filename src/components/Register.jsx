import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match, please enter correctly");
      return;
    }
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
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
    <div className="flex flex-col justify-center items-center h-screen bg-[#add8e6]">
      <div className="p-10 text-center text-2xl text-gray-600">Register</div>
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
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Register;
