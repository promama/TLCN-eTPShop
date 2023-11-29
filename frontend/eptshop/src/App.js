import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import MyProduct from "./pages/MyProduct/MyProduct";
import SignUp from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

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
            <Route path="/product/:id" Component={MyProduct}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/signup" Component={SignUp}></Route>
            <Route path="/profile" Component={Profile}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
