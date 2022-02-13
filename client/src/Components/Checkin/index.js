import "./main.css";
import React, { Component } from "react";
import QrReader from "react-qr-reader";

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      loading: true,
      events: [],
      users: [],
      useCam: false,
      checking: false,
      checkDelay: 3000,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
    this.setCamera = this.setCamera.bind(this);
  }
  async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_MOD_API_KEY}/event/list`
    );
    const json = await res.json();
    if (json.error) {
      console.error(json.error);
    }
    //console.log(json.data)
    this.setState({ events: json.data });

    const res2 = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_MOD_API_KEY}/user/list`
    );
    const json2 = await res2.json();
    if (json2.error) {
      console.error(json2.error);
    }
    //console.log(json2.data)
    this.setState({ loading: false, users: json2.data });
  }
  setCamera() {
    this.setState({ useCam: true });
  }
  handleScan(data) {
    if (!this.state.checking)
      if (data && data) {
        this.setState({ checking: true });
        //console.log(data);
        this.setState({
          result: data,
        });
        //checkin user
        let eventIdentifier = document.getElementById("checkin-event").value;
        let userBarcode = +data;
        let errorText = document.querySelector(".error");
        let successText = document.querySelector(".success");

        errorText.innerHTML = "";
        successText.innerHTML = "";

        let params = [];
        //check all forms for changes
        if (eventIdentifier) {
          params.push(`eventIdentifier=${eventIdentifier}`);
        }
        if (userBarcode) {
          params.push(`userBarcode=${userBarcode}`);
        }

        if (!params.length) {
          //show error text
          errorText.innerHTML = "Missing fields";
          return;
        } else {
          //make api request with event updates

          fetch(
            `https://dry-ridge-34066.herokuapp.com/api/${
              process.env.REACT_APP_MOD_API_KEY
            }/event/checkin?${params.join("&")}`,
            { method: "POST" }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.message && data.message == "success") {
                //data has been updated
                errorText.innerHTML = "";
                successText.innerHTML = `User '${
                  this.state.users.filter((x) => x.barcodeNum == userBarcode)[0]
                    .name
                }' has been checked in for '${
                  this.state.events.filter(
                    (x) => x.identifier == eventIdentifier
                  )[0].name
                }'`;
              } else if (data.error) {
                errorText.innerHTML = data.error;
              }
            });
        }
        setTimeout(() => {
          this.setState({ checking: false });
        }, this.state.checkDelay);
      }
  }
  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: 320,
      width: 320,
    };
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    return (
      <div className="checkin">
        <p className="note">
          Note: website must be running on https for camera to work. (change url
          if not working)
        </p>
        <select id="checkin-event">
          {this.state.events.map((event) => (
            <option key={event.identifier} value={event.identifier}>
              {event.name}
            </option>
          ))}
        </select>
        {this.state.useCam ? (
          <div className="qr">
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
            <p className="barcode">User ID: {this.state.result}</p>
            <p className="username">
              User Name:{" "}
              {this.state.users.filter(
                (x) => x.barcodeNum == this.state.result
              )[0]
                ? this.state.users.filter(
                    (x) => x.barcodeNum == this.state.result
                  )[0].name
                : "No Result"}
            </p>
            <p className="error"></p>
            <p className="success"></p>
          </div>
        ) : (
          <button className="use-camera" onClick={this.setCamera}>
            Use Camera
          </button>
        )}
      </div>
    );
  }
}

export default Checkin;
