import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchChangeUserProfile,
  fetchUserShortProfile,
} from "../../slices/userSlice";
import { CircularProgress } from "@mui/material";

function UserProfile() {
  const email = useSelector((state) => state.user.email);
  const dob = useSelector((state) => state.user.dob);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const gender = useSelector((state) => state.user.gender);
  const isLoading = useSelector((state) => state.user.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(gender);
  const [date, setDate] = useState(dayjs(dob)); //took day from db
  const [enableEdit, setEnableEdit] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      phone: data.get("phone"),
      gender: data.get("radio-gender"),
      dob:
        date.date() + "/" + parseInt(date.month() + 1, 10) + "/" + date.year(),
    });

    try {
      const res = await dispatch(
        fetchChangeUserProfile({
          phone: data.get("phone"),
          gender: data.get("radio-gender"),
          dob:
            date.date() +
            "/" +
            parseInt(date.month() + 1, 10) +
            "/" +
            date.year(),
        })
      ).unwrap();
      setEnableEdit(true);
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  };

  function handleChangeGender(event) {
    setValue(event.target.value);
  }

  function handleEdit() {
    if (enableEdit === false) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }

  useEffect(() => {
    try {
      dispatch(fetchUserShortProfile(phoneNumber));
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
    console.log(phoneNumber);
  }, [dispatch, phoneNumber, navigate]);

  return (
    <Card>
      <Card.Body>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Container className="d-flex align-items-center">
            <Col>
              <Row className="d-flex">
                <Col xs={1}>
                  <label>Email: </label>
                </Col>

                <Col xs={2}>
                  <label>{email}</label>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    id={phoneNumber}
                    autoComplete="phone"
                    sx={{ marginBottom: 2 }}
                    defaultValue={phoneNumber}
                    disabled={enableEdit}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <FormControl disabled={enableEdit}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="radio-gender"
                      value={value}
                      onChange={handleChangeGender}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Col>
                <Col xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of birth"
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      disabled={enableEdit}
                    />
                  </LocalizationProvider>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs={6}>
                  {enableEdit ? (
                    <Button
                      className=""
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      className=""
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      onClick={() => handleEdit()}
                    >
                      Cancel
                    </Button>
                  )}
                  {!isLoading ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={enableEdit}
                    >
                      Save change
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </Col>
              </Row>
            </Col>
          </Container>
        </Box>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;
