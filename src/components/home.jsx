import React, { Component } from "react";
import "./css/home.css";
import img from "./images/HomeTab.jpg";
import { Link } from "react-router-dom";
import SearchableList from "./subComponents/searchableList";
import { getCities } from "../services/cityServices";
// import backend from "../services/backendServices";

class HomeTop extends Component {
  state = {
    cities: [],
    city: ""
  };

  async componentDidMount() {
    const cities = await getCities();
    // console.log(cities);
    this.setState({ cities });
  }

  handleCityInputChange = ({ currentTarget: input }) => {
    console.log("city", input);
    let { city } = this.state;
    console.log("input.value", input.value);
    city = input.value;
    console.log("cc:", city);
    this.setState({ city }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <div className="homeTab">
        <div className="row no-gutters">
          <div className="col">
            <div className="homeContent">
              <div className="dummy" />
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h3 className="title">BookMyTable.com</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="userButtons">
                      <Link
                        className="text-danger btn-lg buttons"
                        onClick={this.props.openLogin}
                      >
                        <small className="font-weight-bold">
                          <span className="text text-default">
                            <i className="fa fa-user" aria-hidden="true" />
                          </span>
                          &nbsp;Login
                        </small>
                      </Link>
                      or
                      <Link
                        className="text-warning btn-lg buttons"
                        onClick={this.props.openSignUp}
                      >
                        <small className="font-weight-bold">
                          <span className="text text-default ">
                            <i className="fa fa-sign-out" aria-hidden="true" />
                          </span>
                          &nbsp;Create a New Account
                        </small>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="dummy" />
                </div> */}
                <div className="row">
                  <div className="col desc">
                    <big>Hungry KYA?</big>
                    <small className="text text-muted">
                      What about a table in the restaurant near you?
                    </small>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-inline">
                      <SearchableList
                        className="searchBox"
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
                          to={"/restaurants/" + this.state.city.toLowerCase()}
                          // type="submit"
                        >
                          <i className="fa fa-search" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col desc">
                    <small className="text text-muted">
                      <strong>
                        <Link
                          className="btn btn-success buttons m-2"
                          to="/restaurants/delhi"
                        >
                          Delhi
                        </Link>
                        <Link
                          className="btn btn-success buttons m-2"
                          to="/restaurants/kolkata"
                        >
                          KolKata
                        </Link>
                        <Link
                          className="btn btn-success buttons m-2"
                          to="/restaurants/gurgaon"
                        >
                          Gurgaon
                        </Link>
                      </strong>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="row no-gutters">
          <div
            className="col"
            style={{ height: "300px", background: "black" }}
          />
        </div>
      </div>
    );
  }
}

export default HomeTop;
