import * as actions from "./feedActionTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
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
};

export default reducer;
