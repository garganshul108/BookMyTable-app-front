import React, { Component } from "react";
import Joi from "joi-browser";

import FormInput from "./subComponents/formInput";

import welcomeback from "./images/welcomeback.jpg";

import "./css/login.css";
import FormCheckbox from "./subComponents/formCheckbox";

import auth from "../services/authServices";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    account: { email: "", password: "", isRestaurant: false },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(3)
      .required()
      .label("Password"),
    isRestaurant: Joi.boolean()
  };
  handleInputChange = e => {
    let account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleCheckboxChange = ({ currentTarget: checkbox }) => {
    // console.log(
    //   "name " + checkbox.name,
    //   "\nch " + checkbox.checked,
    //   "\npa " + checkbox.dataset.parent,
    //   "\nga " + checkbox.dataset.gparent
    // );
    let data = { ...this.state.account };
    if (checkbox.dataset.gparent) {
      data[checkbox.dataset.gparent][checkbox.dataset.parent][checkbox.name] =
        checkbox.checked;
    } else if (checkbox.dataset.parent) {
      data[checkbox.dataset.parent][checkbox.name] = checkbox.checked;
    } else {
      data[checkbox.name] = checkbox.checked;
    }
    this.setState({ account: data });
  };

  validate = () => {
    let errors = {};

    let validationResult = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!validationResult.error) return null;

    for (let error of validationResult.error.details) {
      errors[error.path[0]] = error.message;
    }
    if (this.state.account.email.trim() === "") {
      errors.email = "Email is req.";
    }
    if (this.state.account.password.trim() === "") {
      errors.password = "Password is req.";
    }

    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();

    let errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
    console.log("submitting LOGIN form", this.state.account);
    let finalData = { ...this.state.account };
    finalData["restaurant"] = finalData["isRestaurant"];
    delete finalData["isRestaurant"];

    try {
      let response = await auth.login(finalData);
      console.log(response);
      localStorage.setItem("token", response.headers["x-token"]);
      toast.success("Login Successful");
      setTimeout(() => {
        window.location = "/restaurants/" + this.props.match.params.city;
      }, 1000);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status < 500 &&
        ex.response.status >= 400
      ) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.status + ": " + ex.response.data;
        console.log(ex.response);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        className="container-fluid"
        style={{ width: "100%", height: "100%", padding: "0" }}
      >
        <div
          className="row"
          style={{ margin: "0", width: "100%", height: "100%" }}
        >
          <div className="col" />
          <div className="col-5 loginContainer">
            <button onClick={this.props.closeTab} className="btn btn-danger">
              <i className="fa fa-times" aria-hidden="true" />
            </button>
            <div className="loginDiv">
              <small className="form-text text-muted">Already a User?</small>
              <h4>Login to continue</h4>
              <form onSubmit={this.handleSubmit}>
                <FormInput
                  value={this.state.account.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Enter email"
                  error={this.state.errors.email}
                />
                <FormInput
                  value={this.state.account.password}
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span className="text-muted">
                  <FormCheckbox
                    label="  I am a restaurant"
                    xClass="d-inline"
                    checked={this.state.account.isRestaurant}
                    name="isRestaurant"
                    onChange={this.handleCheckboxChange}
                  />
                </span>
                <button type="submit" className="btn btn-danger my-2">
                  Submit
                </button>
              </form>
            </div>
            <img src={welcomeback} alt="happy" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
