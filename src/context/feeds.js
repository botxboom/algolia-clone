import React, { useReducer, createContext } from "react";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const FeedContext = createContext({
    feed: [],
    fetchfeed:  
});

function feedReducer(state, action) {
  switch (action.type) {
    case actions.FETCH_FEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case actions.FETCH_FEED_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

function FeedProvider(props) {
  const [state, dispatch] = useReducer(feedReducer, initialState);

  function fetchFeedRequest() {
    return {
      type: action.FETCH_FEED_REQUEST,
    };
    }
    
    function fetchFeedSuccess() {
        return {
          type: action.FETCH_FEED_SUCCESS,
          payload: data,
        };
    }

    function fetchFeedFailure(error) {
        return {
          type: action.FETCH_FEED_FAILURE,
          payload: error,
        };
    }

    function fetchFeed(){
        return (dispatch) => {
          dispatch(fetchFeedRequest);
          axios
            .get("https://hn.algolia.com/api/v1/search?tags=story")
            .then((response) => {
              const data = response.data;
              dispatch(fetchFeedSuccess(data));
            })
            .catch((error) => {
              const errorMsg = error.message;
              dispatch.fetchFeedFailure(errorMsg);
            });
        };
    }

    return (
        <FeedContext.Provider
            value={{data: state.data, }}
    )

}
