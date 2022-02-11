import "./main.css";
import { useContext } from "react";
import ThemeContext from "../ThemeContext";

const PageHeader = ({ title }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <header style={{backgroundColor: theme}}>
      <h1>{title}</h1>
    </header>
  );
};

export default PageHeader;
