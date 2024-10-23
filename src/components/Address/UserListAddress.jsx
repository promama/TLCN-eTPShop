import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllAddress, reset } from "../../slices/userSlice";
import UserSingleAddress from "./UserSingleAddress";
import { useNavigate } from "react-router-dom";

function UserListAddress(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.user.addresses);
  const message = useSelector((state) => state.user.message);

  const [addNewAddress, setAddNewAddress] = useState(true);

  useEffect(() => {
    try {
      dispatch(fetchGetAllAddress());
    } catch (err) {
      alert(message);
      console.log(err);
      if (message === "signin again") {
      }
      dispatch(reset());
      navigate("/login");
    }
  }, [dispatch, navigate, message]);

  useEffect(() => {
    try {
      dispatch(fetchGetAllAddress());
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <>
      {addresses &&
        addresses?.map((address) => (
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
