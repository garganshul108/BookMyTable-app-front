import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { value, onChange, idForLabel, ...rest } = this.props;
    return (
      <div className="form-group">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label
              htmlFor={idForLabel}
              className="input-group-text bg-info text-light"
              style={{ border: "1px solid #f0f0f0" }}
            >
              <i className="fa fa-search" aria-hidden="true" />
            </label>
          </div>

          <input
            id={idForLabel}
            value={value}
            className="form-control"
            onChange={e => onChange(e.currentTarget.value)}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default SearchBox;
