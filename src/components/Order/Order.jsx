import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import SIngleOrder from "./SIngleOrder";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCancelOrder,
  fetchFinishOrder,
  reset,
} from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";

import socketIOClient from "socket.io-client";
import { setNotificaition } from "../../slices/userSlice";

function Order(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef();

  const isLoading = useSelector((state) => state.user.isLoading);
  const email = useSelector((state) => state.user.email);

  //connect to socket server
  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");
  });

  function checkStatus(status) {
    if (status === "In cart") {
      return "blue";
    } else if (status === "Waiting approve") {
      return "#ff6500";
    } else if (status === "Delivering") {
      return "#00f6ff";
    } else if (status === "Finish") {
      return "#1bff00";
    } else return "#ff2525";
  }

  function isCancelable(status) {
    if (status === "Waiting approve") return true;
    return false;
  }

  function isFinishable(status) {
    if (status === "Delivering") return true;
    return false;
  }

  const handleCancelOrder = async () => {
    try {
      const res = await dispatch(
        fetchCancelOrder({ orderId: props.orders.orderId })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
      }
    }
  };

  const handleFinishOrder = async () => {
    try {
      const res = await dispatch(
        fetchFinishOrder({ orderId: props.orders.orderId })
      ).unwrap();
      alert(res.message);

      socketRef.current.emit("user:finish-order", {
        message: "user finishing order",
        email: email,
        orderId: props.orders,
      });
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <Stack className="mt-1">
      {props.orders && (
        <div className="mb-4">
          <Card>
            <Card.Header className="bg-transparent">
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex align-items-center"
              >
                <div className="me-auto">Id: {props.orders.orderId}</div>
                <div style={{ color: checkStatus(props.orders.status) }}>
                  {props.orders.status}
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              {props.orders.productInOrder &&
                props.orders.productInOrder.map((product) => {
                  return (
                    <div>
                      <SIngleOrder
                        product={product}
                        key={product._id + product.orderId}
                      />
                    </div>
                  );
                })}
              <Row>
                <Col xs={10}>
                  <Row className="mb-1">
                    <Col xs={3}>{props.orders?.name}</Col>
                  </Row>
                  <Row className="mb-1">
                    <Col className="text-secondary">
                      {props.orders?.phoneNumber}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <label className="text-secondary">
                      {props.orders?.address}
                    </label>
                  </Row>
                </Col>
                <Col
                  className="d-flex align-items-center flex-row-reverse"
                  xs={2}
                >
                  <div className="text-primary">
                    {formatCurrency(props.orders?.total)}
                  </div>
                  Total:
                </Col>
              </Row>
              {isLoading ? (
                <CircularProgress />
              ) : (
                (isCancelable(props.orders.status) && (
                  <Button variant="outline-danger" onClick={handleCancelOrder}>
                    Cancel order
                  </Button>
                )) ||
                (isFinishable(props.orders.status) && (
                  <Button
                    variant="outline-success  "
                    onClick={handleFinishOrder}
                  >
                    Finish order
                  </Button>
                ))
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default Order;
