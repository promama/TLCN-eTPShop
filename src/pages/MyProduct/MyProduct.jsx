import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productFetch, productColorFetch } from "../../slices/productsSlice";
import { addToCartFetch } from "../../slices/cartSlice";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { changeSize, changeColor } from "../../slices/productsSlice";
import { reset } from "../../slices/userSlice";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CircularProgress } from "@mui/material";

function Product() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.singleItem);
  const base_price = useSelector((state) => state.products.price);
  const baseColor = useSelector((state) => state.products.color);
  const productColors = useSelector((state) => state.products.item_Props);
  const productSizes = useSelector((state) => state.products.productSizes);
  const size = useSelector((state) => state.products.size);
  const color = useSelector((state) => state.products.color);
  const isLoading = useSelector((state) => state.cart.isLoading);

  const [choosenColor, setChoosenColor] = useState(
    localStorage.getItem("color") || color
  );
  const [mainImage, setMainImage] = useState("");
  const [sizes, setSizes] = useState(size);
  const [num, setNum] = useState(1);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(0);

  function displayMainImage(url) {
    if (mainImage === "") {
      return url;
    } else {
      return mainImage;
    }
  }

  function isMatchColor(color) {
    if (choosenColor === "") {
      if (baseColor === color) {
        return true;
      } else {
        return false;
      }
    } else {
      if (choosenColor === color) {
        return true;
      } else {
        return false;
      }
    }
  }

  function isBuyable() {
    if (product.remain === 0 || product.remain === null) {
      return false;
    } else {
      return true;
    }
  }

  function handleChange(e) {
    const regex = /(?<!-)(?<!\d)[1-9][0-9]*/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      if (e.target.value > 0 && e.target.value <= stock) {
        setNum(e.target.value);
      } else if (e.target.value < 1) {
        alert("quantity must be 1 or higher");
        setNum(1);
      } else {
        alert("quantity must be less than " + stock);
        setNum(stock);
      }
    }
  }

  function handleBoxChange(e) {
    setSizes(e.target.value.toString());
    setNum(1);
    productSizes.map((products) => {
      if (
        isMatchColor(products.productColor) &&
        products.productSize.toString() === e.target.value.toString()
      ) {
        setPrice(products.price);
        setStock(products.quantity);
      }
    });
    //dispatch(changeSize(sizes));
  }

  function showSizes(sizes) {
    let sizesList = [];
    for (let index = 0; index < sizes.length; index++) {
      sizesList.push(sizes[index].productSize);
    }
    return sizesList.map((size) => (
      <option value={size} key={size.toString()}>
        {size}
      </option>
    ));
  }

  const addToCart = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(
        addToCartFetch({
          productId: params,
          color: choosenColor,
          size: sizes,
          quantity: num,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    dispatch(productFetch(params));
    setPrice(product.price);
    dispatch(productColorFetch(params));
  }, [dispatch, params, product.price]);

  useEffect(() => {
    dispatch(changeSize(sizes));
  }, [dispatch, sizes]);

  useEffect(() => {
    setChoosenColor(baseColor);
    localStorage.setItem("color", choosenColor);
  }, [baseColor, choosenColor]);

  useEffect(() => {}, [size]);
  return (
    <>
      <Box>
        <span>
          {product.brand} {">"} {product.category} {">"} {product.name}
        </span>
        <section>
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                {productColors.map((product) =>
                  isMatchColor(product.productColor) ? (
                    <div key={product.productColor}>
                      <img
                        className="card-img-top mb-5 mb-md-1"
                        src={displayMainImage(product.url)}
                        alt="..."
                      />
                      {/* 4 images below */}
                      <div className="container">
                        <div className="row mt-2">
                          <div className="col">
                            <img
                              className="card-img-top mb-5"
                              style={{ cursor: "pointer" }}
                              src={product.url}
                              alt="..."
                              onClick={() => {
                                setMainImage(product.url);
                              }}
                            />
                          </div>
                          <div className="col">
                            <img
                              className="card-img-top mb-5"
                              style={{ cursor: "pointer" }}
                              src={product.url1}
                              alt="..."
                              onClick={() => {
                                setMainImage(product.url1);
                              }}
                            />
                          </div>
                          <div className="col">
                            <img
                              className="card-img-top mb-5"
                              style={{ cursor: "pointer" }}
                              src={product.url2}
                              alt="..."
                              onClick={() => {
                                setMainImage(product.url2);
                              }}
                            />
                          </div>
                          <div className="col">
                            <img
                              className="card-img-top mb-5"
                              style={{ cursor: "pointer" }}
                              src={product.url3}
                              alt="..."
                              onClick={() => {
                                setMainImage(product.url3);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={product.productColor}></div>
                  )
                )}
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{product.name}</h1>
                <div className="fs-2 mb-2">
                  <span>{formatCurrency(price)}</span>
                </div>
                <div className="fs-2 mb-2">stock: {stock}</div>
                <div className="row d-flex">
                  {productColors.map((color) => (
                    <div className="col-sm-2 mb-2" key={color.productColor}>
                      <Box
                        sx={{
                          cursor: "pointer",
                          width: 50,
                          height: 50,
                          backgroundColor: color.productColor,
                        }}
                        onClick={() => {
                          setChoosenColor(color.productColor);
                          dispatch(changeColor(color.productColor));
                          // setSizes();
                          setMainImage(color.url);
                        }}
                      ></Box>
                    </div>
                  ))}

                  <div className="">
                    <select
                      className="form-select"
                      aria-label="Choose size"
                      onChange={handleBoxChange}
                    >
                      <option>Choose Sizes</option>
                      {productSizes.map((products) => {
                        if (isMatchColor(products.productColor)) {
                          return (
                            <>
                              <option
                                value={products.productSize}
                                key={products.productSize.toString()}
                              >
                                {products.productSize}
                              </option>
                            </>
                          );
                        }
                      })}
                    </select>
                  </div>
                  <div className="mt-3">
                    {isBuyable() ? (
                      !isLoading ? (
                        <>
                          <div className="">
                            <Button
                              variant="outlined"
                              sx={{ height: 40 }}
                              size="small"
                              onClick={() => {
                                if (num <= 1) {
                                  alert("can't subtract more!");
                                } else {
                                  setNum(parseInt(num, 10) - 1);
                                }
                              }}
                            >
                              -
                            </Button>
                            <TextField
                              id="input-quantity"
                              size="small"
                              type="number"
                              variant="outlined"
                              sx={{ ml: 1, mr: 1, width: 80, height: 40 }}
                              inputProps={{ min: 1, max: 10 }}
                              onChange={(e) => handleChange(e)}
                              value={num}
                            ></TextField>
                            <Button
                              variant="outlined"
                              sx={{ height: 40 }}
                              onClick={() => {
                                if (num >= stock) {
                                  alert("can't add more!");
                                } else {
                                  setNum(parseInt(num, 10) + 1);
                                }
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <div>
                            <Button
                              className="mt-3"
                              variant="outlined"
                              onClick={addToCart}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </>
                      ) : (
                        <CircularProgress />
                      )
                    ) : (
                      "Out of Stock"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
}

export default Product;
