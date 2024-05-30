import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Container } from "react-bootstrap";
import "./Profile.css";

import ChangePassword from "../../components/UserInfos/ChangePassword";
import UserAddress from "../../components/UserInfos/UserAddress";
import UserCart from "../../components/UserInfos/UserCart";
import UserCartAwaitPayment from "../../components/UserInfos/UserCartAwaitPayment";
import UserCartDelivery from "../../components/UserInfos/UserCartDelivery";
import UserCartFinish from "../../components/UserInfos/UserCartFinish";
import UserProfile from "../../components/UserInfos/UserProfile";

function Profile() {
  const dispatch = useDispatch();

  const choosenCompent = [
    <UserProfile />,
    <UserAddress />,
    <ChangePassword />,
    <UserCart />,
    <UserCartDelivery />,
    <UserCartAwaitPayment />,
    <UserCartFinish />,
  ];
  const show = useSelector((state) => state.user.show);

  const [showComponent, setShowComponent] = useState(show);
  return (
    <>
      <Container className="px-4 px-lg-5 my-5">
        <Row>
          <Col className="" xs={2}>
            <i className="bi bi-person-circle"> My Profile</i>

            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(0)}
            >
              Profile
            </Row>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(1)}
            >
              Address
            </Row>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(2)}
            >
              Change password
            </Row>
            <br />
            <i className="bi bi-card-list"> Cart List</i>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(3)}
            >
              All
            </Row>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(5)}
            >
              Waiting Approve
            </Row>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(4)}
            >
              Delivering
            </Row>
            <Row
              className="gx-4 gx-lg-5 align-items-center menu-item"
              onClick={() => setShowComponent(6)}
            >
              Finish
            </Row>
          </Col>

          <Col className="" xs={10}>
            {choosenCompent[showComponent]}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
