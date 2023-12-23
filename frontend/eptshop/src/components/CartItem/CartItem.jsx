import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFetch, subtractToCartFetch } from "../../slices/cartSlice";
import { removeEmail, reset } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function CartItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.cart.message);

  function addMoreToCart() {
    dispatch(
      addToCartFetch({
        productId: { id: props.productId },
        color: props.color,
        size: props.size,
        quantity: 1,
      })
    );
  }

  function subtractLessToCart() {
    dispatch(
      subtractToCartFetch({
        productId: { id: props.productId },
        color: props.color,
        size: props.size,
        quantity: 1,
      })
    );
  }

  function removeToCart() {
    dispatch(
      subtractToCartFetch({
        productId: { id: props.productId },
        color: props.color,
        size: props.size,
        quantity: props.quantity,
      })
    );
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={props.url}
        alt=""
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {props.productName}{" "}
          <span className="text-muted" style={{ fontSize: ".85rem" }}>
            x{props.quantity}
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: ".85rem" }}>
          {formatCurrency(props.price)}
        </div>
        <div>
          <Box
            sx={{
              backgroundColor: props.color,
              width: "1rem",
              height: "1rem",
              borderRadius: "50%",
              border: 1,
            }}
          ></Box>
        </div>
        <div className="text-muted" style={{ fontSize: ".85rem" }}>
          size: {props.size}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: ".85rem" }}>
        {formatCurrency(props.price * props.quantity)}
      </div>
      <Button
        variant="outline-primary"
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={subtractLessToCart}
      >
        -
      </Button>
      <Button
        variant="outline-primary"
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={addMoreToCart}
      >
        +
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={removeToCart}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
