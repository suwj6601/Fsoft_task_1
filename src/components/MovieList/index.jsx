import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import "./style.scss";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilterGenre from "../../common/FilterGenre";

const convertRestArgsIntoStylesArr = ([...args]) => {
  return args.slice(1);
};

const getStyles = function () {
  const args = [...arguments];
  const [element] = args;

  let stylesProps =
    [...args][1] instanceof Array
      ? args[1]
      : convertRestArgsIntoStylesArr(args);

  const styles = window.getComputedStyle(element);
  const stylesObj = stylesProps.reduce((acc, v) => {
    acc[v] = styles.getPropertyValue(v);
    return acc;
  }, {});

  return stylesObj;
};

const MovieList = () => {
  const [check, setCheck] = useState(false);
  const [widthList, setWidthList] = useState(1);

  const movieStateReducer = useSelector((state) => state.movieReducer);
  const filterMovie = movieStateReducer.filterMovie;
  const listMovie = movieStateReducer.listMovie;
  const listFilterMovie = movieStateReducer.filterMovie;

  const totalCard =
    filterMovie.length === 0 ? listMovie.length : filterMovie.length;

  const totalCurrentCard =
    listFilterMovie.length === 0 ? listMovie.length : listFilterMovie.length;

  const listCurrentMovie =
    listFilterMovie?.length === 0 ? listMovie : listFilterMovie;

  let countTranform = 1;

  const slideListMovie = () => {
    const bodyElementDOM = document.getElementsByTagName("BODY")[0];
    const widthTransform = bodyElementDOM.offsetWidth < 766 ? 19 : 25;

    let currentFontSize = parseInt(
      getStyles(document.body, "font-size")["font-size"]
    );

    const arrowLeft = document.getElementsByClassName("arrow-left")[0];
    const arrowRight = document.getElementsByClassName("arrow-right")[0];
    const movieList = document.getElementsByClassName("movie-poster")[0];
    const positionListMovie = document.getElementsByClassName(
      "movie-list__container"
    )[0];

    let offsetWidthListMovie = positionListMovie.offsetWidth;

    setWidthList(offsetWidthListMovie);

    let numberCard = parseInt(
      widthList / (22 * currentFontSize + currentFontSize)
    );

    const leftArrowFunction = () => {
      if (countTranform > 0) {
        movieList.style.transform = `translateX(calc(-${widthTransform}rem * ${
          countTranform - 2
        }))
        `;
        countTranform--;
      }

      if (countTranform === 0) {
        countTranform = totalCard - numberCard - 1;

        movieList.style.transform = `translateX(calc(-${widthTransform}rem * ${
          countTranform + 1
        }))
        `;

        countTranform += 2;
      }
    };

    const rightArrowFunction = () => {
      if (countTranform === totalCard - numberCard + 1) {
        movieList.style.transform = `translateX(0)`;
        countTranform = 0;
      } else {
        movieList.style.transform = `translateX(calc(-${widthTransform}rem * ${countTranform}))
        `;
        countTranform++;
        movieList.style.animation = "";
      }
    };

    arrowLeft.addEventListener("click", leftArrowFunction);
    arrowRight.addEventListener("click", rightArrowFunction);

    if (totalCurrentCard < numberCard) {
      arrowLeft.style.display = "none";
      arrowRight.style.display = "none";
    } else {
      arrowLeft.style.display = "block";
      arrowRight.style.display = "block";
    }
  };

  useEffect(() => {
    slideListMovie();
  }, [listCurrentMovie]);

  return (
    <div className="movie-list__wrapper">
      <FilterGenre />

      <div className="movie-list">
        <div className="movie-list__container" id="movie-list">
          <div className="arrow-left">
            <BsArrowLeftCircle />
          </div>
          <div
            className={check ? "movie-poster animationCard" : "movie-poster"}
          >
            {listCurrentMovie?.map((movieItem, index) => {
              return (
                <>
                  <Link to={`/${movieItem.Id}`}>
                    <MovieCard
                      imgUrl={movieItem?.Poster}
                      title={movieItem?.Title}
                      key={index}
                    />
                  </Link>
                </>
              );
            })}
          </div>
          <div className="arrow-right">
            <BsArrowRightCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
