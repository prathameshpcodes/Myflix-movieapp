import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURE_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=537461348a44ecc47cf56b2d4652c5a4&page=1";

const SEARCH_API =
  " https://api.themoviedb.org/3/search/movie?&api_key=537461348a44ecc47cf56b2d4652c5a4&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURE_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <h1>
          Myflix
          <span role="img" aria-label="clapboards">
            🎬
          </span>
        </h1>

        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
