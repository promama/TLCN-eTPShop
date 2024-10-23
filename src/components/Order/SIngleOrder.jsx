import React, { useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Box, CircularProgress, Rating } from "@mui/material";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRatingProduct } from "../../slices/cartSlice";
import { reset } from "../../slices/userSlice";

function SIngleOrder(props) {
  const isLoading = useSelector((state) => state.user.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(props.product.rating);

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        fetchRatingProduct({
          _id: props.product._id,
          productId: props.product.productId,
          rating: value,
        })
      ).unwrap();
      alert("Rating success");
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  };
  return (
    <Stack>
      <Container className="mb-2">
        <Row className="mb-2">
          <Col xs={2}>
            <img
              src={props.product?.url}
              alt=""
              style={{ width: "125px", height: "100px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={8}>
            <Row>{props.product?.productName}</Row>
            <Row>
              <Box
                sx={{
                  backgroundColor: props.product?.color,
                  width: "1rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  border: 2,
                }}
              ></Box>
              {props.product?.color}
            </Row>
            <Row>x{props.product?.quantity}</Row>
            <Row>Size: {props.product?.size}</Row>
          </Col>
          <Col xs={2} className="d-flex align-items-center flex-row-reverse">
            <div className="text-primary">
              {formatCurrency(props.product?.price)}
            </div>
          </Col>
          {props.product?.status === "Finish" &&
            (!isLoading ? (
              <>
                <Row>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      disabled={!props.product.allowRating}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Row>

                {props.product.allowRating && (
                  <Row>
                    <Col xs={3}>
                      <Button
                        className="mb-2"
                        onClick={handleRating}
                        variant="outline-primary"
                      >
                        Submit Rating
                      </Button>
                    </Col>
                  </Row>
                )}
              </>
            ) : (
              <CircularProgress />
            ))}
        </Row>
      </Container>
    </Stack>
  );
}

export default SIngleOrder;
