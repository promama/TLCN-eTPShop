import Link from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../../slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const dataFromBackEnd = useSelector((state) => state.product);
  console.log(dataFromBackEnd);
  dispatch(productsFetch());
  return <>home page</>;
};

export default Home;
