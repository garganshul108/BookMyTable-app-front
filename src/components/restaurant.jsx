import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RestaurantBookingWindow from "./subComponents/restaurantBookingWindow";
import NotFound from "./notFound";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import ReviewInputForm from "./subComponents/reviewInputForm";
import { getRestaurantById } from "../services/restaurantServices";
import "./css/restaurant.css";
import PhotoGallery from "./subComponents/photoGallery";

import * as beenThereServices from "../services/beenThereServices";
import { toast } from "react-toastify";
import * as bookmarkServices from "../services/bookmarkServices";
import { time24To12, getDateTime } from "../util/util";
import RestaurantReviews from "./subComponents/restaurantReviews";

let photo = [
  "https://b.zmtcdn.com/data/pictures/chains/5/18895645/24279bed659c9c07ea57444d841a305c.jpg?crop=3738%3A3738%3B764%2C0&fit=around%7C200%3A200",
  "https://b.zmtcdn.com/data/pictures/chains/1/491/d9cdb557070f37c148b81aacd239593c.jpg?crop=3744%3A3744%3B1392%2C0&fit=around%7C200%3A200",
  "https://b.zmtcdn.com/data/pictures/chains/1/491/5807c28869fee0e18235f22fca139e24.jpg?crop=277%3A277%3B0%2C0&fit=around%7C200%3A200",
  "https://b.zmtcdn.com/data/pictures/chains/1/491/4698634d17bd06561f4f97573865fd9e.jpg?crop=332%3A332%3B93%2C0&fit=around%7C200%3A200",
  "https://b.zmtcdn.com/data/pictures/chains/1/491/a8ed0bf5795596bc6e69f1347d7b6b8c.jpg?crop=301%3A301%3B61%2C0&fit=around%7C200%3A200"
];

photo = [...photo, ...photo, ...photo, ...photo];

const wideDisplayString =
  "?fit=around%7C920%3A200%20&crop=920%3A200%3B%2A%2C%2A";
class Restaurant extends Component {
  state = {
    restaurant: {
      capacity: 0,
      cost: 0,
      cuisines: [],
      days: {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
      },
      email: null,
      establishments: [],
      features: [],
      id: 0,
      location: {
        id: 0,
        city: "",
        zipcode: null,
        locality: "",
        locality_verbose: "",
        address: ""
      },
      name: "",
      opening_status: null,
      phone_numbers: "",
      rating: null,
      reviews: [],
      slots: [],
      thumb: "",
      timings: "",
      website: null,
      wideDisplay: ""
    },
    breadcrumbs: ["Home", "All Restaurants", "Restaurant"]
  };

  async componentDidMount() {
    let restaurant = await getRestaurantById(this.props.match.params.id);
    restaurant = restaurant[0];
    console.log("supplied", restaurant);
    restaurant.wideDisplay = restaurant.thumb.split("?")[0] + wideDisplayString;
    this.setState({ restaurant }, () => {
      console.log(this.state);
    });
  }

  handleAddBeenThere = async e => {
    e.preventDefault();
    console.log("been there clicked");
    let restaurant_id = this.props.match.params.id;
    let { date, time } = getDateTime(new Date());
    let submissionData = { restaurant_id, date, time };
    console.log(submissionData);
    try {
      await beenThereServices.postBeenThere(submissionData);
      toast.info("Been There added");
    } catch (error) {}
  };

  handleAddBookmark = async e => {
    e.preventDefault();
    console.log("bookmark clicked");
    let restaurant_id = this.props.match.params.id;
    let { date, time } = getDateTime(new Date());
    let submissionData = { restaurant_id, date, time };
    console.log(submissionData);
    try {
      await bookmarkServices.postBookmark(submissionData);
      toast.info("Restaurant Archived");
    } catch (error) {}
  };

  renderRestaurantInfo = () => {
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
            <div className="badge rating-large badge-success">
              {this.state.restaurant.rating}{" "}
              <span style={{ fontSize: "80%" }}>/5</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <div className="topButtons">
              <button
                type="button"
                class="btn "
                onClick={this.handleAddBookmark}
              >
                <i class="fa fa-bookmark" aria-hidden="true" />
                &nbsp;&nbsp;Archive
              </button>
              <button
                type="button"
                class="btn "
                onClick={this.handleAddBeenThere}
              >
                <i class="fa fa-child" aria-hidden="true" />
                &nbsp;&nbsp;Been There
              </button>
              <Scroll.Link
                to="bookingWindow"
                smooth={true}
                offset={-70}
                duration={500}
                type="button"
                class="btn "
              >
                <i class="fa fa-cutlery" aria-hidden="true" />
                &nbsp;&nbsp;Book a Table
              </Scroll.Link>
              <Scroll.Link
                to="reviewForm"
                smooth={true}
                offset={-70}
                duration={1000}
                type="button"
                class="btn "
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true" />
                &nbsp;&nbsp;Review Visit
              </Scroll.Link>
              <Scroll.Link
                type="button"
                class="btn "
                to="allReviews"
                smooth={true}
                offset={-70}
                duration={1000}
              >
                <i class="fa fa-file-text" aria-hidden="true" />
                &nbsp;&nbsp;All reviews
              </Scroll.Link>
              <Scroll.Link
                to="photoGallery"
                smooth={true}
                offset={-70}
                duration={1000}
                type="button"
                class="btn "
              >
                <i class="fa fa-picture-o" aria-hidden="true" />
                &nbsp;&nbsp;Photos/Gallery
              </Scroll.Link>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-4">
            <div className="row">
              <div className="col">
                <div className="subInfo">
                  <h5 className="subTitle">Phone Numbers</h5>
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
                {/* {this.state.restaurant.location.zipcode} */}
              </span>
            </div>
            <div className="subInfo">
              <h5 className="subTitle">Days</h5>
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
      </div>
    );
  };
  render() {
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
              {this.renderRestaurantInfo()}

              <div className="restaurantActiions">
                <div className="row">
                  <div className="col">
                    <Route
                      path="/restaurant/:id"
                      render={props => (
                        <RestaurantBookingWindow
                          id="bookingWindow"
                          restaurant_id={this.props.match.params.id}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path="/restaurant/:id"
                      render={props => (
                        <PhotoGallery
                          id="photoGallery"
                          photos={photo}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path="/restaurant/:id"
                      render={props => (
                        <ReviewInputForm
                          id="reviewForm"
                          restaurant_id={this.props.match.params.id}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path="/restaurant/:id"
                      render={props => (
                        <RestaurantReviews
                          id="allReviews"
                          restaurant_id={this.props.match.params.id}
                          reviews={this.state.restaurant.reviews}
                          {...props}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">options</div>
        </div>
        <div className="row">
          <div className="col dummy" />
        </div>
      </div>
    );
  }
}

export default Restaurant;
