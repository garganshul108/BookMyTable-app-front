import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import "../css/navigationBar.css";
import auth from "../../services/authServices";
// import Login from '../login';
import SearchableList from "./searchableList";
import { getCities } from "../../services/cityServices";

class NaviagtionBar extends Component {
  state = {
    city: "",
    cities: []
  };

  async componentDidMount() {
    let cities = await getCities();
    // console.log("nav cdm", data);
    this.setState({ cities });
    // getCities()
    //   .then(data => {
    //     console.log("naigation bar", data);
    //   })
    //   .catch(e => console.log("navigationbar error city", e));
  }

  handleCityInputChange = ({ currentTarget: input }) => {
    // console.log("city", input);
    let { city } = this.state;
    // console.log("input.value", input.value);
    city = input.value;
    // console.log("cc:", city);
    this.setState({ city }, () => {
      // console.log(this.state);
    });
  };

  render() {
    // console.log("navigation bar", this.props);
    return (
      <React.Fragment>
        <div className="navBar-design">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <NavLink className="navbar-brand" to="/home">
                BookMyTable
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="#" />
                  </li>
                </ul>
                <div className="form-inline">
                  <SearchableList
                    // className="searchBox"
                    placeholder="City"
                    listName="cities"
                    value={this.state.city}
                    onChange={this.handleCityInputChange}
                  >
                    {this.state.cities.map(item => (
                      <option value={item.name} label={item.state} />
                    ))}
                  </SearchableList>
                  <div className="form-group">
                    <Link
                      // className=""
                      className="btn btn-danger searchBox m-2"
                      to={"/restaurants/dummy/" + this.state.city.toLowerCase()}
                      // type="submit"
                      // onClick={e => {
                      //   e.preventDefault();
                      //   window.location =
                      //     "/restaurants/" + this.state.city.toLowerCase();
                      // }}
                    >
                      <i className="fa fa-search" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* this is the user bar will appear as user logsin */}
        <div className="userBar-design">
          <div className="container" style={{ textAlign: "right" }}>
            {this.props.user ? (
              <React.Fragment>
                <div className="dropdown">
                  <button
                    style={{ padding: "1px 10px" }}
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <small>{this.props.user.name}</small>
                  </button>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <NavLink
                      className="dropdown-item"
                      to={"/user/" + this.props.user.public_id}
                    >
                      <span className="text-muted">
                        <i className="fa fa-user" aria-hidden="true" />
                      </span>
                      &nbsp;&nbsp;Profile
                    </NavLink>
                    <NavLink className="dropdown-item" to="/logout">
                      <span className="text-muted">
                        <i className="fa fa-sign-out" aria-hidden="true" />
                      </span>
                      &nbsp;&nbsp;Logout
                    </NavLink>
                    <NavLink className="dropdown-item" to="/contact">
                      <span className="text-muted">
                        <i className="fa fa-lightbulb-o" aria-hidden="true" />
                      </span>
                      &nbsp;&nbsp;About us
                    </NavLink>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="dropdown">
                  <button
                    style={{ padding: "1px 10px" }}
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <small style={{ fontWeight: 900 }}>Login</small>
                  </button>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <NavLink
                      className="dropdown-item"
                      onClick={this.props.openLogin}
                    >
                      <small className="text text-muted">Already a user?</small>
                      <br />
                      <span className="text-muted">
                        <i className="fa fa-user" aria-hidden="true" />
                      </span>
                      &nbsp;&nbsp;Login
                    </NavLink>
                    <hr />
                    <NavLink
                      className="dropdown-item"
                      onClick={this.props.openSignUp}
                    >
                      <small className="text text-muted">New user?</small>
                      <br />
                      <span className="text-muted">
                        <i className="fa fa-sign-out" aria-hidden="true" />
                      </span>
                      &nbsp;&nbsp;Sign Up
                    </NavLink>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NaviagtionBar;
