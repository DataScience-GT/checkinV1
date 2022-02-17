import "./main.css";
import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { Link } from "react-router-dom";

const EventListItem = (props) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className="event-list-item" style={{ borderColor: theme }}>
      <label>Name</label>
      <span className="name">{props.name}</span>
      <label>Description</label>
      <span className="desc">
        {props.description ? props.description : "N/A"}
      </span>
      <span
        className="status"
        style={{ backgroundColor: props.status ? "green" : "red" }}
      >
        {props.status ? "Enabled" : "Disabled"}
      </span>
      <Link className="details" style={{ backgroundColor: theme }} to={`/event/${props.identifier}`}>
        Details
      </Link>
    </div>
  );
};

export default EventListItem;
