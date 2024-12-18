import { useEffect, useRef } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  dropCart,
  hideOffCanvas,
  showCartItemsFetch,
} from "../../slices/cartSlice";
import { formatCurrency } from "../../utilities/formatCurrency";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import {
  fetchConfirmAndBuy,
  fetchGetAllAddress,
  reset,
} from "../../slices/userSlice";
import ListAddress from "./ListAddress";
import { CircularProgress } from "@mui/material";

import socketIOClient from "socket.io-client";

export function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isShow = useSelector((state) => state.cart.showOffCanvas);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const orderId = useSelector((state) => state.cart.orderId);
  const addressInfos = useSelector((state) => state.user.addressInfos);
  const isLoading = useSelector((state) => state.user.isLoading);

  const socketRef = useRef();
  const email = useSelector((state) => state.user.email);

  function haveCartItems(item) {
    if (item) return true;
    else return false;
  }

  useEffect(() => {
    try {
      dispatch(showCartItemsFetch());
      dispatch(fetchGetAllAddress());
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");
  });

  const handleConfirmAndBuy = async (e) => {
    try {
      const res = await dispatch(
        fetchConfirmAndBuy({ orderId, addressInfos, email })
      ).unwrap();
      await socketRef.current.emit("user:confirm-order", {
        message: "confirm and buy",
        email: email,
        orderId: orderId,
      });
      alert(res.message);
      dispatch(dropCart());
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  };

  return (
    <Offcanvas
      show={isShow}
      onHide={() => dispatch(hideOffCanvas())}
      placement="end"
      style={{ width: "50%", background: "light" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your products in cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {haveCartItems(cartItem) &&
            cartItem.map((item) => (
              <CartItem key={item._id + item.color + item.size} {...item} />
            ))}
          <div className="ms-auto fw-bold fs-5">
            Total: {formatCurrency(amount)}
          </div>
          <ListAddress></ListAddress>

          {!isLoading ? (
            <Button
              variant="outline-primary"
              className="ms-auto fw-bold fs-5"
              onClick={handleConfirmAndBuy}
            >
              Confirm & buy
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
