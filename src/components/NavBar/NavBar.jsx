import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import {
  fetchUnreadNotification,
  removeEmail,
  reset,
  setNotificaition,
} from "../../slices/userSlice";
import { showOffCanvas, dropCart } from "../../slices/cartSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import socketIOClient from "socket.io-client";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRead = (id) => {
    //send data to set read
    console.log(id);
  };
  let email =
    useSelector((state) => state.user.email) || localStorage.getItem("email");
  const totalCartProducts = useSelector(
    (state) => state.cart.cartTotalQuantities
  );

  const listNotify = useSelector((state) => state.user.notificationList);
  const unreadNotify = useSelector((state) => state.user.unreadNotify || 0);

  useEffect(() => {}, [email]);

  useEffect(() => {
    dispatch(fetchUnreadNotification({ email: email }));
  }, [dispatch, email]);

  //connect to socketio server
  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");
    //user join a room
    socketRef.current.emit("user:join", {
      room: email,
    });

    //confirming order
    socketRef.current.on("server:confirmed-order", (message) => {
      console.log(message);
      dispatch(setNotificaition(message.notify));
    });

    //listen to manager confirm order change status to delivering
    socketRef.current.on("server:manager-approved-order", (message) => {
      console.log(message);
      dispatch(setNotificaition(message));
    });

    //finish order
    socketRef.current.on("server:finish-order", (message) => {
      console.log(message);
      dispatch(setNotificaition(message));
    });

    //listen to deliver taken order
    socketRef.current.on("user:order-taken", (message) => {
      console.log(message);
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //listen to deliver finish order
    socketRef.current.on("user:deliver-finish-order", (message) => {
      console.log(message);
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //listen to deliver cancel order
    socketRef.current.on("user:deliver-cancel-order", (message) => {
      console.log(message);
      dispatch(setNotificaition(message));
      alert(message.message);
    });
  }, [dispatch, email]);

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
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            width: "3rem",
            height: "3rem",
            position: "relative",
            marginRight: 5,
          }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <NotificationsIcon />
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
            {unreadNotify}
          </div>
        </Button>
        <Menu
          id="basic-menu"
          sx={{ width: 1 / 4 }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                maxWidth: 370,
              },
            },
          }}
        >
          {listNotify
            ?.slice(0)
            .reverse()
            .map((noti) => {
              let backgroundColor = "white";
              let message = "";
              if (noti.isRead === false) {
                backgroundColor = "#e1f5ef";
              }
              if (noti.status === "Finish") {
                message = " is completed";
              } else if (noti.status === "Waiting approve") {
                message = " is waiting for approve";
              } else if (noti.status === "Delivering") {
                message = " is delivering to you, please check your phone";
              }
              return (
                <MenuItem
                  divider={true}
                  key={noti._id}
                  onClick={() => handleRead(noti._id)}
                  style={{ backgroundColor: backgroundColor }}
                >
                  <div
                    style={{
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {"Your order " + noti.orderId}
                    <br />
                    {message}
                  </div>
                </MenuItem>
              );
            })}
        </Menu>

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
