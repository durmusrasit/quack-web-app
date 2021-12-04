import React, { Component, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Loadable from "./components/modules/Loadable";

import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import themes from "./theme";

//import PrivateRoute from "./components/common/PrivateRoute";

import { loadUser } from "./actions/auth";

const Landing = Loadable(lazy(() => import("./components/Landing")));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store} history={history}>
        <Router>
          <ThemeProvider theme={themes()}>
            <CssBaseline />

            <Switch>
              <Route exact path="/" component={Landing} />
              {/*<PrivateRoute path='/study' component={Study} />*/}

              <Route
                path="*"
                render={() => {
                  return <Redirect to="/" />;
                }}
              />
            </Switch>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

const appDiv = document.getElementById("root");
render(<App />, appDiv);
