import { SET_LIST_MOVIE, SET_SELECTED_MOVIE, SET_FILTER_MOVIE } from "./type";

export const actSetListMovie = (item) => {
  return {
    type: SET_LIST_MOVIE,
    payload: item,
  };
};

export const actSetSelectedMovie = (item) => {
  return {
    type: SET_SELECTED_MOVIE,
    payload: item,
  };
};

export const actSetFilterMovie = (item) => {
  return {
    type: SET_FILTER_MOVIE,
    payload: item,
  };
};
