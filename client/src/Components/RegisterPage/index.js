import "./main.css";
import { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

//import components
import PageHeader from "../PageHeader";
import Wrapper from "../Wrapper";
//import FitContainer from "../FitContainer";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = { loading: true, loginLocation: "", token: "", type: "" };

    this.submitRegister = this.submitRegister.bind(this);
  }
  async componentDidMount() {
    //console.log(this.props.match.params.token)
    let token = this.props.match.params.token;
    let type = "";

    if (process.env.REACT_APP_MOD_TOKEN == token) {
      type = "mod";
    } else if (process.env.REACT_APP_ADMIN_TOKEN == token) {
      type = "admin";
    }
    if (type) {
      this.setState({ loading: false, token: token, type: type });
    } else {
      this.setState({ loading: false, loginLocation: "/login" });
      //this.setState({ loginLocation: "/login" });
    }
    //process.env.REACT_APP_CHECKIN_API_KEY
    /*const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_CHECKIN_API_KEY}/event/list`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.data));*/
  }
  //get a list of elements
  //use effect/usestate

  async submitRegister() {
    //attempt to login
    let login = document.getElementById("login");
    let username = login.querySelector(".login-username").value;
    let password = login.querySelector(".login-password").value;
    let errorText = login.querySelector(".error");

    if (!username || !password) {
      errorText.innerHTML = "Missing required field";
      return;
    }

    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_MOD_API_KEY}/account/create?type=${this.state.type}&username=${username}&password=${password}`,
      { method: "POST" }
    );
    const json = await res.json();
    if (json.error) {
      errorText.innerHTML = json.error;
    } else {
      const res2 = await fetch(
        `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_DEFAULT_API_KEY}/account/login?username=${username}&password=${password}`
      );
      const json2 = await res2.json();
      if (json2.error) {
        errorText.innerHTML = json2.error;
      } else {
        //set localStorage, navigate to checkin/admin page
        localStorage.setItem("sessionToken", json2.token);
        if (json2.type == "master" || json2.type == "admin") {
          //navigate to admin
          //console.log("admin");
          this.setState({ loginLocation: "/admin" });
        } else if (json2.type == "mod") {
          //navigate to checkin
          //console.log("checkin");
          this.setState({ loginLocation: "/checkin" });
        } else if (json2.type == "default") {
          //idk
          //console.log("default");
          this.setState({ loginLocation: "/" });
        }
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <h2>loading events...</h2>;
    }
    //const token = this.state.token;
    if (!this.state.loginLocation) {
      return (
        <Wrapper>
          <PageHeader title="Register" />
          <div id="login">
            <label>Username*</label>
            <input className="login-username" type="text" />
            <label>Password*</label>
            <input className="login-password" type="password" />
            <p>
              Account Type:{" "}
              {this.state.type == "mod" ? "Moderator" : "Administrator"}
            </p>
            <p className="error"></p>
            <button className="login-submit" onClick={this.submitRegister}>
              Submit
            </button>
          </div>
        </Wrapper>
      );
    } else {
      return <Redirect to={this.state.loginLocation} />;
    }
  }
}

export default withRouter(RegisterPage);
