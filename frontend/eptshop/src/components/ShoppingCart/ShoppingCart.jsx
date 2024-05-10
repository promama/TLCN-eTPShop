import { useEffect, useMemo, useState } from "react";
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
import { fetchConfirmAndBuy, removeEmail } from "../../slices/userSlice";

export function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isShow = useSelector((state) => state.cart.showOffCanvas);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const orderId = useSelector((state) => state.cart.orderId);

  function haveCartItems(item) {
    if (item) return true;
    else return false;
  }

  useEffect(() => {
    try {
      dispatch(showCartItemsFetch());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  const handleConfirmAndBuy = async (e) => {
    try {
      const res = await dispatch(fetchConfirmAndBuy(orderId)).unwrap();
      alert(res.message);
      dispatch(dropCart());
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(removeEmail());
        alert(err.message);
        navigate("/login");
      }
      console.log(err);
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
        <Offcanvas.Title>Cart id: {orderId}</Offcanvas.Title>
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
          <Button
            variant="outline-primary"
            className="ms-auto fw-bold fs-5"
            onClick={handleConfirmAndBuy}
          >
            Confirm & buy
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
