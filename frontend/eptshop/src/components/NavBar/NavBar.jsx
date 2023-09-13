import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./NavBar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const name = useSelector((state) => state.user.name);
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>eTPShop</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <ShoppingBagIcon />
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
