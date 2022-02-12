import "./main.css";
import { Component } from "react";

import AdminEventListItem from "../AdminEventListItem";

class AdminEventList extends Component {
  constructor() {
    super();
    this.state = { loading: true, events: [], attended: -1, total: -1 };
  }
  async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_DEFAULT_API_KEY}/event/list`
    );
    const json = await res.json();
    this.setState({ events: json.data });

    // get event/status
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="list">
          <h2>loading events...</h2>
        </div>
      );
    }
    return (
      <table className="admin-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.state.events).map((key) => (
            <AdminEventListItem
              key={key}
              name={this.state.events[key].name}
              description={this.state.events[key].description}
              identifier={this.state.events[key].identifier}
              status={this.state.events[key].status}
              attended="3/7"
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default AdminEventList;
