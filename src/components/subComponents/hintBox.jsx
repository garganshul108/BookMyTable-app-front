import React from "react";

const HintBox = ({ children }) => {
  return (
    <span
      className="text-muted"
      style={{ fontSize: "0.8rem", display: "block" }}
    >
      {children}
    </span>
  );
};

export default HintBox;
