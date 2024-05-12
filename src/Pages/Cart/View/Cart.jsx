import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

import "../../CartCard/Style/style.css";

import { useMainContext } from "../../../contexts/MainContext";
import { setItemStorage } from "../../../Services/LocalStorage/setItemStorage";

const Cart = () => {
  const { products, setProducts } = useMainContext();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [productQ, setProductQ] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let prices = 0;
    let q = 0;
    products.map((item) => {
      prices += Number(item.price) * item.quantity;
      q += item.quantity;
    });
    setTotalPrice(prices);
    setProductQ(q);
  }, [products]);

  const handleQuantityChange = async (e, id) => {
    setIsLoading(true);
    let result = [];
    products.map((item) => {
      if (item.id === id) {
        result = [...result, { ...item, quantity: e.target.value }];
      } else {
        result = [...result, { ...item }];
      }
    });
    setItemStorage(result);
    setProducts(result);
    setIsLoading(false);
  };

  const handleCancel = async (id) => {
    setIsLoading(true);
    let result = [];
    products.map((item) => {
      if (item.id === id) {
        result = [...result];
      } else {
        result = [...result, { ...item }];
      }
    });
    setItemStorage(result);
    setProducts(result);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-[10px] bg-white z-[3]  md:pb-4 pb-[100px] overflow-y-scroll hideScroll">
      {isLoading && (
        <div
          className="absolute  w-full h-full flex flex-col items-center justify-center left-0 top-0 z-[1000]"
          style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        ></div>
      )}
      <div className="w-full flex flex-row gap-3 text-[14px] px-8">
        <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Cart`}</p>
      </div>
      <div className="w-full py-8 p-8 flex flex-row justify-between relative top-0 z-[1] border-b-[1px] border-gray-200">
        <div className="text-[14px]">
          <p>
            {products?.length === 0
              ? `Your cart is currently empty.`
              : `${productQ} products in your cart`}
          </p>
        </div>
      </div>
      {products?.length === 0 ? (
        <Link
          to={`/`}
          className="bg-black w-full flex justify-center items-center p-4 text-white font-[600] hover:bg-red-600"
          style={{ transition: "all 0.2s ease-in-out" }}
          onClick={() => setIsCart(false)}
        >
          Continue browsing
        </Link>
      ) : (
        <div
          className="w-full h-full p-8 flex flex-col gap-4 overflow-y-scroll hideScroll"
          // style={{ scrollbarWidth: "none" }}
        >
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-row w-full py-8 gap-4 justify-between border-b-[1px] border-gray-200 pt-4"
            >
              <img src={item.img[0]} className="h-[140px]" />
              <div className="flex flex-col justify-center">
                <p className="text-[12px]">{item.desc}</p>
                <p className="text-[12px]">{`$${item.price}`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                  className="w-[35px] h-[35px] flex  flex-row justify-center text-center text-[12px] px-1 outline-none border-[1px] border-gray-300"
                />
                <RxCross2
                  className="flex  font-[900] text-[20px] hover:cursor-pointer hover:text-red-600"
                  onClick={() => handleCancel(item.id)}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-row w-full">
            <textarea
              className="w-full outline-none border-[1px] border-gray-300 shadow-lg text-[12px] pl-4 p-1 h-[100px]"
              placeholder="Special instruction for seller"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col md:gap-[20px] gap-1 w-full">
              <div className="flex flex-row w-full">
                <p className="w-full text-[18px] font-[700]">{`Total: $${totalPrice}`}</p>
              </div>
              <div className="flex flex-row w-full ">
                <p className="text-[12px]">{`Shipping & taxes are calculated at checkout.`}</p>
              </div>
            </div>
            <div className="flex flex-row w-full gap-4 justify-end">
              <button
                className="flex flex-row items-center justify-center p-4 md:px-[80px] px-[20px] text-white bg-black hover:bg-red-600"
                style={{ transition: "all 0.2s ease-in-out" }}
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      data: products,
                    },
                  })
                }
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
