// assets
import logo from "../../assets/logo.svg";
// styles
import "./styles.scss";

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
    </header>
  );
};

export default Header;
