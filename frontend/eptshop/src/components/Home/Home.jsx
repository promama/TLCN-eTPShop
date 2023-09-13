import Link from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch, allProductsFetch } from "../../slices/productsSlice";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

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

  return (
    <>
      home page
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.name}>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.remain}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
