import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import { AppDataContext } from "./context/AppDataContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleAddToWatchList = (movie) => {
    let newWatchlist = [...watchlist, movie];
    localStorage.setItem("moviesAppData", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  const handleDeleteFromWatchlist = (movieObj) => {
    let newWatchlist = watchlist.filter((movie) => {
      return movie.title !== movieObj.title;
    });
    setWatchlist(newWatchlist);
    localStorage.setItem("moviesAppData", JSON.stringify(newWatchlist));
  };
  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesAppData");
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!moviesFromLocalStorage) {
      return;
    }
    if (moviesFromLocalStorage) {
      setWatchlist(JSON.parse(moviesFromLocalStorage));
    }
    setLoggedIn(JSON.parse(isUserLoggedIn));
  }, [loggedIn]);
  return (
    <>
      <AppDataContext.Provider
        value={{
          watchlist,
          setWatchlist,
          handleAddToWatchList,
          handleDeleteFromWatchlist,
          userName,
          setUserName,
          password,
          setPassword,
          loggedIn,
          setLoggedIn,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <>
                    <Navbar />
                    <Banner />
                    <Movies />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/watchlist"
              element={
                loggedIn ? (
                  <>
                    <Navbar />
                    <WatchList />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </AppDataContext.Provider>
    </>
  );
}

export default App;
