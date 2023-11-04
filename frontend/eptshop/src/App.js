import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import SignUp from "./pages/Signup/Signup";

import { Container } from "react-bootstrap";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";

function App() {
  return (
    <>
      <Container className="mb-4">
        <BrowserRouter>
          <ShoppingCart />
          <NavBar />
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/cart" Component={Cart}></Route>
            <Route path="/product/:id" Component={Product}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/signup" Component={SignUp}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
