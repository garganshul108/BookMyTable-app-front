import React, { Component } from "react";
import FormInput from "./formInput";
//onSubmit = this.handleAdditionFormSubmit
//onChange = this.handleAdditionFormInputChange

// datakey="establishment"
// formname="establishmentForm"

// label="ESTABLISHMENT TYPE"
// name="establishmenForm"

// value={this.state.establishmentForm.establishment}
// placeholder="Bar / Pub / Family Restaurant"
// displayItems = this.state.data.establishment

class RAdditionFormII extends Component {
  state = {};
  render() {
    const {
      onSubmit,
      datakey,
      formname,
      children,
      displayItems,
      onDelete
    } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <form onSubmit={onSubmit} data-datakey={datakey} name={formname}>
              <div className="row">
                <div className="col-8">{children}</div>
                <div className="col">
                  <FormInput label="&nbsp;" value="ADD" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="addItemDisplay">
              {displayItems.map(item => {
                return (
                  <span className="badge badge-info">
                    <button
                      className="btn btn-sm btn-info"
                      type="button"
                      onClick={onDelete}
                      value={item}
                      data-datakey={datakey}
                    >
                      {item}&nbsp;
                      <i className="fa fa-times" aria-hidden="true" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RAdditionFormII;
