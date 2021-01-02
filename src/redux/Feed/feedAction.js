import * as action from "./feedActionTypes";
import axios from "axios";

export const fetchFeedRequest = () => {
  return {
    type: action.FETCH_FEED_REQUEST,
  };
};

export const fetchFeedSuccess = (data) => {
  return {
    type: action.FETCH_FEED_SUCCESS,
    payload: data,
  };
};

export const fetchFeedFailure = (error) => {
  return {
    type: action.FETCH_FEED_FAILURE,
    payload: error,
  };
};

export const fetchFeed = (pn = 0) => {
  return (dispatch) => {
    dispatch(fetchFeedRequest);
    axios
      .get(
        `https://hn.algolia.com/api/v1/search?tags=(story,comment,show_hn,ask_hn)&page=${pn}`
      )
      .then((response) => {
        const data = response.data;
        dispatch(fetchFeedSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch.fetchFeedFailure(errorMsg);
      });
  };
};

export const fetchSearchFeed = (input, pn = 0) => {
  return (dispatch) => {
    dispatch(fetchFeedRequest);
    axios
      .get(
        `https://hn.algolia.com/api/v1/search?query=${input}&tags=(story,comment,show_hn,ask_hn)&page=${pn}`
      )
      .then((response) => {
        const data = response.data;
        dispatch(fetchFeedSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch.fetchFeedFailure(errorMsg);
      });
  };
};
