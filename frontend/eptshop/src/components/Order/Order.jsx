import React from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import SIngleOrder from "./SIngleOrder";
import { formatCurrency } from "../../utilities/formatCurrency";

function Order(props) {
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
                {props.orders.status}
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
                <Col xs={10}></Col>
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
