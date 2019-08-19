import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NaviagtionBar from "./subComponents/navigationBar";
import HomeTop from "./home";
import Restaurants from "./restaurants";
import Login from "./login";
import NotFound from "./notFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/dummy.css";
import "./css/scrollbar.css";
import SignUp from "./signup";
import HomeBottom from "./subComponents/homeBottom";
import RestaurantRegistration from "./restaurantRegistration";
import Restaurant from "./restaurant";
import UserProfile from "./userProfile";
import jwtDecode from "jwt-decode";
import Logout from "./subComponents/logout";
import RestaurantProfile from "./restaurantProfile";

class App extends Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      console.log("server:", process.env.REACT_APP_API_URL);
    }, 5000);
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt, { complete: true });
      console.log("appdidm: ", user);

      var dateNow = new Date();

      if (user.exp < dateNow.getTime() / 1000) {
        console.log(user.exp);
        console.log(dateNow.getTime());
        toast.info("login expired");
        window.location = "/logout";
      }

      this.setState({ user });
    } catch (ex) {}
  }

  handleCloseLogin = e => {
    e.preventDefault();
    let target = document.getElementsByClassName("loginPage")[0];
    // console.log(target);
    target.style.display = "none";
  };

  handleOpenLogin = e => {
    e.preventDefault();
    let target = document.getElementsByClassName("loginPage")[0];
    // console.log(target);
    target.style.display = "block";
  };

  handleCloseSignUp = e => {
    e.preventDefault();
    let target = document.getElementsByClassName("loginPage")[1];
    // console.log(target);
    target.style.display = "none";
  };

  handleOpenSignUp = e => {
    e.preventDefault();

    let target = document.getElementsByClassName("loginPage")[1];
    // console.log(target);
    target.style.display = "block";
  };

  render() {
    console.log("My App loaded.=000=... ");
    return (
      <React.Fragment>
        <div
          className="container-fluid"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "10"
          }}
        >
          <ToastContainer />
        </div>
        <div className="container-fluid">
          <div className="row">
            <Switch>
              <Route
                path="/home"
                exact
                render={() => (
                  <HomeTop
                    openLogin={this.handleOpenLogin}
                    openSignUp={this.handleOpenSignUp}
                  />
                )}
              />
              <Route
                path="/restaurants/:city"
                render={props => (
                  <NaviagtionBar
                    openLogin={this.handleOpenLogin}
                    openSignUp={this.handleOpenSignUp}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
              <Route
                path="/"
                render={props => (
                  <NaviagtionBar
                    openLogin={this.handleOpenLogin}
                    openSignUp={this.handleOpenSignUp}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <Switch>
              <Route
                path="/restaurant/profile/:id"
                render={props => (
                  <RestaurantProfile user={this.state.user} {...props} />
                )}
              />
              <Route
                path="/user/:id"
                render={props => (
                  <UserProfile user={this.state.user} {...props} />
                )}
              />
              <Route
                path="/restaurant/registration/:id?"
                render={props => <RestaurantRegistration {...props} />}
              />
              <Redirect
                from="/restaurants/dummy/:city"
                to="/restaurants/:city"
              />
              <Route
                path="/restaurant/:id"
                render={props => <Restaurant {...props} />}
              />
              <Route
                path="/restaurants/:city"
                render={props => <Restaurants {...props} />}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" render={() => <NotFound />} />
              <Route path="/home" render={() => <HomeBottom />} />
              <Redirect from="/restaurants" to="/restaurants/delhi" />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
          <div className="loginPage" style={{ display: "none" }}>
            <Switch>
              <Route
                path="/restaurants/:city?"
                render={props => (
                  <Login
                    {...props}
                    closeTab={this.handleCloseLogin}
                    openSignUp={this.handleOpenSignUp}
                  />
                )}
              />
              <Route
                path="/"
                render={props => (
                  <Login
                    {...props}
                    closeTab={this.handleCloseLogin}
                    openSignUp={this.handleOpenSignUp}
                  />
                )}
              />
            </Switch>
          </div>
          <div className="loginPage" style={{ display: "none" }}>
            <Switch>
              <Route
                path="/restaurants/:city?"
                render={props => (
                  <SignUp
                    {...props}
                    closeTab={this.handleCloseSignUp}
                    openLogin={this.handleOpenLogin}
                  />
                )}
              />
              <Route
                path="/"
                render={props => (
                  <SignUp
                    {...props}
                    closeTab={this.handleCloseSignUp}
                    openLogin={this.handleOpenLogin}
                  />
                )}
              />
            </Switch>
          </div>
        </div>

        {/* yaha se alag hai */}
      </React.Fragment>
    );
  }
}

export default App;
