import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Product from "./components/Product/Product";
import SignUp from "./components/Signup/Signup";
import NavbarMui from "./components/NavBar/NavBarMui";

import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container className="mb-4">
        <BrowserRouter>
          <NavBar />
          {/* <NavbarMui></NavbarMui> */}
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
