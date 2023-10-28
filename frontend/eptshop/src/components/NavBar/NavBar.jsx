import { Link, NavLink, useParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { useEffect } from "react";

const NavBar = () => {
  const email = useSelector((state) => state.user.email);

  function userDropDown() {
    if (email === "" || email === null) {
      return (
        <Link to="/login">
          <h1>Signin</h1>
        </Link>
      );
    }
    return (
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {email}
        </button>
        <ul class="dropdown-menu">
          <li>
            <div className="dropdown-item" style={{ cursor: "pointer" }}>
              Profile
            </div>
          </li>
          <li>
            <div className="dropdown-item" style={{ cursor: "pointer" }}>
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
            3
          </div>
        </Button>
      </Container>
      {userDropDown()}
    </NavbarBs>
  );
};

export default NavBar;
