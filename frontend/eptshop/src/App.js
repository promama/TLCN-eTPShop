import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/cart" Component={Cart}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
