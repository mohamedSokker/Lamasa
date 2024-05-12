import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import profile from "./assets/profile.jpg";
import test from "./assets/test.jpg";
import test1 from "./assets/test1.jpg";
import test2 from "./assets/test2.jpeg";
import test3 from "./assets/test3.jpg";
import test4 from "./assets/test4.jpg";

import RequiredAuth from "./hooks/useAuth";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/View/Cart";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Login/Login";
import PersistLogin from "./components/PresistLogin/PresistLogin";
import Register from "./Pages/Register/View/Register";
import Recover from "./Pages/Recover/Recover";
import Account from "./Pages/Account/View/Account";
import AddProduct from "./Pages/AddProduct/View/AddProduct";
import Product from "./Pages/Product/View/Product";
import Checkout from "./Pages/Checkout/View/Checkout";
import PreCheckOut from "./Pages/PreCheckOut/View/PreCheckOut";

const data = [
  {
    id: 1,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Wear`,
    price: 130,
  },
  {
    id: 2,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Sport wear for summer in beach for men`,
    price: 100,
  },
  {
    id: 3,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Sport wear for summer in beach for women`,
    price: 100,
  },
  {
    id: 4,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Sport wear for summer in beach for women`,
    price: 100,
  },
  {
    id: 5,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Sport wear for summer in beach for women`,
    price: 100,
  },
  {
    id: 6,
    img: [profile, test, test1, test2, test3, test4],
    desc: `Sport wear for summer in beach for women`,
    price: 100,
  },
];

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PersistLogin />}>
        <Route path="/payment" element={<Checkout />} />
        <Route path="/checkout" element={<PreCheckOut />} />
        <Route element={<RequiredAuth allowedRole={"*"} />}>
          <Route path="/" element={<Home data={data} />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"cart"} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"ContactUs"} />}>
          <Route path="/contactus" element={<ContactUs />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Account"} />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"AddProduct"} />}>
          <Route path="/addProduct" element={<AddProduct />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Product"} />}>
          <Route path="/product/:id" element={<Product data={data} />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
