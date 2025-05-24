import React, { useContext, useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { genres } from "../utilities/genre";
import { AppDataContext } from "../context/AppDataContext";
const WatchList = () => {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [activeGenre, setActiveGenre] = useState("All Genres");
  let rating = true;
  const {watchlist, setWatchlist, handleDeleteFromWatchlist } = useContext(AppDataContext)

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortByDescending = (rating) => {
    let highRatedMovies = []
    if(rating){
     highRatedMovies = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    }else {
      highRatedMovies = watchlist.sort((movieA, movieB) => {
        return movieA.popularity - movieB.popularity;
      });
    }
    
    setWatchlist([...highRatedMovies]);
  };

  const sortByAscending = (rating) => {
    let lowRatedMovies = [];
    if(rating) {
      lowRatedMovies = watchlist.sort((movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average;
      });
    }else {
      lowRatedMovies = watchlist.sort((movieA, movieB) => {
        return movieB.popularity - movieA.popularity;
      });
    }
     
    setWatchlist([...lowRatedMovies]);
  };

  const handleActiveFilter = (genre) => {
    setActiveGenre(genre);
  };

  useEffect(() => {
    let genrelist = watchlist.map((movie) => {
      return genres[movie.genre_ids[0]];
    });
    genrelist = new Set(genrelist);
    setGenreList(["All Genres", ...genrelist]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div key={genre}
              onClick={() => handleActiveFilter(genre)}
              className={`w-[9rem] text-white rounded mx-2 font-bold ${
                activeGenre === genre ? "bg-blue-400" : "bg-gray-400/60"
              } h-[3rem] flex items-center justify-center hover:cursor-pointer`}
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-100 outline-none px-3"
          placeholder="Search Movies"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="m-8 border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>
                <FaArrowUp
                  onClick={() => sortByDescending(rating)}
                  className="inline-block hover:cursor-pointer mx-4"
                />
                Ratings
                <FaArrowDown
                  onClick={() => sortByAscending(rating)}
                  className="inline-block hover:cursor-pointer mx-4"
                />
              </th>
              <th> <FaArrowUp
                  onClick={() => sortByDescending(!rating)}
                  className="inline-block hover:cursor-pointer mx-4"
                />
                Popularity
                <FaArrowDown
                  onClick={() => sortByAscending(!rating)}
                  className="inline-block hover:cursor-pointer mx-4"
                /></th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
            .filter(movie => {
              if(activeGenre === 'All Genres'){
                return true;
              }
              return genres[movie.genre_ids[0]] === activeGenre
            }) 
              .filter((movie) => {
                return movie.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movie) => {
                return (
                  <tr key={movie.id} className="border-b-2">
                    <td className="flex items-center">
                      <img
                        className="w-[10rem] h-[6rem] px-6 py-4"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      />
                      <div className="mx-10">{movie.title}</div>
                    </td>
                    <td>{movie.vote_average}</td>
                    <td>{movie.popularity}</td>
                    <td>{genres[movie.genre_ids[0]]}</td>
                    <td
                      className="text-red-800 hover:cursor-pointer"
                      onClick={() => handleDeleteFromWatchlist(movie)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
