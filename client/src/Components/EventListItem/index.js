import "./main.css";
import { useContext } from "react";
import ThemeContext from "../ThemeContext";

const EventListItem = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className="event-list-item" style={{borderColor: theme}}>
      <span className="name" style={{ backgroundColor: theme }}>
        {props.name}
      </span>
      <span className="desc">{props.description}</span>
    </div>
  );
};

export default EventListItem;
