import React from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import SIngleOrder from "./SIngleOrder";
import { formatCurrency } from "../../utilities/formatCurrency";

function Order(props) {
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
                  // return <Stack>{product.productName}</Stack>;
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
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default Order;
