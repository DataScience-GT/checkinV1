import "./main.css";
import { Component } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal";

class AdminEventListItem extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showModal: false,
      showRemoveModal: false,
      showRemoveAllModal: false,
    };
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  toggleRemoveModal = () =>
    this.setState({ showRemoveModal: !this.state.showRemoveModal });
  toggleRemoveAllModal = () =>
    this.setState({ showRemoveAllModal: !this.state.showRemoveAllModal });
  editEvent = () => {
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
  };
  createEvent = () => {
    //console.log(this.props);
    let form = document.getElementById("edit-event-form");
    let formIdentifier = form.querySelector(".edit-event-identifier").value;
    let formName = form.querySelector(".edit-event-name").value;
    let formDescription = form.querySelector(".edit-event-description").value;
    let formStatus = form.querySelector(".edit-event-status").value;
    let errorText = form.querySelector(".error");

    let params = [];
    //check all forms for changes
    if (formIdentifier) {
      params.push(`identifier=${formIdentifier}`);
    }
    if (formName) {
      params.push(`name=${formName}`);
    }
    if (formDescription) {
      params.push(`description=${formDescription}`);
    }
    if (this.props.status != formStatus) {
      params.push(`status=${formStatus}`);
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
        }/event/create?${params.join("&")}`,
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

  removeEvent = () => {
    //make api request to remove event

    fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_ADMIN_API_KEY}/event/remove?identifier=${this.props.identifier}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.message == "success") {
          //data has been updated
          window.location.reload();
        } else if (data.error) {
          console.error(data.error);
        }
      });
  };

  removeAllEvents = () => {
    //make api request to remove user
    if (!this.props.identifiers) {
      console.error("missing events identifiers");
      return;
    }
    for (let i = 0; i < this.props.identifiers.length; i++) {
      const ident = this.props.identifiers[i];
      fetch(
        `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_ADMIN_API_KEY}/event/remove?identifier=${ident}`,
        { method: "POST" }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message && data.message == "success") {
            //data has been updated
            //window.location.reload();
            console.log(`removed event ${ident}`);
          } else if (data.error) {
            console.error(data.error);
          }
        });
    }
    window.location.reload();
  };

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    const { showModal, showRemoveModal, showRemoveAllModal } = this.state;
    const props = this.props;
    //console.log(props);
    if (props.identifier) {
      return (
        <tr className="admin-event-list-item">
          <td className="edit">
            <button onClick={this.toggleModal}>edit</button>
            <button onClick={this.toggleRemoveModal}>remove</button>
          </td>
          <td className="identifier">{props.identifier}</td>
          <td className="name">{props.name}</td>
          <td className="desc">
            {props.description ? props.description : "N/A"}
          </td>
          <td
            className="status"
            style={{ color: props.status ? "green" : "red" }}
          >
            {props.status ? "enabled" : "disabled"}
          </td>
          <td className="attended">
            {props.attended}/{props.total}
          </td>
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
            {showRemoveModal ? (
              <Modal>
                <div className="remove-event-form">
                  <div id="remove-event-form">
                    <p>
                      Are you sure you would like to remove event '{props.name}
                      '?
                    </p>
                    <button
                      className="remove-event-cancel"
                      onClick={this.toggleRemoveModal}
                    >
                      cancel
                    </button>
                    <button
                      className="remove-event-submit"
                      onClick={this.removeEvent}
                    >
                      continue
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
        <tr className="admin-event-list-item">
          <td className="new-event">
            <button onClick={this.toggleModal}>create</button>
            <button onClick={this.toggleRemoveAllModal}>remove all</button>
          </td>
          <td className="identifier">---</td>
          <td className="name">---</td>
          <td className="desc">---</td>
          <td className="status">---</td>
          <td className="attended">---</td>
          <td>
            {showModal ? (
              <Modal>
                <div className="edit-event-modal">
                  <div id="edit-event-form">
                    <label>Identifier*</label>
                    <input type="text" className="edit-event-identifier" />
                    <label>Name*</label>
                    <input type="text" className="edit-event-name" />

                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      className="edit-event-description"
                    />

                    <label>Status</label>
                    <select className="edit-event-status" defaultValue="1">
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
                      onClick={this.createEvent}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
            {showRemoveAllModal ? (
              <Modal>
                <div className="remove-event-form">
                  <div id="remove-event-form">
                    <p>
                      Are you sure you would like to remove all events?
                    </p>
                    <button
                      className="remove-event-cancel"
                      onClick={this.toggleRemoveAllModal}
                    >
                      cancel
                    </button>
                    <button
                      className="remove-event-submit"
                      onClick={this.removeAllEvents}
                    >
                      continue
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

export default AdminEventListItem;
