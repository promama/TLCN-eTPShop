import { useParams } from "react-router-dom";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productFetch } from "../../slices/productsSlice";

function Product() {
  const params = useParams();
  const dispatch = useDispatch();
  //const product = useSelector((state) => state.product.items);
  //console.log(product);

  useEffect(() => {
    dispatch(productFetch(params));
  }, [dispatch, params]);
  return <>Product page</>;
}

export default Product;
