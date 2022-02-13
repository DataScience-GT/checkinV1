import "./main.css";
import { Component } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal";

class AdminEventListItem extends Component {
  constructor() {
    super();
    this.state = { loading: false, showModal: false };
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
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

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    const { showModal } = this.state;
    const props = this.props;
    return (
      <tr className="admin-event-list-item">
        <td className="edit">
          <button onClick={this.toggleModal}>edit</button>
        </td>
        <td className="name">{props.name}</td>
        <td className="desc">
          {props.description ? props.description : "N/A"}
        </td>
        <td className="status">{props.status ? "enabled" : "disabled"}</td>
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
        </td>
      </tr>
    );
  }
}

export default AdminEventListItem;
