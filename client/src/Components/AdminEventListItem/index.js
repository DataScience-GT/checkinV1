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
    console.log(1)
  }

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
                <form id="edit-event-form">
                  <label form="name">Name*</label>
                  <input type="text" name="name" value={props.name} />

                  <label form="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={props.description}
                  />

                  <label form="status">Status</label>
                  {props.status ? (
                    <select name="status">
                      <option value="1" selected="selected">Enabled</option>
                      <option value="0">Disabled</option>
                    </select>
                  ) : (
                    <select name="status">
                      <option value="1">Enabled</option>
                      <option value="0" selected="selected">Disabled</option>
                    </select>
                  )}
                  <button onClick={}>submit</button>
                </form>
              </div>
            </Modal>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default AdminEventListItem;
