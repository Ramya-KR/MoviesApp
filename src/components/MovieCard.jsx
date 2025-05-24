import React, { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";

function MovieCard({
  movie,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  const {watchlist, handleAddToWatchList, handleDeleteFromWatchlist} = useContext(AppDataContext)

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-end items-end relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      {doesContain(movie) ? (
        <div
          className="bg-gray-900/60 m-4 flex justify-center w-8 h-8 items-center rounded-lg absolute top-0"
          onClick={() => handleDeleteFromWatchlist(movie)}
        >
          &#10060;
        </div>
      ) : (
        <div
          className="bg-gray-900/60 m-4 flex justify-center w-8 h-8 items-center rounded-lg absolute top-0"
          onClick={() => handleAddToWatchList(movie)}
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl bg-gray-900/60 text-center w-full p-2 rounded-b-xl">
        {movie.title}
      </div>
    </div>
  );
}

export default MovieCard;
