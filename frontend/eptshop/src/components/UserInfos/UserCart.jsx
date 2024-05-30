import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllOrder } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Order from "../Order/Order";
import { CircularProgress } from "@mui/material";

function UserCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);
  const isLoading = useSelector((state) => state.cart.isLoading);

  useEffect(() => {
    try {
      dispatch(showAllOrder());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">All Orders</Card.Header>
      <Card.Body>
        {!isLoading ? (
          listOrders &&
          listOrders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <Container>
                  <Order key={order.orderId} orders={order} />
                </Container>
              );
            })
        ) : (
          <CircularProgress />
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCart;
