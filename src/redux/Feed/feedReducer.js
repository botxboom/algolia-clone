import * as actions from "./feedActionTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
  searchValue: "",
  filterValue: "",
  currentActivePage: 0,
};

const reducer = (state = initialState, action) => {
  console.log(state.currentActivePage);
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
        data: action.payload.data,
        searchValue: action.payload.searchValue,
        filterValue: action.payload.filterUrl,
        currentActivePage: action.payload.currentPage,
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
