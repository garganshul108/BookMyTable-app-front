import React, { Component } from "react";
import { time24To12, getDateTime } from "../util/util";
import { getRestaurantById } from "../services/restaurantServices";
import HintBox from "./subComponents/hintBox";
import { toast } from "react-toastify";

const wideDisplayString =
  "?fit=around%7C920%3A200%20&crop=920%3A200%3B%2A%2C%2A";

class RestaurantProfile extends Component {
  state = {
    restaurant: {
      capacity: 300,
      cost: 2000,
      cuisines: ["Cuisine1", "Cuisine2"],
      days: {
        Monday: 1,
        Tuesday: 0,
        Wednesday: 1,
        Thursday: 1,
        Friday: 0,
        Saturday: 1,
        Sunday: 0
      },
      email: "restaurnat@email.com",
      establishments: ["Establishment1", "Establishment2"],
      features: [
        "Feature",
        "Feature",
        "Feature",
        "Feature",
        "Feature",
        "Feature",
        "Feature",
        "Feature",
        "Feature"
      ],
      id: 1234567890,
      location: {
        id: 0,
        city: "City",
        zipcode: "123456",
        locality: "Locality",
        locality_verbose: "Locality Verbose",
        address: "this is the long address string"
      },
      name: "Name",
      opening_status: "1",
      phone_numbers: "0123-4567890",
      rating: "0",
      reviews: [],
      slots: [{ end_time: "20:00", start_time: "10:00" }],
      thumb: "?",
      website: "www.website.com",
      wideDisplay: ""
    },
    breadcrumbs: ["Home", "Restaurant", "Profile"]
  };

  async componentDidMount() {
    console.log("proioflie id", this.props.match.params.id);
    let restaurant = await getRestaurantById(this.props.match.params.id);
    restaurant = restaurant[0];
    console.log("supplied", restaurant);
    restaurant.wideDisplay = restaurant.thumb.split("?")[0] + wideDisplayString;
    this.setState({ restaurant }, () => {
      console.log(this.state);
    });
  }
  render() {
    const renderRestaurantInfo = () => {
      return (
        <div className="restaurantInfoBanner">
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h1 className="title">{this.state.restaurant.name}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col text-muted">
                  {this.state.restaurant.location.locality}
                  <small className="text-muted middot">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-square" aria-hidden="true" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </small>
                  {this.state.restaurant.establishments.map(estb => `${estb} `)}
                </div>
              </div>
            </div>
            <div className="col-3 text-right">
              <div
                className="badge rating-large badge-success"
                onClick={() => {
                  toast.warning("Under Process");
                }}
              >
                <i className="fa fa-pencil-square-o small" aria-hidden="true" />
                &nbsp;Edit
              </div>
            </div>
          </div>
          <hr />

          <br />
          <h4 style={{ fontWeight: "900" }}>Your Basic Information</h4>
          <span
            className="text-muted"
            style={{ fontSize: "0.8rem", display: "block" }}
          >
            Click on the Edit button to update the infomation shown below
          </span>
          <br />
          <div className="row">
            <div className="col-4">
              <div className="row">
                <div className="col">
                  <div className="subInfo">
                    <h5 className="subTitle">Phone Numbers</h5>
                    <HintBox>format: STD-PHONE_NUMBER</HintBox>
                    {this.state.restaurant.phone_numbers.split(",").map(ph => (
                      <React.Fragment>
                        <span
                          className="text-success"
                          style={{
                            fontWeight: "900",
                            fontSize: "1.2rem",
                            display: "block"
                          }}
                        >
                          {ph}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="subInfo">
                    <h5 className="subTitle">Cuisines</h5>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.8rem", display: "block" }}
                    >
                      Consists of all the cuisines added by the restaurant only
                    </span>
                    {this.state.restaurant.cuisines.map(cuisine => (
                      <React.Fragment>
                        <span
                          className="text-danger"
                          style={{ fontSize: "0.95rem", display: "block" }}
                        >
                          {cuisine}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="subInfo">
                    <h5 className="subTitle">Average Cost</h5>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.8rem", display: "block" }}
                    >
                      Must be relevant, important in Customer attraction
                    </span>
                    <span style={{ fontSize: "0.95rem", display: "block" }}>
                      ₹{this.state.restaurant.cost} for two people (approx.)
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.8rem", display: "block" }}
                    >
                      Exclusive of applicable taxes and charges, if any
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="subInfo">
                <h5 className="subTitle">Opening Hours</h5>
                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  Displays the slots made available by the restaurant
                </span>
                {this.state.restaurant.slots.map(slot => (
                  <React.Fragment>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.9rem"
                      }}
                    >
                      {
                        <span>
                          {time24To12(slot.start_time)}&nbsp;-&nbsp;
                          {time24To12(slot.end_time)}
                        </span>
                      }
                    </span>
                  </React.Fragment>
                ))}
                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  May update on Restaurant's request
                </span>
              </div>
              <div className="subInfo">
                <h5 className="subTitle">Address</h5>
                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  Help in locating the venue : Locality, City, Full Address
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.95rem",
                    fontWeight: "700"
                  }}
                >
                  {this.state.restaurant.location.locality_verbose}
                </span>

                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  {this.state.restaurant.location.address} <br />
                  {this.state.restaurant.location.zipcode}
                </span>
              </div>
              <div className="subInfo">
                <h5 className="subTitle">Days</h5>
                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  Displayed as per the marked days by the restaurant
                </span>
                <div className="row">
                  {Object.keys(this.state.restaurant.days).map(day => (
                    <React.Fragment>
                      <div className="col-6">
                        <span style={{ fontSize: "0.85rem", display: "block" }}>
                          {this.state.restaurant.days[day] ? (
                            <i
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            />
                          )}
                          &nbsp;
                          {day}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="subInfo">
                <h5 className="subTitle">Features</h5>
                <span
                  className="text-muted"
                  style={{ fontSize: "0.8rem", display: "block" }}
                >
                  As per the restaurant input, Important role in customer
                  attraction
                </span>
                {this.state.restaurant.features.map(feature => (
                  <React.Fragment>
                    <span style={{ fontSize: "0.85rem", display: "block" }}>
                      <i
                        className="fa fa-check text-success"
                        aria-hidden="true"
                      />
                      &nbsp;
                      {feature}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <br />
          <h4 style={{ fontWeight: "900" }}>Your Personal Information</h4>
          <span
            className="text-muted"
            style={{ fontSize: "0.8rem", display: "block" }}
          >
            Not accessible to the viewers
          </span>
          <br />
          <div className="row">
            <div className="col">
              <div className="subInfo">
                <h5 className="subTitle">Capacity</h5>
                <HintBox>Important Credential for Booking Availability</HintBox>
                <HintBox>
                  Requested not to change often, Could lead to circumstancial
                  ban
                </HintBox>
                {this.state.restaurant.capacity}
              </div>
            </div>
            <div className="col">
              <div className="subInfo">
                <h5 className="subTitle">Email</h5>
                <HintBox>Important Credential for the Login/SignUp</HintBox>
                <HintBox>Unique to each Restaurant</HintBox>
                {!this.state.restaurant.email && "Not Supplied"}
              </div>
            </div>
          </div>
          <hr />
          <br />
          <h4 style={{ fontWeight: "900" }}>Your Performance card</h4>
          <HintBox>Based on reviews and ratings</HintBox>
          <br />
          <div className="row">
            <div className="col">
              <div className="subInfo">
                <h5 className="subTitle">Current Ratings</h5>

                <big>
                  <div className="badge badge-success">
                    {this.state.restaurant.rating}
                    &nbsp;
                    <i className="fa fa-star" aria-hidden="true" />
                  </div>
                </big>
                <HintBox>
                  Current Net Rating calculated based upon reviews supplied
                </HintBox>
                <HintBox>Doesn't change on review expiry also</HintBox>
              </div>
            </div>
            <div className="col">
              <div className="subInfo">
                <h5 className="subTitle">Total Votes</h5>

                <big>
                  <div className="badge badge-danger">
                    {this.state.restaurant.votes}
                    &nbsp;
                    <i className="fa fa-hand-peace-o" aria-hidden="true" />
                  </div>
                </big>
                <HintBox>Counted on reviews</HintBox>
                <HintBox>Doesn't change on review expiry also</HintBox>
              </div>
            </div>
            <div className="col-5">
              <div className="subInfo">
                <h5 className="subTitle">Reviews Avialable</h5>

                <big>
                  <div className="badge badge-info">
                    {this.state.restaurant.reviews.length}
                    &nbsp;
                    <i className="fa fa-pagelines" aria-hidden="true" />
                  </div>
                </big>
                <HintBox>Counted on reviews</HintBox>
                <HintBox>
                  Reviews have a life. Once they get depricated they get deleted
                  from the database, Just to make it look clean and relevant
                </HintBox>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        <div className="row">
          <div className="dummy">
            <small>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ background: "inherit" }}>
                  {this.state.breadcrumbs.map(crumb => (
                    <li className="breadcrumb-item active" aria-current="page">
                      {crumb}
                    </li>
                  ))}
                </ol>
              </nav>
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* main */}
            <div className="mainDisplay">
              <div className="row">
                <div className="col">
                  <div
                    className="restaurantImg"
                    style={{
                      background:
                        "url(" + this.state.restaurant.wideDisplay + ")",
                      height: "200px",
                      width: "100%"
                    }}
                  />
                </div>
              </div>
              {renderRestaurantInfo()}
            </div>
            {/* main end */}
          </div>
          <div className="col-2">OPT</div>
        </div>
        <div className="row">
          <div className="col">
            <div className="dummy" />
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;
