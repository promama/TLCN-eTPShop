import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
import UserNewAddress from "../Address/UserNewAddress";
import { useSelector } from "react-redux";
import UserListAddress from "../Address/UserListAddress";

function UserAddress() {
  const [addNewAddress, setAddNewAddress] = useState(false);
  const addresses = useSelector((state) => state.user.addresses);

  const handleCallback = (child) => {
    setAddNewAddress(child);
  };

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">
        <Row>
          <Col className="align-items-center" xs={2}>
            <label className="px-4 px-lg-3 my-2">My address</label>
          </Col>
          <Col
            xs={10}
            style={{
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Button
              className="mb-2"
              variant="outlined"
              onClick={() => setAddNewAddress(!addNewAddress)}
            >
              Add new address
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Box sx={{ mt: 1 }}>
          <Container className="d-flex align-items-center">
            <Col>
              <Row className="px-lg-3 mb-3">Addresses</Row>
              {addNewAddress && (
                <UserNewAddress
                  parentCallback={handleCallback}
                  isEdit={true}
                ></UserNewAddress>
              )}
              <UserListAddress></UserListAddress>
            </Col>
          </Container>
        </Box>
      </Card.Body>
    </Card>
  );
}

export default UserAddress;
