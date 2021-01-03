import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  search: []
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
  setUserSearch: (text, time) =>{}
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SUBMIT_SEARCH":
      return {
        ...state,
        search: [...state.search, [action.payload.username, action.payload.text , action.payload.time]]
      }
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  function setUserSearch(user, input, time){
    localStorage.setItem("searchHistory",user, input, time)
    dispatch({
      type: "SUBMIT_SEARCH",
      payload: {
        username: user,
        text: input,
        time: time
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, search: state.search, login, logout, setUserSearch }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
