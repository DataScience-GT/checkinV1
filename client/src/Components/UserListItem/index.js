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
  editUser = () => {
    //console.log(this.props);
    let form = document.getElementById("edit-user-form");
    //let formIdentifier = form.querySelector(".edit-event-identifier").value;
    let formName = form.querySelector(".edit-user-name").value;
    let formEmail = form.querySelector(".edit-user-email").value;
    //let formStatus = form.querySelector(".edit-event-status").value;
    let errorText = form.querySelector(".error");

    let updates = [];
    //check all forms for changes
    if (formName) {
      updates.push(`userName=${formName}`);
    }
    if (formEmail) {
      updates.push(`userEmail=${formEmail}`);
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
        }/user/update?barcodeNum=${this.props.barcodeNum}&${updates.join("&")}`,
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
                  <div id="edit-user-form">
                    <label>Name</label>
                    <input
                      type="text"
                      className="edit-user-name"
                      placeholder={props.name}
                    />

                    <label>Email</label>
                    <input
                      type="text"
                      className="edit-user-email"
                      placeholder={props.email}
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
                      onClick={this.editUser}
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
                    <input type="text" className="create-user-email" />

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
