import React, { Component } from "react";
import "./css/userProfile.css";
import { getUser } from "../services/userServices";
import _ from "lodash";
import { getPhotoURL } from "../services/fileServices";
import { getDateTimeDiff } from "../util/util";

const tempProfile =
  "https://b.zmtcdn.com/data/user_profile_pictures/6e4/9f999a3334fd5ea937fa98f2843276e4.jpg?fit=around%7C300%3A300&crop=300%3A300%3B%2A%2C%2A";

class ReviewDiv extends Component {
  render() {
    const { review } = this.props;
    return (
      <div className="reviewDiv">
        <div className="row">
          <div className="col-3">
            <img
              style={{ width: "100%" }}
              src={review.restaurant.thumb}
              alt="not Found"
            />
          </div>
          <div className="col">
            <small>
              <span className="text text-muted d-block">
                <i class="fa fa-street-view" aria-hidden="true" />
                &nbsp;&nbsp;review
              </span>
            </small>
            <h6 className="title">{review.restaurant.name}</h6>
            <small>
              <span className="text text-muted d-block">
                {review.restaurant.locality}
              </span>
              <span className="text text-muted d-block">
                {review.restaurant.city}
              </span>
            </small>
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <small className="text-muted">{review.date}</small>
            <span className="d-block text-dark rateDisplay">
              Rated:&nbsp;
              <span className="badge badge-danger">{review.rating}</span>
              &nbsp;{review.rating_text}
            </span>
            <span className="d-block comment">{review.comment}</span>
          </div>
        </div>
        <div className="row my-3 reviewPhotos">
          <div className="col">
            {review.photos.map(photo => (
              <img src={photo} alt="Image not available" />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class BeenThereDiv extends Component {
  render() {
    const { beenThere } = this.props;
    return (
      <div className="beenThereDiv">
        <div className="row">
          <div className="col-3">
            <img
              style={{ width: "100%" }}
              src={beenThere.restaurant.thumb}
              alt="not Found"
            />
          </div>
          <div className="col">
            <small>
              <span className="text text-muted d-block">
                <i class="fa fa-map-marker" aria-hidden="true" />
                &nbsp;&nbsp;been there
              </span>
            </small>
            <h6 className="title">{beenThere.restaurant.name}</h6>
            <small>
              <span className="text text-muted d-block">
                {beenThere.restaurant.city}
              </span>
              <span className="text text-muted d-block">
                {beenThere.restaurant.address}
              </span>

              <small className="text-muted">{beenThere.date}</small>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

class BookmarkDiv extends Component {
  render() {
    const { bookmark } = this.props;
    return (
      <div className="bookmarkDiv">
        <div className="row">
          <div className="col-3">
            <img
              style={{ width: "100%" }}
              src={bookmark.restaurant.thumb}
              alt="not Found"
            />
          </div>
          <div className="col">
            <small>
              <span className="text text-muted d-block">
                <i class="fa fa-bookmark" aria-hidden="true" />
                &nbsp;&nbsp;bookmark
              </span>
            </small>
            <h6 className="title">{bookmark.restaurant.name}</h6>
            <small>
              <span className="text text-muted d-block">
                {bookmark.restaurant.city}
              </span>
              <span className="text text-muted d-block">
                {bookmark.restaurant.address}
              </span>

              <small className="text-muted">{bookmark.date}</small>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

class UserProfile extends Component {
  state = {
    user: {},
    reviews: [],
    beentheres: [],
    bookmarks: [],
    dineline: [],
    currentDiv: 1
  };

  async componentDidMount() {
    let { data } = await getUser();
    console.log(data);
    data = data[0];
    let { beentheres, reviews, bookmarks } = data;
    let dineline = [];
    for (let bookmark of bookmarks) {
      bookmark.type = "bookmark";
    }
    for (let beenthere of beentheres) {
      beenthere.type = "beenthere";
    }
    for (let review of reviews) {
      review.type = "review";
    }

    dineline = [...bookmarks, ...reviews, ...beentheres];
    dineline = _.shuffle(_.shuffle(dineline));

    console.log("dl", dineline);

    dineline = dineline.sort((a, b) => {
      return getDateTimeDiff(a, b);
    });

    console.log("dl", dineline);

    reviews = reviews.sort((a, b) => {
      return getDateTimeDiff(a, b);
    });

    beentheres = beentheres.sort((a, b) => {
      return getDateTimeDiff(a, b);
    });

    bookmarks = bookmarks.sort((a, b) => {
      return getDateTimeDiff(a, b);
    });

    console.log("dineline", dineline);
    delete data.beentheres;
    delete data.reviews;
    delete data.bookmarks;
    let user = data;

    for (let review of reviews) {
      review.photos = review.photos.map(photo => getPhotoURL(photo, "review"));
    }

    this.setState({ user, reviews, beentheres, bookmarks, dineline }, () => {
      console.log("state userPROFILE", this.state);
    });
  }

  changeCurrentDiv = val => {
    this.setState({ currentDiv: val });
  };

  render() {
    const renderUserInfo = () => {
      return (
        <div className="row">
          <div className="col">
            <div className="userInfo">
              <div className="row">
                <div className="col-2">
                  <img
                    className="userThumbnail"
                    src={tempProfile}
                    alt="not Found"
                  />
                </div>
                <div className="col-1" />
                <div className="col">
                  <h1 style={{ fontWeight: "900" }}>{this.state.user.name}</h1>
                  <hr />
                  <table>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          <i
                            class="fa fa-envelope text-warning"
                            aria-hidden="true"
                          />
                        </td>
                        <td>
                          <span
                            className="text-muted"
                            style={{ display: "block" }}
                          >
                            &nbsp;{this.state.user.email_id}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <i
                            class="fa fa-map-marker text-danger"
                            aria-hidden="true"
                          />
                        </td>
                        <td>
                          <span
                            className="text-muted"
                            style={{ display: "block" }}
                          >
                            &nbsp;{this.state.user.city}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderDineline = () => {
      return (
        <div className="showingDineline">
          <h5>Dineline</h5>
          {this.state.dineline.map(dine => {
            return dine.type === "review" ? (
              <ReviewDiv review={dine} />
            ) : dine.type === "bookmark" ? (
              <BookmarkDiv bookmark={dine} />
            ) : (
              <BeenThereDiv beenThere={dine} />
            );
          })}
        </div>
      );
    };

    const renderReviews = () => {
      return (
        <div className="showingReviews">
          <h5>Reviews</h5>
          {this.state.reviews.map(review => (
            <ReviewDiv review={review} />
          ))}
        </div>
      );
    };

    const renderBeenTheres = () => {
      return (
        <div className="showingBeenTheres">
          <h5>Been Theres</h5>
          {this.state.beentheres.map(beenThere => (
            <BeenThereDiv beenThere={beenThere} />
          ))}
        </div>
      );
    };

    const renderBookmarks = () => {
      return (
        <div className="showingBookmarks">
          <h5>Bookmarks</h5>
          {this.state.bookmarks.map(bookmark => (
            <BookmarkDiv bookmark={bookmark} />
          ))}
        </div>
      );
    };

    const renderUserHistory = () => {
      return (
        <div className="userHistory">
          <div className="row">
            <div className="col-4">
              <ul class="list-group">
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(1)}
                >
                  Dineline
                </li>
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(2)}
                >
                  Reviews
                </li>
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(3)}
                >
                  Bookmarks
                </li>
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(4)}
                >
                  Been There
                </li>
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(5)}
                >
                  Recently Visited
                </li>
                <li
                  class="list-group-item options"
                  onClick={() => this.changeCurrentDiv(6)}
                >
                  Bills
                </li>
              </ul>
            </div>
            <div className="col">
              <div className="displayHistoryElements">
                {this.state.currentDiv == 1 && renderDineline()}
                {this.state.currentDiv == 2 && renderReviews()}
                {this.state.currentDiv == 3 && renderBookmarks()}
                {this.state.currentDiv == 4 && renderBeenTheres()}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        <div className="dummy" />
        <div className="row">
          <div className="col">
            {renderUserInfo()}
            {renderUserHistory()}
          </div>
          <div className="col-2">.</div>
        </div>
        <div className="dummy" />
      </div>
    );
  }
}

export default UserProfile;
