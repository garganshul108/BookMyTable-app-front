import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/notFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="outerDiv">
          <h3>Error: 404 Page Not Found</h3>
          <span>OOPS! The page you are looking for is not avilable</span>
          <div className="row">
            <div className="col-6">
              <span>Can try one of the following pages</span>
              <ul>
                <li>
                  <Link className="Link" to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="Link" to="/restaurants">
                    Restaurants
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
