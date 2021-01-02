import * as action from "./feedActionTypes";
import axios from "axios";

export const fetchFeedRequest = () => {
  return {
    type: action.FETCH_FEED_REQUEST,
  };
};

export const fetchFeedSuccess = (data, q, fu, pn) => {
  return {
    type: action.FETCH_FEED_SUCCESS,
    payload: {
      data,
      searchValue: q,
      filterUrl: fu,
      currentPage: pn,
    },
  };
};

export const fetchFeedFailure = (error) => {
  return {
    type: action.FETCH_FEED_FAILURE,
    payload: error,
  };
};

export const fetchFeed = (filterUrl = "", q = "", pn = 0) => {
  let filterURL = filterUrl + `&query=${q}` + `&page=${pn}`;
  return (dispatch) => {
    dispatch(fetchFeedRequest);
    axios
      .get(
        filterUrl.length > 0
          ? filterUrl + `&query=${q}` + `&page=${pn}`
          : `https://hn.algolia.com/api/v1/search?query=${q}&tags=(story,comment,show_hn,ask_hn)&page=${pn}`
      )
      .then((response) => {
        const data = response.data;
        dispatch(fetchFeedSuccess(data, q, filterURL, pn));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch.fetchFeedFailure(errorMsg);
      });
  };
};

export const fetchMiscFeed = (filterUrl = "", q = "", pn = 0) => {
  let filterURL = filterUrl + `&query=${q}` + `&page=${pn}`;
  return (dispatch) => {
    dispatch(fetchFeedRequest);
    axios
      .get(
        filterUrl.length > 0
          ? filterUrl + `&query=${q}` + `&page=${pn}`
          : `https://hn.algolia.com/api/v1/search?query=${q}&tags=(story,comment,show_hn,ask_hn)&page=${pn}`
      )
      .then((response) => {
        const data = response.data;
        dispatch(fetchFeedSuccess(data, q, filterURL, pn));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch.fetchFeedFailure(errorMsg);
      });
  };
};
