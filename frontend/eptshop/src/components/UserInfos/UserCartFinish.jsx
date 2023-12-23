import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showFinishOrder } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Order from "../Order/Order";

function UserCartFinish() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);

  useEffect(() => {
    try {
      dispatch(showFinishOrder());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">
        Delivering Orders
      </Card.Header>
      <Card.Body>
        {listOrders &&
          listOrders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <Container>
                  <Order key={order.orderId} orders={order} />
                </Container>
              );
            })}
      </Card.Body>
    </Card>
  );
}

export default UserCartFinish;
