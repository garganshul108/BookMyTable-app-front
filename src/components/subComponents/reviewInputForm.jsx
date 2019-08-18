import React, { Component } from "react";
import "../css/restaurant.css";
import RegistrationSubForm from "./registrationSubForm";
import RatingStar from "./ratingStar";
import * as fileServices from "../../services/fileServices";
import * as reviewServices from "../../services/reviewServices";
import { toast } from "react-toastify";

import { getDateTime } from "../../util/util";
const placeholderContent =
  "Tip: A great review covers food, service, and ambience. Got recommendations for your favourite dishes and drinks, or something everyone should try here? Include that too! And remember, your review needs to be at least 140 characters long :)";

const ratingText = {
  "1": "Very Poor",
  "2": "Poor",
  "3": "Good",
  "4": "Excellent",
  "5": "Outstanding"
};

class ReviewInputForm extends Component {
  state = {
    data: { rating: "", comment: "", photos: [] },
    photopath: "",
    user: {},
    ratingArray: [
      { value: "1", trueClass: "text-danger" },
      { value: "2", trueClass: "text-danger" },
      { value: "3", trueClass: "text-warning" },
      { value: "4", trueClass: "text-warning" },
      { value: "5", trueClass: "text-primary" }
    ],
    uploadInput: { files: [] }
  };

  handleImageUpload = async e => {
    e.preventDefault();
    let reviewPhoto = new FormData();
    let photo = this.state.uploadInput.files[0];
    // console.log("state file photo", photo);
    reviewPhoto.set("file", photo);
    // console.log("front end formData");
    // for (var pair of reviewPhoto.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      let response = await fileServices.fileUpload(reviewPhoto, "review");
      // console.log(response);
      let { data } = this.state;
      data.photos.push(response.data);
      this.setState({ data }, () => {
        toast.info("Photo uploaded");
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleInputChange = ({ currentTarget: input }) => {
    // console.log(
    //   input.name,
    //   input.value,
    //   input.dataset.parent,
    //   input.dataset.gparent
    // );
    let data = { ...this.state.data };
    if (input.dataset.gparent) {
      data[input.dataset.gparent][input.dataset.parent][input.name] =
        input.value;
    } else if (input.dataset.parent) {
      data[input.dataset.parent][input.name] = input.value;
    } else {
      data[input.name] = input.value;
    }
    this.setState({ data });
  };

  setRating = rate => {
    let { data } = this.state;
    data.rating = rate;
    this.setState({ data });
  };

  /***
   * 
   * finalData = {
    "comment": "sdfsfssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "rating": 1,
    "rating_text": "Excellent",
    "photos": ["adfb"],
    "restaurant_id": 19151039,
    "date": "12/08/2019",
    "time": "12:00"
  }
   */

  handleSubmit = async e => {
    e.preventDefault();
    let submissionData = { ...this.state.data };
    submissionData.restaurant_id = this.props.restaurant_id;
    let { date: dateToday, time: timeNow } = getDateTime(new Date());
    submissionData.date = dateToday;
    submissionData.time = timeNow;
    submissionData.rating_text = ratingText[submissionData.rating];
    console.log("state at submisson: \n", submissionData);
    try {
      let response = await reviewServices.postReview(submissionData);
      toast.success("Review Submitted");
      let newData = { rating: "", comment: "", photos: [] };
      this.setState({
        data: newData,
        uploadInput: { files: [] },
        photopath: ""
      });
    } catch (ex) {
      const errors = { ...this.state.errors };
      // errors.email = ex.response.status + ": " + ex.response.data;
      console.log(ex.response);
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className="reviewDiv" id={this.props.id}>
        <h4 style={{ fontWeight: "900" }}>Add a Review</h4>
        <RegistrationSubForm>
          <div className="container">
            <div className="row">
              <div className="col-2">Logged User Profile Pic</div>
              <div className="col">
                <div className="ratingInput">
                  <span
                    className="text-muted"
                    style={{ fontWeight: "900", fontSize: "0.9rem" }}
                  >
                    YOUR RATING
                  </span>
                  <div>
                    <big style={{ fontSize: "2rem" }}>
                      {this.state.ratingArray.map(rate => (
                        <RatingStar
                          rate={rate.value}
                          baseClass="fa fa-star"
                          trueClass={rate.trueClass}
                          falseClass="text-black-50"
                          currentRate={this.state.data.rating}
                          style={{ cursor: "pointer" }}
                          onClick={({ currentTarget }) => {
                            this.setRating(currentTarget.dataset.value);
                          }}
                        />
                      ))}
                    </big>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <textarea
                      value={this.state.data.comment}
                      onChange={this.handleInputChange}
                      className="form-control"
                      name="comment"
                      rows="4"
                      style={{ padding: "15px" }}
                      placeholder={placeholderContent}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="photoInput"
                        onChange={e => {
                          console.log(e.target.files);
                          let { photopath } = this.state;
                          photopath = e.target.files[0].name;
                          let { uploadInput } = this.state;
                          uploadInput.files = e.target.files;
                          this.setState({ uploadInput, photopath });
                        }}
                      />
                      <label className="custom-file-label" htmlFor="photoInput">
                        {this.state.photopath
                          ? this.state.photopath
                          : "Add a Photo"}
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div
                      className="btn btn-info"
                      onClick={this.handleImageUpload}
                    >
                      Upload
                    </div>
                  </div>
                </div>
                {/* photo => "http://localhost:5000/api/photos/" + photo + "?dir=review" */}
                <div className="uploadedPhotoDisplay">
                  <div className="row">
                    <div className="col">
                      {this.state.data.photos.map(photo => (
                        <img
                          src={fileServices.getPhotoURL(photo, "review")}
                          alt="not available"
                          data-value={photo}
                          onClick={({ currentTarget }) => {
                            console.log(
                              "photo",
                              photo,
                              currentTarget.dataset.value
                            );
                            let targetPhoto = currentTarget.dataset.value;
                            let { data } = this.state;
                            let index = data.photos.indexOf(targetPhoto);

                            data.photos.splice(index, 1);

                            this.setState({ data }, () =>
                              console.log(this.state.data)
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ width: "100%", marginTop: "20px" }}
                  className="btn btn-success"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </RegistrationSubForm>
      </div>
    );
  }
}

export default ReviewInputForm;
