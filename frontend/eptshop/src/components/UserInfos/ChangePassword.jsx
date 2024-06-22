import { Button, Checkbox, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChangePassword, reset } from "../../slices/userSlice";

function ChangePassword() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("password");

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const reNewPassword = data.get("reNewPassword");

    if (
      password.trim() === "" ||
      newPassword.trim() === "" ||
      reNewPassword.trim() === ""
    )
      alert("Please fill all fields");
    else if (newPassword !== reNewPassword) {
      alert("New Password and Re-enter New Password not match");
    } else {
      console.log({ password, newPassword, reNewPassword });
      //dispatch
      try {
        const res = await dispatch(
          fetchChangePassword({ password, newPassword, reNewPassword })
        ).unwrap();
        alert(res.message);
      } catch (err) {
        if (err.message === "signin again") {
          dispatch(reset());
          navigate("/login");
        }
        alert(err.message);
      }
    }
  };
  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">Reset password</Card.Header>
      <Card.Body>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Container className="d-flex align-items-center">
              <Col>
                <Row className="d-flex align-items-center">
                  <Col xs={3}>
                    <label>Current Password: </label>
                  </Col>
                  <Col xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="currentPassword"
                      label="Current Password"
                      type={type}
                      autoComplete="Current password"
                      sx={{ marginBottom: 2 }}
                    ></TextField>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col xs={3}>
                    <label>New Password: </label>
                  </Col>
                  <Col xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type={type}
                      autoComplete="New Password"
                      sx={{ marginBottom: 2 }}
                    ></TextField>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col xs={3}>
                    <label>Re-enter New Password: </label>
                  </Col>
                  <Col xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="reNewPassword"
                      label="Re-enter New Password"
                      type={type}
                      autoComplete="Re-enter New Password"
                      sx={{ marginBottom: 2 }}
                    ></TextField>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <Button type="submit" variant="contained">
                      Change Password
                    </Button>
                  </Col>
                  <Col>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />{" "}
                    Show Password
                  </Col>
                </Row>
              </Col>
            </Container>
          </Box>
        )}
      </Card.Body>
    </Card>
  );
}

export default ChangePassword;
