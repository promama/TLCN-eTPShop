import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllAddress } from "../../slices/userSlice";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import UserNewAddress from "./UserNewAddress";
import UserSingleAddress from "./UserSingleAddress";
import { useNavigate } from "react-router-dom";

function UserListAddress(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.user.addresses);
  const message = useSelector((state) => state.user.message);

  const [addNewAddress, setAddNewAddress] = useState(true);

  //not navigate when token expire
  useEffect(() => {
    try {
      dispatch(fetchGetAllAddress());
    } catch (err) {
      alert(message);
      console.log(err);
      if (message === "signin again") {
      }
      navigate("/login");
    }
  }, [dispatch, navigate, message]);

  useEffect(() => {}, [addresses]);

  function isDefault(value) {
    return !value;
  }

  return (
    <>
      {addresses?.map((address) => (
        <UserSingleAddress
          name={address.name}
          phoneNumber={address.phoneNumber}
          address={address.address}
          isEdit={!addNewAddress}
          isDefault={address.isDefault}
          id={address._id}
          key={address._id}
        />
      ))}
    </>
  );
}

export default UserListAddress;
