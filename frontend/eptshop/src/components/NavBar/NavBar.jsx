import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { useEffect } from "react";
import { removeEmail, reset } from "../../slices/userSlice";
import { showOffCanvas, dropCart } from "../../slices/cartSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let email =
    useSelector((state) => state.user.email) || localStorage.getItem("email");
  const totalCartProducts = useSelector(
    (state) => state.cart.cartTotalQuantities
  );

  useEffect(() => {}, [email]);

  function navigateToProfilePage() {
    navigate("/profile");
  }

  useEffect(() => {}, [totalCartProducts]);

  function userDropDown() {
    if (email === "" || email === null) {
      return (
        <Link to="/login" style={{ marginRight: "1%" }}>
          <h1>Signin</h1>
        </Link>
      );
    }
    return (
      <div className="dropdown" style={{ marginRight: "1%" }}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {email}
        </button>
        <ul className="dropdown-menu">
          <li>
            <div
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={navigateToProfilePage}
            >
              Profile
            </div>
          </li>
          <li>
            <div
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(reset());
                dispatch(dropCart());
                navigate("/login");
              }}
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
        </Nav>
        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
          onClick={() => dispatch(showOffCanvas())}
        >
          <ShoppingBagIcon />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {/* {isTooLarge(totalCartProducts) ? "9+" : { totalCartProducts }} */}
            {totalCartProducts}
          </div>
        </Button>
      </Container>
      {userDropDown()}
    </NavbarBs>
  );
};

export default NavBar;
