import { useDispatch, useSelector } from "react-redux";
import { productsFetch, allProductsFetch } from "../../slices/productsSlice";
import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  //const [productId, setProductId] = useState(0);

  console.log(products);
  useEffect(() => {
    dispatch(allProductsFetch());
  }, [dispatch]);

  // const [item, setItem] = useState(0);

  // async function handleClick() {
  //   const result = await dispatch(productsFetch()).then(
  //     console.log("dispatch complete")
  //   );
  //   setItem(result.payload.data);
  // }

  function navigateProductDetail(id) {
    console.log(id);
    navigate(`/product/${id}`);
  }

  return (
    <>
      home page
      <div className="products">
        {products.map((product) => (
          <div
            className="product"
            key={product.name}
            onClick={() => navigateProductDetail(product._id)}
          >
            <img
              src={product.url}
              alt={product.name}
              className="product-image"
            ></img>
            <div>Name: {product.name}</div>
            <div className="price-sold">
              <div>Price: ${product.price}</div>
              <div>Remain: {product.remain}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
