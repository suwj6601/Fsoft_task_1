import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList";
import MovieSelected from "../../components/MovieSelected";
import "./style.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { actSetListMovie } from "../../controller/action";

const Mainpage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mainPageActive =
      document.getElementsByClassName("main-page__active")[0];
    const loadingElement = document.getElementsByClassName("loading")[0];
    const mainPage = document.getElementsByClassName("main-page")[0];

    axios
      .get("https://run.mocky.io/v3/d03e0886-f5c8-4961-902d-51bfe8059a33")
      .then((response) => {
        dispatch(actSetListMovie(response.data));
        setLoading(false);
      })

      .catch((err) => {
        console.error(err);
      });

    if (loading) {
      loadingElement.style.display = "block";
      mainPageActive.style.display = "none";
      mainPage.style.height = "100vh";
      mainPage.style.width = "100vw";
    } else {
      loadingElement.style.display = "none";
      mainPageActive.style.display = "block";
    }
  }, [dispatch, loading]);

  return (
    <div className="">
      <div className="main-page">
        <div className="main-page__active">
          <MovieSelected />
          <MovieList />
        </div>

        <div className="loading">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
