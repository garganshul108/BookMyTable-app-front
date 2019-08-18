import React, { Component } from "react";
import { toast } from "react-toastify";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    toast.success("Logout Successfull");
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  }

  render() {
    return null;
  }
}

export default Logout;
