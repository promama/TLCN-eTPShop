import { Link, useParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const NavBar = () => {
  const email = useSelector((state) => state.user.email);

  function hi() {
    if (email !== "" && email !== null) {
      return email;
    } else {
      return (
        <Link to="/login">
          <h1>Login</h1>
        </Link>
      );
    }
  }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>eTPShop</h2>
      </Link>
      <div className="login-bag">
        <Link to="/cart">
          <div className="nav-bag">
            <ShoppingBagIcon />
          </div>
        </Link>
        {hi()}
      </div>
    </nav>
  );
};

export default NavBar;
