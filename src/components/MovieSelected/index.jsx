import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actSetSelectedMovie } from "../../controller/action";
import NotFoundPage from "../../common/NotFoundPage";

const MovieSelected = () => {
  let { movieId } = useParams();
  const dispatch = useDispatch();

  const movieStateReducer = useSelector((state) => state.movieReducer);
  const listMovie = movieStateReducer.listMovie;
  const selectedMovie = movieStateReducer.selectedMovie;

  const listGenres = selectedMovie?.Genre?.split(", ");

  useEffect(() => {
    if (!movieId) {
      dispatch(actSetSelectedMovie(listMovie[0]));
    } else {
      const filterMovie = listMovie.filter((movie) => movie.Id === movieId)[0];
      dispatch(actSetSelectedMovie(filterMovie));
    }
  }, [listMovie, movieId, dispatch]);

  return (
    <>
      <div>
        <div className="movie-selected">
          {selectedMovie ? (
            <div className="movie-selected__wrapper">
              <img src={selectedMovie?.Poster} alt="" className="poster" />
              <div className="movie-selected__desc">
                <h1 className="title">{selectedMovie?.Title}</h1>
                <div className="more_desc">
                  <div className="overview">{selectedMovie?.Plot}</div>

                  <div className="genre">
                    {listGenres?.map((genre, index) => {
                      return (
                        <div className="genre_item" key={index}>
                          <p>{genre}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rating">
                    Rating: <span>{selectedMovie?.Rating}</span>
                  </div>
                  <div className="votes">
                    Votes: <span>{selectedMovie?.Votes}</span>
                  </div>

                  <div className="btns">
                    <button className="btn btn-watch">Watch now</button>
                    <button className="btn btn-trailer">Watch trailer</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NotFoundPage />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieSelected;
