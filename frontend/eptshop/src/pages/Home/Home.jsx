import { useDispatch, useSelector } from "react-redux";
import { productsFetch, allProductsFetch } from "../../slices/productsSlice";
import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import { Card, Col, Row } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  //const [productId, setProductId] = useState(0);

  console.log(products);
  useEffect(() => {
    dispatch(allProductsFetch());
  }, [dispatch]);

  function navigateProductDetail(id) {
    console.log(id);
    navigate(`/product/${id}`);
  }

  return (
    <>
      <h1>home page</h1>
      <div>
        <Row md={2} xs={1} lg={3} className="g-3">
          {products?.map((product) => (
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
                    <span className="fs-2">{product.name}</span>
                    <span className="ms-2 text-muted">
                      {formatCurrency(product.price)}
                    </span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
