import "./main.css";
import { Component } from "react";

import EventListItem from "../EventListItem";

class EventDetails extends Component {
  constructor() {
    super();
    this.state = { loading: true, events: [] };
  }
  
  async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    //load all events
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_DEFAULT_API_KEY}/event/list`
    );
    const json = await res.json();
    this.setState({ loading: false, events: json.data });
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
      <div className="list">
        {Object.keys(this.state.events).map((key) => (
          <EventListItem
            key={key}
            name={this.state.events[key].name}
            description={this.state.events[key].description}
            identifier={this.state.events[key].identifier}
          />
        ))}
      </div>
    );
  }
}

export default EventDetails;
