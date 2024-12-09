import { useDispatch, useSelector } from "react-redux";
import { productsFetch, allProductsFetch } from "../../slices/productsSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CircularProgress, Rating, TextField } from "@mui/material";

import socketIOClient from "socket.io-client";
import { setNotificaition } from "../../slices/userSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const isLoading = useSelector((state) => state.products.isLoading);
  const email = useSelector((state) => state.user.email);
  //const [productId, setProductId] = useState(0);

  const [query, setQuery] = useState("");

  console.log(products);
  useEffect(() => {
    dispatch(allProductsFetch());
  }, [dispatch]);

  function navigateProductDetail(id) {
    console.log(id);
    navigate(`/product/${id}`);
  }

  const filteredProduct = useMemo(() => {
    return products.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  const [responseMessage, setResponseMessage] = useState("Waiting Response");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");
    try {
      //user join a room
      socketRef.current.emit("user:join", {
        room: email,
      });

      // //confirming order
      // socketRef.current.on("server:confirmed-order", (message) => {
      //   console.log(message);
      //   dispatch(setNotificaition(message.notify));
      // });

      // //listen to manager confirm order change status to delivering
      // socketRef.current.on("server:manager-approved-order", (message) => {
      //   console.log(message);
      //   dispatch(setNotificaition(message.notify));
      // });

      // //finish order
      // socketRef.current.on("server:finish-order", (message) => {
      //   console.log(message);
      //   dispatch(setNotificaition(message.notify));
      // });

      //testing space
      // socketRef.current.emit("user:verify", {
      //   socketId: socketRef.current.id,
      //   token: localStorage.getItem("access_token"),
      // });
      // socketRef.current.on("server saying: ", (message) => {
      //   setResponseMessage(message);
      // });
      //console.log(socketRef.current);
      socketRef.current.on("server:acceptjoin", (message) => {
        setResponseMessage(message.message);
      });
    } catch {}
  }, [email, dispatch]);

  // function submitSendMessage() {
  //   //send message to server
  //   console.log("current socket id is: " + socketRef.current.id);
  //   socketRef.current.emit("chat message", {
  //     message: "call you from client",
  //     socketId: socketRef.current.id,
  //   });
  // }

  // function handleJoinRoom() {
  //   socketRef.current.emit("user:send-to-room", { message: "hey" });
  // }

  return (
    <>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        helperText="search"
        variant="standard"
      ></TextField>
      <div>
        <Row md={2} xs={1} lg={3} className="g-3">
          {!isLoading ? (
            filteredProduct?.map((product) => (
              <Col
                key={product.name}
                onClick={() => navigateProductDetail(product._id)}
              >
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.url}
                    height="200px"
                    style={{ objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                      <Container>
                        <Row>
                          <span className="fs-2">{product.name}</span>
                          <span className="ms-2 text-muted">
                            {formatCurrency(product.price)}
                          </span>
                        </Row>
                        <span className="fs-2">
                          <Rating
                            name="read-only"
                            value={product.totalPoint / product.numberOfRate}
                            precision={0.5}
                            readOnly
                          />
                        </span>
                        <span className="fs-2">
                          {" ("}
                          {product.numberOfRate}
                          {")"}
                        </span>
                        <span className="fs-2"> - Sold {product?.sold}</span>
                      </Container>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <CircularProgress />
          )}
        </Row>
      </div>
    </>
  );
}

export default Home;
