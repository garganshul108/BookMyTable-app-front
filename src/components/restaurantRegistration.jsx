import React, { Component } from "react";
import FormInput from "./subComponents/formInput";
import FormCheckbox from "./subComponents/formCheckbox";
import RegistrationSubForm from "./subComponents/registrationSubForm";
import SearchableList from "./subComponents/searchableList";
import RAdditionFormII from "./subComponents/rAdditionFormII";
import { getCities } from "../services/cityServices";
import { getNamesOfAllCuisines } from "../services/cuisineServices";
import { getNamesOfAllFeatures } from "../services/featureServices";
import { getNamesOfAllEstablishments } from "../services/establishmentServices";
import Joi from "joi-browser";
import { time24To12 } from "../util/util";
import { getRestaurantById } from "../services/restaurantServices";

import "../components/css/restaurantRegistration.css";
import { postNewRestaurant } from "../services/restaurantServices";
import { toast } from "react-toastify";
import HintBox from "./subComponents/hintBox";

class RestaurantRegistration extends Component {
  state = {
    data: {
      no_of_slots: "1",
      slots: [{ id: "1", start: "12:00", end: "14:00" }],
      average_cost_for_two: "100",
      cuisines: ["South Indian"],
      establishment: ["Cafe"],
      features: ["AC"],
      location: {
        address: {
          line_1: "Line 1",
          line_2: "Line 2"
        },
        locality: "Locality",
        city: "Gurgaon",
        locality_verbose: "Locaity verbose",
        zipcode: "123456"
      },
      name: "Nmae 3",
      phone: {
        std: "123",
        number: "12345678"
      },
      capacity: "10000",

      thumb: "",
      timings: "qwer",
      opening_status: "1",
      email: "anshulr3@gmail.com",
      website: "myweb.com",
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: true,
        Friday: false,
        Saturday: false,
        Sunday: false
      },
      password: "",
      confirmPassword: ""
    },
    errors: {},
    establishmentForm: "",
    cuisineForm: "",
    featureForm: "",
    noOfSlots: "",
    slotForm: {
      id: "",
      start: "",
      end: ""
    },
    cities_data: [],
    cuisines_data: [],
    features_data: [],
    establishment_data: [],

    breadcrumbs: ["Home", "All Restaurants", "Add your Restaurant"]
  };

  addressSchema = {
    line_1: Joi.string()
      .min(1)
      .required()
      .label("Line 1"),
    line_2: Joi.string()
      .min(1)
      .required()
      .label("Line 2")
  };

  locationSchema = {
    address: Joi.any(),
    locality: Joi.string()
      .required()
      .label("Locality"),
    city: Joi.string()
      .required()
      .label("City"),
    locality_verbose: Joi.string()
      .required()
      .label("Locality in Detail"),
    zipcode: Joi.string()
      .max(6)
      .min(6)
      .required()
      .label("ZIP Code")
  };

  phoneSchema = {
    std: Joi.string()
      .max(4)
      .min(3)
      .required()
      .label("STD Code"),
    number: Joi.string()
      .max(10)
      .min(10)
      .required()
      .label("Phone number")
  };

  mainSchema = {
    no_of_slots: Joi.number()
      .required()
      .min(1)
      .label("No of Slots"),
    slots: Joi.any().label("Slots"),
    average_cost_for_two: Joi.number()
      .min(0)
      .label("Average Cost"),
    cuisines: Joi.any().label("Cuisines"),
    establishment: Joi.any().label("Cuisines"),
    features: Joi.any().label("Cuisines"),
    location: Joi.any(),
    name: Joi.string()
      .required()
      .min(2)
      .label("Restaurant's Name"),
    phone: Joi.any(),
    capacity: Joi.number()
      .min(0)
      .max(21)
      .required()
      .label("Capacity"),
    thumb: Joi.any().label("Thumbnail"),
    timings: Joi.any(),
    opening_status: Joi.any(),
    email: Joi.string()
      .email()
      .required()
      .label("Restaurants"),
    website: Joi.any(),
    days: Joi.any(),
    password: Joi.string()
      .min(3)
      .required()
      .label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
  };

  async componentDidMount() {
    console.log("restid", this.props.match.params.id);
    // if (this.props.match.params.id) {
    //   let { data } = this.state;
    //   let restaurant = await getRestaurantById(this.props.match.params.id);
    //   restaurant = restaurant[0];
    //   console.log("supplied", restaurant);
    //   restaurant.phone_numbers = restaurant.phone_numbers.split(",")[0];
    //   restaurant.phone = {
    //     std: restaurant.phone_numbers,
    //     number: restaurant.phone_numbers
    //   };
    //   delete restaurant.phone_numbers;

    //   data = restaurant;
    //   this.setState({ data });
    // }
    let cities_data = await getCities();
    let cuisines_data = await getNamesOfAllCuisines();
    let features_data = await getNamesOfAllFeatures();
    let establishment_data = await getNamesOfAllEstablishments();
    this.setState(
      { cities_data, establishment_data, cuisines_data, features_data },
      () => {
        console.log("registratin form initial state: \n", this.state);
      }
    );
  }

  handleCityInputChange = ({ currentTarget: input }) => {
    // console.log("city", input);
    let { data } = this.state;
    data.location.city = input.value;
    this.setState({ data });
  };

  handleDeleteSlot = ({ currentTarget: btn }) => {
    // console.log("delete slot clicked");
    // console.log(btn.id);
    let { data } = this.state;
    for (let i = 0; i < data.slots.length; i++) {
      if (data.slots[i].id == btn.id) {
        data.slots.splice(i, 1);
        // console.log("splice happend");
        break;
      }
    }
    // console.log(data.slots);
    this.setState({ data });
  };

  handleSlotFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    let newId = parseInt(this.state.data.no_of_slots) + 1;
    let newSlot = { ...this.state.slotForm };
    if (newSlot.end === "" || newSlot.start === "") return;
    newSlot.id = newId.toString();
    let { data, slotForm } = this.state;
    data.slots.push(newSlot);
    data.no_of_slots = newId;
    this.setState({ data });
    slotForm.id = "";
    slotForm.start = "";
    slotForm.end = "";
    this.setState({ slotForm });
  };

  handleSlotFormInputChange = ({ currentTarget: input }) => {
    // console.log("InputChange slot", input.name, input.value);
    let { slotForm } = this.state;
    slotForm[input.name] = input.value;
    this.setState({ slotForm });
    // console.log(this.state);
  };

  // THIS IS COMMING FROM THE ADDN FORM DELETE BUTTON
  handleDeleteOption = ({ currentTarget: btn }) => {
    let { data } = this.state;
    for (let i = 0; i < data[btn.dataset.datakey].length; i++) {
      if (data[btn.dataset.datakey][i] === btn.value) {
        data[btn.dataset.datakey].splice(i, 1);
        break;
      }
    }
    this.setState({ data });
  };

  // THIS IS COMMING FROM THE FORM ON SUBMIT ATTR
  handleAdditionFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const { datakey } = target.dataset;
    let data = this.state.data;
    let newValue = this.state[target.name];
    if (!newValue) return;
    data[datakey].push(newValue);
    this.setState({ data });
    this.setState({ [target.name]: "" });
  };

  // THIS IS COMING FROM INPUT ON CHANGE ATTR
  handleAdditionFormInputChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
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

  handleCheckboxChange = ({ currentTarget: checkbox }) => {
    // console.log(
    //   "name " + checkbox.name,
    //   "\nch " + checkbox.checked,
    //   "\npa " + checkbox.dataset.parent,
    //   "\nga " + checkbox.dataset.gparent
    // );
    let data = { ...this.state.data };
    if (checkbox.dataset.gparent) {
      data[checkbox.dataset.gparent][checkbox.dataset.parent][checkbox.name] =
        checkbox.checked;
    } else if (checkbox.dataset.parent) {
      data[checkbox.dataset.parent][checkbox.name] = checkbox.checked;
    } else {
      data[checkbox.name] = checkbox.checked;
    }
    this.setState({ data }, () => console.log(this.state));
  };

  handleRadioTypeChange = ({ currentTarget: checkbox }) => {
    // console.log(
    //   "name " + checkbox.name,
    //   "\nch " + checkbox.checked,
    //   "\nval " + checkbox.dataset.value,
    //   "\npa " + checkbox.dataset.parent,
    //   "\nga " + checkbox.dataset.gparent
    // );
    let data = { ...this.state.data };
    if (checkbox.dataset.gparent) {
      data[checkbox.dataset.gparent][checkbox.dataset.parent][checkbox.name] =
        checkbox.dataset.value;
    } else if (checkbox.dataset.parent) {
      data[checkbox.dataset.parent][checkbox.name] = checkbox.dataset.value;
    } else {
      data[checkbox.name] = checkbox.dataset.value;
      // console.log(data);
    }
    this.setState({ data });
  };

  //SUBMISSOIN DATA ATTRS
  changingNames = data => {
    let nameList = [];
    nameList["features"] = "highlights";

    for (let slot of data.slots) {
      slot["start_time"] = slot.start;
      slot["end_time"] = slot.end;
      delete slot.start;
      delete slot.end;
      delete slot.id;
    }
    for (let key in nameList) {
      console.log(key);
      if (data[key]) {
        data[nameList[key]] = data[key];
        delete data[key];
      }
    }
  };

  deletingFields = data => {
    let deleteKeys = ["no_of_slots", "confirmPassword"];
    for (let key of deleteKeys) {
      delete data[key];
    }
  };

  validate = () => {
    let errors = {};

    let validationResult = Joi.validate(this.state.data, this.mainSchema, {
      abortEarly: false
    });
    if (!validationResult.error) return null;

    for (let error of validationResult.error.details) {
      errors[error.path[0]] = error.message;
    }

    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();

    // let errors = this.validate();
    // console.log(errors);
    // this.setState({ errors: errors || {} });

    let submissionData = { ...this.state.data };
    this.changingNames(submissionData);
    this.deletingFields(submissionData);
    console.log("state at registration submisson: \n", submissionData);
    try {
      await postNewRestaurant(submissionData);
      toast.success("Restaurant submitted for review");
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const cityValue = item => {
      return item.name;
    };
    const renderBasicInfoForm = () => {
      return (
        <RegistrationSubForm title="Basic Information" xClass=" ">
          <FormInput
            label="NAME"
            value={this.state.data.name}
            onChange={this.handleInputChange}
            name="name"
            placeholder="Enter Restaurant's Name"
          />

          <div className="row">
            <div className="col-5">
              <SearchableList
                label="CITY"
                placeholder="City"
                listName="cities"
                value={this.state.data.location.city}
                onChange={this.handleCityInputChange}
              >
                {this.state.cities_data.map(item => (
                  <option value={cityValue(item)} label={item.state} />
                ))}
              </SearchableList>
            </div>
            <div className="col" />
          </div>
          <HintBox>STATUS</HintBox>
          <div className="row">
            <div className="col">
              <FormCheckbox
                label="&nbsp;Opening Soon"
                checked={this.state.data.opening_status === "0"}
                data-value={0}
                name="opening_status"
                xClass="form-control"
                onChange={this.handleRadioTypeChange}
              />
            </div>
            <div className="col">
              <FormCheckbox
                label="&nbsp;Already Existing"
                checked={this.state.data.opening_status === "1"}
                data-value={1}
                name="opening_status"
                xClass="form-control"
                onChange={this.handleRadioTypeChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <FormInput
                    label="STD"
                    value={this.state.data.phone.std}
                    onChange={this.handleInputChange}
                    name="std"
                    data-parent="phone"
                    type="number"
                    placeholder="Area Code..."
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="PHONE"
                    value={this.state.data.phone.number}
                    onChange={this.handleInputChange}
                    name="number"
                    data-parent="phone"
                    placeholder="Phone"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <FormInput
                label="FULL HOUSE CAPACITY"
                value={this.state.data.capacity}
                onChange={this.handleInputChange}
                name="capacity"
                type="number"
                min="0"
              />
            </div>
          </div>
        </RegistrationSubForm>
      );
    };

    const renderLocationForm = () => {
      return (
        <RegistrationSubForm title="Location" xClass=" ">
          <FormInput
            label="ADDRESS LINE 1"
            value={this.state.data.location.address.line_1}
            onChange={this.handleInputChange}
            name="line_1"
            data-parent="address"
            data-gparent="location"
          />
          <FormInput
            label="ADDRESS LINE 2"
            value={this.state.data.location.address.line_2}
            onChange={this.handleInputChange}
            name="line_2"
            data-parent="address"
            data-gparent="location"
          />

          <div className="row">
            <div className="col-4">
              <FormInput
                label="LOCALITY"
                value={this.state.data.location.locality}
                onChange={this.handleInputChange}
                name="locality"
                data-parent="location"
              />
            </div>
            <div className="col">
              <FormInput
                label="LOCALITY IN DETAIL"
                value={this.state.data.location.locality_verbose}
                onChange={this.handleInputChange}
                name="locality_verbose"
                data-parent="location"
              />
            </div>
            <div className="col-2">
              <FormInput
                label="ZIPCODE"
                value={this.state.data.location.zipcode}
                onChange={this.handleInputChange}
                name="zipcode"
                data-parent="location"
                type="number"
                min="0"
              />
            </div>
          </div>

          <RAdditionFormII
            datakey="establishment"
            formname="establishmentForm"
            displayItems={this.state.data.establishment}
            onSubmit={this.handleAdditionFormSubmit}
            onDelete={this.handleDeleteOption}
          >
            <SearchableList
              placeholder="Bar / Pub / Family Restaurant"
              label="ESTABLISHMENT TYPE"
              name="establishmentForm"
              listName="establishment-list"
              value={this.state.establishmentForm}
              onChange={this.handleAdditionFormInputChange}
            >
              {this.state.establishment_data.map(item => (
                <option value={item} />
              ))}
            </SearchableList>
          </RAdditionFormII>
        </RegistrationSubForm>
      );
    };

    const renderCharacteristicForm = () => {
      return (
        <RegistrationSubForm title="Characteristics" xClass=" ">
          <div className="row">
            <div className="col-4">
              <FormInput
                label="COST FOR TWO"
                value={this.state.data.average_cost_for_two}
                onChange={this.handleInputChange}
                name="average_cost_for_two"
                type="number"
              />
            </div>
            <div className="col" />
          </div>

          <RAdditionFormII
            datakey="cuisines"
            formname="cuisineForm"
            displayItems={this.state.data.cuisines}
            onSubmit={this.handleAdditionFormSubmit}
            onDelete={this.handleDeleteOption}
          >
            <SearchableList
              placeholder="Type and Select"
              label="Cuisines"
              name="cuisineForm"
              listName="cuisine-list"
              value={this.state.cuisineForm}
              onChange={this.handleAdditionFormInputChange}
            >
              {this.state.cuisines_data.map(item => (
                <option value={item} />
              ))}
            </SearchableList>
          </RAdditionFormII>

          <RAdditionFormII
            datakey="features"
            formname="featureForm"
            displayItems={this.state.data.features}
            onSubmit={this.handleAdditionFormSubmit}
            onDelete={this.handleDeleteOption}
          >
            <SearchableList
              placeholder="Features"
              label="FEATURES"
              name="featureForm"
              listName="features-list"
              value={this.state.featureForm}
              onChange={this.handleAdditionFormInputChange}
            >
              {this.state.features_data.map(item => (
                <option value={item} />
              ))}
            </SearchableList>
          </RAdditionFormII>
        </RegistrationSubForm>
      );
    };

    const renderSlotForm = () => {
      return (
        <RegistrationSubForm title="Slots Available" xClass="slots">
          <div className="row">
            <div className="col">
              <div className="daysCheckboxDiv">
                <FormCheckbox
                  label="Monday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Monday}
                  name="Monday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Tuesday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Tuesday}
                  name="Tuesday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Wednesday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Wednesday}
                  name="Wednesday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Thursday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Thursday}
                  name="Thursday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Friday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Friday}
                  name="Friday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Saturday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Saturday}
                  name="Saturday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Sunday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Sunday}
                  name="Sunday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <form
                onSubmit={this.handleSlotFormSubmit}
                data-datakey="slots"
                name="slotForm"
              >
                <div className="row">
                  <div className="col-4">
                    <FormInput
                      label="START"
                      name="start"
                      value={this.state.slotForm.start}
                      onChange={this.handleSlotFormInputChange}
                      type="time"
                      step={60 * 30}
                    />
                  </div>
                  <div className="col-4">
                    <FormInput
                      label="END"
                      type="time"
                      step={60 * 30}
                      name="end"
                      value={this.state.slotForm.end}
                      onChange={this.handleSlotFormInputChange}
                    />
                  </div>
                  <div className="col">
                    <FormInput label="&nbsp;" value="ADD" type="submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="slotsDisplay">
                {this.state.data.slots.length > 0 &&
                  this.state.data.slots.map(slot => {
                    return (
                      <span className="badge badge-danger">
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={this.handleDeleteSlot}
                          id={slot.id}
                        >
                          {time24To12(slot.start)}&nbsp;-&nbsp;
                          {time24To12(slot.end)}&nbsp;
                          <i className="fa fa-times" aria-hidden="true" />
                        </button>
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </RegistrationSubForm>
      );
    };

    const renderContactInfo = () => {
      return (
        <RegistrationSubForm
          title="Contact Info / SignUp Credentials"
          xClass="contactInfo"
        >
          <HintBox>IMPORTANT! Login Credentials</HintBox>

          <div className="row">
            <div className="col-6">
              <FormInput
                label="RESTAURANT EMAIL"
                value={this.state.data.email}
                onChange={this.handleInputChange}
                name="email"
                type="email"
              />
            </div>
            <div className="col-6">
              <FormInput
                label="RESTAURANT WEBSITE"
                value={this.state.data.website}
                onChange={this.handleInputChange}
                name="website"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <FormInput
                label="PASSWORD"
                value={this.state.data.password}
                onChange={this.handleInputChange}
                name="password"
                type="password"
              />
            </div>
            <div className="col-6">
              <FormInput
                label="CONFIRM PASSWORD"
                value={this.state.data.confirmPassword}
                onChange={this.handleInputChange}
                name="confirmPassword"
                type="password"
              />
            </div>
          </div>
        </RegistrationSubForm>
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
            <div className="restaurantRegistrationDiv">
              <small className="form-text text-muted">
                Welcome to BookMyTable.com
              </small>
              <h4>Add your Restaurant</h4>
              <form onSubmit={this.handleSubmit}>
                {renderBasicInfoForm()}
                {renderLocationForm()}
                {renderCharacteristicForm()}
                {renderSlotForm()}
                {renderContactInfo()}
                <button
                  type="submit"
                  style={{ width: "100%", marginTop: "20px" }}
                  className="btn btn-success"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-4">
            <small className="form-text text-muted">Happy to have you!</small>
            <h4>HELP!</h4>
            <div className="registrationInstructions">
              <strong> How it works</strong>
              <br />
              <ul>
                <li>
                  If you are the owner of a restaurant, or a representative, let
                  us know using this form.
                </li>
                <li>
                  Once you send the information to us, our awesome content team
                  will verify it. To help speed up the process, please provide a
                  contact number or email address.
                </li>
                <li>
                  That's it! Once verified the listing will start appearing
                  on&nbsp;<strong>BookMyTable.com</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantRegistration;
