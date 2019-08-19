import React, { Component } from "react";

class ReviewDiv extends Component {
  render() {
    const { review } = this.props;
    console.log("review restaurnt", review);
    return (
      <div className="reviewDiv">
        <div className="row">
          <div className="col-2">
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
            <h6 className="title">{review.user.name}</h6>
            <small>
              <span className="text text-muted d-block">
                {review.user.city}
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

class RestaurantReviews extends Component {
  state = {};
  render() {
    console.log("poros target revies", this.props);
    return (
      <div className="showingReviews" id={this.props.id}>
        <h5 style={{ fontWeight: "900" }}>All Reviews</h5>
        {this.props.reviews.map(review => (
          <ReviewDiv review={review} />
        ))}
      </div>
    );
  }
}

export default RestaurantReviews;
