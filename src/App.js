import "./App.css";
import { AuthProvider } from "./context/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "./util/AuthRoute";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import store from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feeds from "./components/Feeds";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Container className="container__class">
            <MenuBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/feed" component={Feeds} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
          </Container>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
