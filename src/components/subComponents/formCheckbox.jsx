import React, { Component } from "react";

class FormCheckbox extends Component {
  render() {
    const { label, xClass, name, checked, onChange, ...rest } = this.props;
    return (
      <label className={xClass}>
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          {...rest}
          checked={checked}
        />
        {label}
      </label>
    );
  }
}

export default FormCheckbox;
