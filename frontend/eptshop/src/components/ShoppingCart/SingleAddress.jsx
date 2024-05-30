import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setOrderAddress, setShowPage } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { hideOffCanvas } from "../../slices/cartSlice";

function SingleAddress(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container className="justify-content-start mb-3">
      <Row className="mb-1">
        <Col xs={3}>{props.address.name}</Col>
      </Row>
      <Row>
        <Col className="text-secondary">{props.address.phoneNumber}</Col>
      </Row>
      <Row className="mb-1">
        <label className="text-secondary">{props.address.address}</label>
      </Row>

      {!props.isChosen && props.address.name && (
        <Row className="mb-2">
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => {
                props.parentCallback({
                  isShow: false,
                  chosenAddress: props.address,
                });
                dispatch(setOrderAddress({ addressInfos: props.address }));
              }}
            >
              Choose this address
            </Button>
          </Col>
        </Row>
      )}
      {!props.address.name && (
        <Row>
          <Col>
            <Button
              variant="outline-secondary"
              onClick={() => {
                navigate("/profile");
                dispatch(setShowPage(1));
                dispatch(hideOffCanvas());
              }}
            >
              Create new address
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default SingleAddress;
