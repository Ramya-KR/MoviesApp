import React, { useContext } from "react";
import logo from "../assets/movieIcon.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AppDataContext } from "../context/AppDataContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AppDataContext);
  return (
    <div className="flex border items-center px-4 py-4">
      <div className="flex space-x-8 items-center">
        <img src={logo} alt="Movie Icon" className="w-[70px]" />
        <Link className="text-yellow-800 text-xl font-bold" to="/">
          Movies
        </Link>
        <Link className="text-yellow-800 text-xl font-bold" to="/watchlist">
          WatchList
        </Link>
      </div>
      <div className="flex-grow"></div>

      {/* Logout button on right */}
      <button
        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          setLoggedIn(false);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
