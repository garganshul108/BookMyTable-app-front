import React, { Component } from "react";
import { toast } from "react-toastify";

class FormInput extends Component {
  render() {
    let {
      name,
      value,
      placeholder,
      onChange,
      error,
      type,
      label,
      ...rest
    } = this.props;
    type = type || "text";
    return (
      <div className="form-group">
        {label && <small className="text-muted">{label}</small>}
        <input
          value={value}
          onChange={onChange}
          name={name}
          className="form-control"
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {error && (
          <div className="alert alert-danger">
            <small>
              <strong>OOPS!&nbsp;</strong>
              {error}
            </small>
          </div>
        )}
      </div>
    );
  }
}

export default FormInput;
