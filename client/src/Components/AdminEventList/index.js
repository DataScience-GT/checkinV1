import "./main.css";
import { Component } from "react";

import AdminEventListItem from "../AdminEventListItem";

class AdminEventList extends Component {
  constructor() {
    super();
    this.state = { loading: true, events: [], status: [] };
  }
  async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_ADMIN_API_KEY}/event/list`
    );
    const json = await res.json();
    if (json.error) {
      console.error(json.error);
    }
    this.setState({ events: json.data });

    // get event/status of each event
    var statusData = [];
    for (let i = 0; i < this.state.events.length; i++) {
      const element = this.state.events[i];
      const res2 = await fetch(
        `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_ADMIN_API_KEY}/event/status?eventIdentifier=${element.identifier}`
      );
      const json2 = await res2.json();
      if (json2.error) {
        console.error(json2.error);
      }
      statusData.push(json2.data);
    }
    //console.log(statusData)
    this.setState({ loading: false, status: statusData });
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
            <th>Tools</th>
            <th>Identifier</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Attended</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        <AdminEventListItem />
          {Object.keys(this.state.events).map((key) => (
            <AdminEventListItem
              key={key}
              name={this.state.events[key].name}
              description={this.state.events[key].description}
              identifier={this.state.events[key].identifier}
              status={this.state.events[key].status}
              attended={this.state.status[key].attended}
              total={this.state.status[key].total}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default AdminEventList;
