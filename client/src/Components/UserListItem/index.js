import "./main.css";
import { Component } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal";

class UserListItem extends Component {
  constructor() {
    super();
    this.state = { loading: false, showModal: false };
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  /*editEvent = () => {
    //console.log(this.props);
    let form = document.getElementById("edit-event-form");
    let formName = form.querySelector(".edit-event-name").value;
    let formDescription = form.querySelector(".edit-event-description").value;
    let formStatus = form.querySelector(".edit-event-status").value;
    let errorText = form.querySelector(".error");

    let updates = [];
    //check all forms for changes
    if (formName) {
      updates.push(`name=${formName}`);
    }
    if (formDescription) {
      updates.push(`description=${formDescription}`);
    }
    if (this.props.status != formStatus) {
      updates.push(`status=${formStatus}`);
    }

    if (!updates.length) {
      //show error text
      errorText.innerHTML = "No changes found";
      return;
    } else {
      //make api request with event updates

      fetch(
        `https://dry-ridge-34066.herokuapp.com/api/${
          process.env.REACT_APP_ADMIN_API_KEY
        }/event/update?identifier=${this.props.identifier}&${updates.join(
          "&"
        )}`,
        { method: "POST" }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message && data.message == "success") {
            //data has been updated
            window.location.reload();
          }
        });
    }
  };*/
  createUser = () => {
    //console.log(this.props);
    let form = document.getElementById("create-user-form");
    //let formIdentifier = form.querySelector(".edit-event-identifier").value;
    let formName = form.querySelector(".create-user-name").value;
    let formEmail = form.querySelector(".create-user-email").value;
    //let formStatus = form.querySelector(".edit-event-status").value;
    let errorText = form.querySelector(".error");

    let params = [];
    //check all forms for changes
    if (formName) {
      params.push(`userName=${formName}`);
    }
    if (formEmail) {
      params.push(`userEmail=${formEmail}`);
    }

    if (!params.length) {
      //show error text
      errorText.innerHTML = "No fields inputed";
      return;
    } else {
      //make api request with event updates

      fetch(
        `https://dry-ridge-34066.herokuapp.com/api/${
          process.env.REACT_APP_ADMIN_API_KEY
        }/user/create?${params.join("&")}`,
        { method: "POST" }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message && data.message == "success") {
            //data has been updated
            window.location.reload();
          } else if (data.error) {
            errorText.innerHTML = data.error;
          }
        });
    }
  };

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    const { showModal } = this.state;
    const props = this.props;

    if (props.barcodeNum) {
      return (
        <tr className="user-list-item">
          <td className="edit">
            <button onClick={this.toggleModal}>edit</button>
          </td>
          <td className="barcodeNum">{props.barcodeNum}</td>
          <td className="name">{props.name}</td>
          <td className="email">{props.email}</td>
          <td>
            {showModal ? (
              <Modal>
                <div className="edit-event-modal">
                  <div id="edit-event-form">
                    <label>Name*</label>
                    <input
                      type="text"
                      className="edit-event-name"
                      placeholder={props.name}
                    />

                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      className="edit-event-description"
                      placeholder={props.description}
                    />

                    <label>Status</label>
                    <select
                      className="edit-event-status"
                      defaultValue={props.status ? 1 : 0}
                    >
                      <option value="1">Enabled</option>
                      <option value="0">Disabled</option>
                    </select>
                    <p className="error"></p>
                    <button
                      className="edit-event-cancel"
                      onClick={this.toggleModal}
                    >
                      cancel
                    </button>
                    <button
                      className="edit-event-submit"
                      onClick={this.editEvent}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="user-list-item">
          <td className="create">
            <button onClick={this.toggleModal}>create</button>
          </td>
          <td className="barcodeNum">---</td>
          <td className="name">---</td>
          <td className="email">---</td>
          <td>
            {showModal ? (
              <Modal>
                <div className="edit-event-modal">
                  <div id="create-user-form">
                    <label>Name*</label>
                    <input type="text" className="create-user-name" />

                    <label>Email*</label>
                    <input
                      type="text"
                      className="create-user-email"
                    />

                    <p className="error"></p>
                    <button
                      className="edit-event-cancel"
                      onClick={this.toggleModal}
                    >
                      cancel
                    </button>
                    <button
                      className="edit-event-submit"
                      onClick={this.createUser}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </td>
        </tr>
      );
    }
  }
}

export default UserListItem;
