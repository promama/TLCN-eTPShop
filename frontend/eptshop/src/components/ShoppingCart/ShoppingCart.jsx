import { useEffect, useMemo, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideOffCanvas } from "../../slices/cartSlice";
import { formatCurrency } from "../../utilities/formatCurrency";
import CartItem from "../CartItem/CartItem";

export function ShoppingCart() {
  const dispatch = useDispatch();

  const isShow = useSelector((state) => state.cart.showOffCanvas);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const cartItem = useSelector((state) => state.cart.cartItems);

  function haveCartItems(item) {
    if (item) return true;
    else return false;
  }

  return (
    <Offcanvas
      show={isShow}
      onHide={() => dispatch(hideOffCanvas())}
      placement="end"
      style={{ width: "50%", background: "light" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {haveCartItems(cartItem) ? (
            cartItem.map((item) => (
              <CartItem key={item._id + item.color + item.size} {...item} />
            ))
          ) : (
            <></>
          )}
          <div className="ms-auto fw-bold fs-5">
            Total: {formatCurrency(amount)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
