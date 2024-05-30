import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddNewAddress } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

function UserNewAddress(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleAddNewAddress = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      phoneNumber: data.get("phone"),
      address: data.get("address"),
    });
    try {
      const res = await dispatch(
        fetchAddNewAddress({
          name: data.get("name"),
          phoneNumber: data.get("phone"),
          address: data.get("address"),
          addressId: props.id,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      console.log(err);
      alert(err.message);
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
    props.parentCallback(false);
  };

  return (
    <Card className="bg-primary mb-2">
      <Card.Header className="text-white">
        {props.isEdit ? "New address" : "Edit address"}
      </Card.Header>
      <Card.Body className="bg-white">
        <Container className="align-items-center">
          <Box component="form" onSubmit={handleAddNewAddress}>
            <Row>
              <Col xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="text"
                  id="name"
                  defaultValue={props.name}
                  sx={{ marginBottom: 2 }}
                />
              </Col>
              <Col xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="number"
                  id="phone"
                  defaultValue={props.phoneNumber}
                  sx={{ marginBottom: 2 }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  defaultValue={props.address}
                  sx={{ marginBottom: 2 }}
                />
              </Col>
            </Row>
            {!isLoading ? (
              <Row>
                <Col className="mt-2">
                  <Button
                    className="bg-white"
                    variant="outlined"
                    color="error"
                    sx={{ marginRight: 2, color: "red" }}
                    onClick={() => props.parentCallback(false)}
                  >
                    Discard change
                  </Button>
                  <Button
                    className="bg-white text-blue"
                    type="submit"
                    variant="outlined"
                  >
                    Save change
                  </Button>
                </Col>
              </Row>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default UserNewAddress;
