import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showFinishOrder } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Order from "../Order/Order";
import { CircularProgress } from "@mui/material";
import { reset } from "../../slices/userSlice";

function UserCartFinish() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);
  const isLoading = useSelector((state) => state.cart.isLoading);

  useEffect(() => {
    try {
      dispatch(showFinishOrder());
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">Finish Orders</Card.Header>
      <Card.Body>
        {!isLoading ? (
          listOrders &&
          listOrders
            ?.slice(0)
            .reverse()
            .map((order) => {
              if (order.status === "Finish")
                return (
                  <Container>
                    <Order
                      key={order.orderId}
                      orders={order}
                      allowRating={true}
                    />
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

export default UserCartFinish;
