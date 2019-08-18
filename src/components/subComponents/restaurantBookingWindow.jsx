import React, { Component } from "react";
import RegistrationSubForm from "./registrationSubForm";
import FormInput from "./formInput";
import "../css/restaurant.css";
import * as bookingServices from "../../services/bookingServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class RestaurantBookingWindow extends Component {
  state = {
    data: {
      date: "",
      size: "10",
      time: "01:12",
      first_name: "Anshul",
      last_name: "Garg",
      email_id: "sci.agarg@gmail.com",
      phone_no: "9810301064"
    },
    errors: {},
    availableSlots: []
  };

  schema = {
    date: Joi.date()
      .min("now")
      .required()
      .label("Date"),
    size: Joi.number()
      .min(1)
      .max(20)
      .required()
      .label("No of Guests"),
    time: Joi.string()
      .required()
      .label("Time"),
    first_name: Joi.string()
      .required()
      .label("First Name"),
    last_name: Joi.any(),
    email_id: Joi.string()
      .email()
      .required()
      .label("Email"),
    phone_no: Joi.string()
      .min(10)
      .required()
      .label("Phone Number")
  };

  validate = () => {
    let errors = null;
    console.log("validate running");

    let validationResult = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!validationResult.error) return null;
    errors = {};
    for (let error of validationResult.error.details) {
      errors[error.path[0]] = error.message;
    }
    // if (this.state.account.email.trim() === "") {
    //   errors.email = "Email is req.";
    // }
    // if (this.state.account.password.trim() === "") {
    //   errors.password = "Password is req.";
    // }

    return errors;
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

  handleSubmit = async e => {
    e.preventDefault();

    let errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    let submissionData = { ...this.state.data };
    submissionData.restaurant_id = this.props.restaurant_id;
    console.log("state at submisson: \n", submissionData);
    try {
      let response = await bookingServices.bookTable(submissionData);
      if (response.status === 202) {
        let availableSlots = response.data;
        this.setState({ availableSlots });
      }
      if (response.status === 201) {
        let newData = {
          date: "",
          size: "",
          time: "",
          first_name: "",
          last_name: "",
          email_id: "",
          phone_no: ""
        };
        this.setState({ data: newData, availableSlots: [] });
        toast.info("Booking Successful");
      }
    } catch (ex) {
      const errors = { ...this.state.errors };
      // errors.email = ex.response.status + ": " + ex.response.data;
      console.log(ex.response);
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className="bookingDiv" id={this.props.id}>
        <h4 style={{ fontWeight: "900" }}>Booking Window</h4>
        <RegistrationSubForm title="1. Booking Details">
          <div className="row">
            <div className="col-4">
              <FormInput
                label="SELECT A DATE"
                value={this.state.data.date}
                onChange={this.handleInputChange}
                name="date"
                type="date"
                error={this.state.errors.date}
              />
            </div>
            <div className="col-4">
              <FormInput
                label="NO OF GUESTS"
                value={this.state.data.size}
                onChange={this.handleInputChange}
                name="size"
                type="number"
                min="1"
                max="20"
                error={this.state.errors.size}
              />
            </div>
            <div className="col-4">
              <FormInput
                label="TIME"
                value={this.state.data.time}
                onChange={this.handleInputChange}
                name="time"
                type="time"
                error={this.state.errors.time}
              />
            </div>
          </div>
        </RegistrationSubForm>
        <RegistrationSubForm title="2. Guest details">
          <div className="row">
            <div className="col">
              {" "}
              <FormInput
                label="FIRST NAME"
                value={this.state.data.first_name}
                onChange={this.handleInputChange}
                name="first_name"
                placeholder="eg. Abbu"
                error={this.state.errors.first_name}
              />
            </div>
            <div className="col">
              {" "}
              <FormInput
                label="LAST NAME"
                value={this.state.data.last_name}
                onChange={this.handleInputChange}
                name="last_name"
                placeholder="eg. Johannes"
                error={this.state.errors.last_name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <FormInput
                label="EMAIL"
                value={this.state.data.email_id}
                onChange={this.handleInputChange}
                name="email_id"
                type="email"
                placeholder="eg. abbu.johannes@mymail.com"
                error={this.state.errors.email_id}
              />
            </div>
            <div className="col">
              {" "}
              <FormInput
                label="PHONE NO"
                value={this.state.data.phone_no}
                onChange={this.handleInputChange}
                name="phone_no"
                type="number"
                placeholder="eg. 9876543210"
                error={this.state.errors.phone_no}
              />
            </div>
          </div>
        </RegistrationSubForm>
        {this.state.availableSlots.length > 0 && (
          <RegistrationSubForm title="Available Slots">
            <small style={{ display: "block" }} className="text text-secondary">
              Please opt a suitable slot
            </small>
            <small style={{ display: "block" }} className="text text-danger">
              Clicking on the slots available will directly book it for you at
              that time
            </small>
            <br />
            {this.state.availableSlots.map(slot => (
              <button
                className="btn btn-info"
                value={slot.start + ":00"}
                onClick={e => {
                  let { ...data } = this.state.data;
                  data.time = e.currentTarget.value;
                  console.log(e.currentTarget);
                  this.setState({ data }, () => {
                    this.handleSubmit(e);
                    console.log(this.state);
                  });
                }}
              >
                {slot.start.split(":")[0] > "12"
                  ? parseInt(slot.start.split(":")[0] - 12).toString() +
                    ":" +
                    slot.start.split(":")[1] +
                    " PM"
                  : slot.start + " AM"}
              </button>
            ))}
          </RegistrationSubForm>
        )}
        <button
          type="submit"
          disabled={this.state.availableSlots.length > 0}
          style={{ width: "100%", marginTop: "20px" }}
          className="btn btn-success"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default RestaurantBookingWindow;
