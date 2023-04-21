import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actSetFilterMovie } from "../../controller/action";

const FilterGenre = () => {
  const dispatch = useDispatch();
  const listAllGenres = [];
  const [genre, setGenre] = useState([]);

  const movieStateReducer = useSelector((state) => state.movieReducer);
  const listMovie = movieStateReducer.listMovie;

  // get all of kind genre
  listMovie.forEach((movie) => {
    // genre of single movie
    const genreMovie = movie?.Genre;

    //convert genre of single movie to array
    const listSingleGenresMovie = genreMovie?.split(", ");

    listSingleGenresMovie.forEach((genre) => {
      if (!listAllGenres.includes(genre)) {
        listAllGenres.push(genre);
      }
    });
  });

  const onFilterGenre = useCallback(() => {
    const selectedFilterGenre = document.getElementById("slct");
    const movieList = document.getElementsByClassName("movie-poster")[0];

    selectedFilterGenre.addEventListener("change", (e) => {
      const filterGenre = e?.target?.value;

      setGenre(filterGenre);

      if (filterGenre !== "All") {
        const filterMovieGenreMatch = listMovie.filter((movie) =>
          movie.Genre.includes(filterGenre)
        );
        dispatch(actSetFilterMovie(filterMovieGenreMatch));
        movieList.style.transform = `translateX(0)`;
      } else {
        dispatch(actSetFilterMovie(listMovie));
        movieList.style.transform = `translateX(0)`;
      }
    });
  });

  useEffect(() => {
    onFilterGenre();
  }, [onFilterGenre]);

  return (
    <div className="filter">
      <label className="select" for="slct">
        <select id="slct" required="required">
          <option value="All" className="optionGenre">
            All
          </option>
          {listAllGenres.map((genre, index) => {
            return (
              <option value={genre} key={index} className="optionGenre">
                {genre}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default FilterGenre;
