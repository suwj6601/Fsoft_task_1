import { SET_LIST_MOVIE, SET_SELECTED_MOVIE, SET_FILTER_MOVIE } from "./type";

const initialState = {
  listMovie: [],
  selectedMovie: {},
  filterMovie: [],
};

export const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LIST_MOVIE:
      return {
        ...state,
        listMovie: payload,
      };

    case SET_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: payload,
      };

    case SET_FILTER_MOVIE:
      return {
        ...state,
        filterMovie: payload,
      };

    default:
      return state;
  }
};
