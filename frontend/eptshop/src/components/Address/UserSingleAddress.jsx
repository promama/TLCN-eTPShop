import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllAddress,
  fetchUserDeleteAddress,
  fetchUserSetDefaultAddress,
} from "../../slices/userSlice";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import UserNewAddress from "./UserNewAddress";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function UserSingleAddress(props) {
  const [addNewAddress, setAddNewAddress] = useState(true);
  const dispatch = useDispatch();

  const handleCallback = (child) => {
    setAddNewAddress(!child);
  };

  function isDefault(value) {
    return !value;
  }

  async function handleDeleteAddress() {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this address?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(fetchUserDeleteAddress(props.id)),
        },
        {
          label: "No",
        },
      ],
    });
  }

  async function handleSetDefault() {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to set this address as default address",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            dispatch(fetchUserSetDefaultAddress(props.id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <>
      <Stack className="mt-1">
        <Box>
          <Container className="d-flex mt-3">
            <Col className="mr-3" xs={10}>
              {addNewAddress ? (
                <>
                  <Row className="px-lg-3 justtify-content-md-center">
                    <Col xs md="auto">
                      {props.name}
                    </Col>
                    <div
                      className="vr"
                      style={{
                        width: "1px",
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    ></div>
                    <Col xs>{props.phoneNumber}</Col>
                  </Row>
                  <Row className="px-lg-3 justtify-content-md-center">
                    <Col>{props.address}</Col>
                  </Row>
                </>
              ) : (
                <>
                  <UserNewAddress
                    name={props.name}
                    phoneNumber={props.phoneNumber}
                    address={props.address}
                    parentCallback={handleCallback}
                    id={props.id}
                    isEdit={addNewAddress}
                  ></UserNewAddress>
                </>
              )}
            </Col>
            <Col xs={2} className="p-2">
              <Row className="mb-2 justify-content-center">
                <Col xs={6}>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setAddNewAddress(!addNewAddress)}
                  >
                    {addNewAddress ? "Update" : "Cancel"}
                  </button>
                </Col>
                {isDefault(props.isDefault) && (
                  <Col xs={6}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleDeleteAddress}
                    >
                      Delete
                    </button>
                  </Col>
                )}
              </Row>
              <Row>
                <Col xs>
                  {isDefault(props.isDefault) && (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleSetDefault}
                    >
                      Set default
                    </button>
                  )}
                </Col>
              </Row>
            </Col>
          </Container>
        </Box>
        <hr className="hr" />
      </Stack>
    </>
  );
}

export default UserSingleAddress;
