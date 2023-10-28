import { useParams } from "react-router-dom";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productFetch, productColorFetch } from "../../slices/productsSlice";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { changeSize, changeColor } from "../../slices/productsSlice";
import { formatCurrency } from "../../utilities/formatCurrency";

function Product() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleItem);
  const baseColor = useSelector((state) => state.products.color);
  const productColors = useSelector((state) => state.products.item_Props);
  const size = useSelector((state) => state.products.size);
  const color = useSelector((state) => state.products.color);
  const [choosenColor, setChoosenColor] = useState(
    localStorage.getItem("color") || color
  );
  const [mainImage, setMainImage] = useState("");
  const [sizes, setSizes] = useState(localStorage.getItem("size").toString());

  const [num, setNum] = useState(1);

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
      setNum(e.target.value);
    }
  }

  function handleBoxChange(e) {
    setSizes(e.target.value.toString());
    //dispatch(changeSize(sizes));
  }

  function showSizes(sizes) {
    let sizesList = [];
    for (let index = 0; index < sizes.length; index++) {
      sizesList.push(sizes[index].productSize);
    }
    console.log(sizesList);
    return sizesList.map((size) => (
      <option value={size} key={size.toString()}>
        {size}
      </option>
    ));
  }

  useEffect(() => {
    dispatch(productFetch(params));
    dispatch(productColorFetch(params));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(changeSize(sizes));
  }, [dispatch, sizes]);

  useEffect(() => {
    setChoosenColor(baseColor);
    localStorage.setItem("color", choosenColor);
  }, [baseColor, choosenColor]);
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
                  <span>{formatCurrency(product.price)}</span>
                </div>
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
                      defaultValue={sizes}
                    >
                      {productColors.map((products) =>
                        isMatchColor(products.productColor) ? (
                          showSizes(products.sizes)
                        ) : (
                          <></>
                        )
                      )}
                    </select>
                  </div>
                  <div className="mt-3">
                    {isBuyable() ? (
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
                              setNum(parseInt(num, 10) + 1);
                            }}
                          >
                            +
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="mt-3"
                            variant="outlined"
                            onClick={() => {
                              console.log({
                                color: choosenColor,
                                size: sizes,
                                quantity: num,
                              });
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </>
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
