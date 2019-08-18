import React, { Component } from "react";
// import { captialize } from "../../util/util";
import { Link } from "react-router-dom";

class RestaurantDisplay extends Component {
  state = {};

  /**
   * function returning the rendering of the restaurant
   * @param object restaurant
   */
  renderRestaurant(restaurant) {
    // function refactorName(name) {
    //   return captialize(name);
    // }

    // function refactorCuisines(cuisines) {
    //   return typeof cuisines === "string" ? cuisines.split(",") : cuisines;
    // }

    // console.log(restaurant.id);
    let {
      id,
      name,
      features,
      cost: avCost,
      cuisines,
      thumb,
      timings,
      location,
      establishments,
      showPhone,
      phone_numbers,
      showMenu,
      showTables,
      rating,
      votes
    } = restaurant;

    // let { aggregate_rating: aggRating, votes } = rating;
    let { locality: highLocals, address } = location;
    // cuisines = refactorCuisines(cuisines);
    // name = refactorName(name);

    function renderTags() {
      let rTags = features.slice(0, 5);
      return (
        <React.Fragment>
          {rTags.map(tag => (
            <span className="badge badge-warning">{tag}</span>
          ))}
        </React.Fragment>
      );
    }

    function renderCuisines() {
      let rCuisines = cuisines.slice(0, 5);
      return (
        <React.Fragment>
          {rCuisines.map(cuisine => (
            <span className="badge badge-info">{cuisine}</span>
          ))}
        </React.Fragment>
      );
    }

    function renderEstablishments() {
      let establishmentString = "";
      for (let establishment of establishments) {
        establishmentString += establishment + " ";
      }
      return establishmentString;
    }

    function setOptionClass(option) {
      let classValue = "options";
      if (option === "call" && showPhone) classValue += " activeOption";
      if (option === "menu" && showMenu) classValue += " activeOption";
      return classValue;
    }

    return (
      <div className="container-fluid restaurantDisplay" key={id}>
        {/* this is the upper portion */}
        <div className="row">
          <div className="col-3">
            <img className="restaurantThumbnail" src={thumb} alt="not Found" />
          </div>

          <div className="col restaurantDesc">
            <p className="establishment">{renderEstablishments()}</p>
            <p className="banner">{name}</p>
            <p className="location">{highLocals}</p>
            <p className="address">{address}</p>
          </div>

          <div className="col-2 reviewDiv" style={{ textAlign: "right" }}>
            <h4 style={{ marginTop: "50%" }}>
              <span className="badge badge-success">{rating}</span>
            </h4>
            <span className="voteCount">{votes} votes</span>
          </div>
        </div>
        <hr />
        {/* this is the middle session */}
        <div className="row features">
          <table>
            <tbody>
              <tr>
                <td className="header">CUISINES:</td>
                <td className="data">{renderCuisines()}</td>
              </tr>
              <tr>
                <td className="header">COST FOR TWO:</td>
                <td className="data">Rs.&nbsp;{avCost}</td>
              </tr>
              <tr>
                <td className="header">HOURS:</td>
                <td className="data"> {timings}</td>
              </tr>
              <tr>
                <td className="header">FEATURES:</td>
                <td className="data"> {renderTags()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        {/* this is lower portion */}
        <div className="row restaurantContacts">
          <div className="col-4">
            <button
              onClick={() => this.props.onCall(restaurant)}
              id="call"
              className={setOptionClass("call")}
            >
              <span>
                <i className="fa fa-phone" aria-hidden="true" />
              </span>{" "}
              &nbsp;&nbsp;
              <span>Call</span>
            </button>
          </div>
          <div className="col-4">
            <button
              onClick={() => this.props.onMenu(restaurant)}
              id="menu"
              className={setOptionClass("menu")}
            >
              <span>
                <i className="fa fa-book" aria-hidden="true" />
              </span>{" "}
              &nbsp;&nbsp;
              <span>Menu</span>
            </button>
          </div>
          <div className="col-4">
            <Link
              to={"/restaurant/" + restaurant.id}
              id="book"
              className="btn options"
            >
              <span>
                <i className="fa fa-calendar" aria-hidden="true" />
              </span>{" "}
              &nbsp;&nbsp;
              <span>Book a Table</span>
            </Link>
          </div>
        </div>
        {showPhone && (
          <React.Fragment>
            <hr />
            <small
              className="text-danger"
              style={{ textAlign: "center", display: "block" }}
            >
              Available at{" "}
              <span>
                <i className="fa fa-phone" aria-hidden="true" />
              </span>
              &nbsp;&nbsp;
              {phone_numbers}
            </small>
          </React.Fragment>
        )}
        {showMenu && (
          <React.Fragment>
            <hr />
            <small
              className="text-muted"
              style={{ textAlign: "center", display: "block" }}
            >
              Sorry! MENU is not Available.
            </small>
          </React.Fragment>
        )}
        {showTables && <React.Fragment>Hello Tables HERE</React.Fragment>}
      </div>
    );
  }
  /**
   * end of renderRestaurant function
   */

  render() {
    let { restaurant: rt } = this.props;
    // return <h1>{name}</h1>;
    return this.renderRestaurant(rt);
  }
}

export default RestaurantDisplay;
