import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingleAddress from "./SingleAddress";

function ListAddress() {
  const [isShow, setIsShow] = useState(false);
  const [chosenAddress, setChosenAddress] = useState({});
  const addresses = useSelector((state) => state.user.addresses);

  const handleReceive = (childData) => {
    setIsShow(childData.isShow);
    setChosenAddress(childData.chosenAddress);
  };
  return (
    <Stack>
      {!isShow && chosenAddress.address && (
        <SingleAddress address={chosenAddress} isChosen={true} />
      )}
      {!isShow && (
        <Button variant="outline-primary" onClick={() => setIsShow(!isShow)}>
          Choose an address
        </Button>
      )}
      {isShow &&
        addresses &&
        addresses.map((address) => {
          return (
            <SingleAddress
              address={address}
              parentCallback={handleReceive}
              isChosen={false}
            />
          );
        })}
    </Stack>
  );
}

export default ListAddress;
