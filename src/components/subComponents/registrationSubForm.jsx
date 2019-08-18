import React, { Component } from "react";

class RegistrationSubForm extends Component {
  render() {
    const { title, children, xClass } = this.props;
    return (
      <React.Fragment>
        <div className="subForm">
          <h6 className="title">{title}</h6>
          <div className={"subFormContainer " + xClass}>{children}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationSubForm;

/***
 * <div className="subForm">
          <h6 className="title">Contact Info</h6>
          <div className="subFormContainer contactInfo">
          </div>
        </div>
 */
