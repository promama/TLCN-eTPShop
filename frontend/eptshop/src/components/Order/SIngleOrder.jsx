import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { formatCurrency } from "../../utilities/formatCurrency";

function SIngleOrder(props) {
  return (
    <Stack>
      <Container className="mb-2">
        <Row className="mb-2">
          <Col xs={2}>
            <img
              src={props.product?.url}
              alt=""
              style={{ width: "125px", height: "100px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={8}>
            <Row>{props.product?.productName}</Row>
            <Row>
              <Box
                sx={{
                  backgroundColor: props.product?.color,
                  width: "1rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  border: 2,
                }}
              ></Box>
              {props.product?.color}
            </Row>
            <Row>x{props.product?.quantity}</Row>
            <Row>Size: {props.product?.size}</Row>
          </Col>
          <Col xs={2} className="d-flex align-items-center flex-row-reverse">
            <div className="text-primary">
              {formatCurrency(props.product?.price)}
            </div>
          </Col>
        </Row>
      </Container>
    </Stack>
  );
}

export default SIngleOrder;
