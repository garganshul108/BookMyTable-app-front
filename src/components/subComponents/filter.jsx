import React, { Component } from "react";
import { Link } from "react-router-dom";

class Filter extends Component {
  state = { extra: false };
  render() {
    let {
      targetProperty,
      label,
      setLocalFilter,
      sendFilter,
      content
    } = this.props;

    let extraContent = [];

    if (content.length > 8) {
      extraContent = content.slice(8);
      content = content.slice(0, 8);
    }
    // console.log(targetProperty, content);

    const renderItem = item => {
      if (typeof item === "object")
        return (
          <div
            className="filterOption"
            data-name={targetProperty}
            onMouseDown={setLocalFilter}
            onMouseUp={sendFilter}
            data-value={item.name}
          >
            {item.name}
            <span className="right text-muted">{item.count}</span>
          </div>
        );
      return (
        <div
          className="filterOption"
          data-name={targetProperty}
          onMouseDown={setLocalFilter}
          onMouseUp={sendFilter}
          data-value={item}
        >
          {item}
        </div>
      );
    };

    return (
      <div className="filterDiv" name={targetProperty}>
        <div className="heading">{label}</div>
        {content.map(item => renderItem(item))}
        {extraContent.length > 0 && (
          <Link
            className="text-muted smallBtn"
            onClick={e => {
              let { extra } = this.state;
              extra = true;
              this.setState({ extra });
            }}
          >
            See all...
          </Link>
        )}
        {this.state.extra && (
          <div className="filtersBox extraOptions">
            <div className="containter-fluid">
              <div className="row">
                <div className="col-8">
                  {" "}
                  <div className="subHeading">{label}</div>
                </div>
                <div className="col-4">
                  <button
                    className="smallCross btn-danger"
                    onClick={e => {
                      let { extra } = this.state;
                      extra = false;
                      this.setState({ extra });
                    }}
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="options">
              {extraContent.map(item => renderItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Filter;
