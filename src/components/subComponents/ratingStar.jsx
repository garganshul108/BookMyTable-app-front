import React, { Component } from "react";
class RatingStar extends Component {
  render() {
    let {
      rate,
      currentRate,
      trueClass,
      falseClass,
      onClick,
      baseClass,
      ...rest
    } = this.props;
    return (
      <i
        className={
          baseClass + " " + (currentRate >= rate ? trueClass : falseClass)
        }
        data-value={rate}
        aria-hidden="true"
        onClick={onClick}
        {...rest}
      />
    );
  }
}

export default RatingStar;
