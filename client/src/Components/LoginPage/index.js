import "./main.css";
import { Component } from "react";

//import components
import PageHeader from "../PageHeader";
import Wrapper from "../Wrapper";
//import FitContainer from "../FitContainer";

class LoginPage extends Component {
  /*constructor() {
    super();
    this.state = { loading: true };
  }*/
  /*async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_CHECKIN_API_KEY}/event/list`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.data));
  }*/
  //get a list of elements
  //use effect/usestate

  async submitLogin() {
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
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_DEFAULT_API_KEY}/account/login?username=${username}&password=${password}`
    );
    const json = await res.json();
    if (json.error) {
      errorText.innerHTML = json.error;
    } else {
      console.log(json);
    }
  }

  render() {
    {
      /*if (this.state.loading) {
      return <h2>loading events...</h2>;
    }*/
    }

    return (
      <Wrapper>
        <PageHeader title="Login" />
        <div id="login">
          <label>Username*</label>
          <input className="login-username" type="text" />
          <label>Password*</label>
          <input className="login-password" type="password" />
          <p className="error"></p>
          <button className="login-submit" onClick={this.submitLogin}>
            Submit
          </button>
        </div>
      </Wrapper>
    );
  }
}

export default LoginPage;
