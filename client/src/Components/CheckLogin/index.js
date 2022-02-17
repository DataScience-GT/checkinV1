import "./main.css";
import React, { Component } from "react";
import { Redirect } from "react-router";

class CheckLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
    };

    //this.handleScan = this.handleScan.bind(this);
    //this.setCamera = this.setCamera.bind(this);
  }
  async componentDidMount() {
    let allowedTypes = this.props.allowedTypes;
    //process.env.REACT_APP_CHECKIN_API_KEY
    //get session token
    let token = localStorage.getItem("sessionToken");
    //console.log(token);
    if (!token) {
      this.setState({ loading: false, redirect: true });
      return;
    }
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_MOD_API_KEY}/account/session?token=${token}`
    );
    const json = await res.json();
    if (json.error) {
      this.setState({ loading: false, redirect: true });
      return;
    }
    //console.log(json)
    if (!allowedTypes.includes(json.data.type)) {
      this.setState({ loading: false, redirect: true });
      return;
    }
  }

  render() {
    if (this.state.loading) {
      return <div></div>;
    }
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    } else {
      return <div></div>;
    }
  }
}

export default CheckLogin;
