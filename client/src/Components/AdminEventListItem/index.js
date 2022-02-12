import "./main.css";
import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { Link } from "react-router-dom";

const AdminEventListItem = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <tr className="admin-event-list-item">
      <td className="name">{props.name}</td>
      <td className="desc">{props.description ? props.description : "N/A"}</td>
      <td className="status">{props.status ? "enabled" : "disabled"}</td>
      <td className="attended">{props.attended}</td>
    </tr>
  );
};

export default AdminEventListItem;
