import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";

import "../Styles/style.css";
import { useMainContext } from "../../../contexts/MainContext";

const Product = ({ data }) => {
  const { id } = useParams();

  const { products, setProducts } = useMainContext();

  const [targetData, setTargetData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRightArrowActive, setIsRightArrowActive] = useState(true);
  const [isLeftArrowActive, setIsLeftArrowActive] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [minCol, setMinCol] = useState("rgb(156,163,175)");

  useEffect(() => {
    console.log(id, data);
    if (id && data) {
      const target = data.find((item) => Number(item.id) === Number(id));
      console.log(target);
      setTargetData(target);
    }

    if (currentIndex === data.length - 1) {
      setIsRightArrowActive(false);
    } else {
      setIsRightArrowActive(true);
    }
    if (currentIndex === 0) {
      setIsLeftArrowActive(false);
    } else {
      setIsLeftArrowActive(true);
    }
  }, [id, data, currentIndex]);

  useEffect(() => {
    if (quantity === 1) setMinCol("rgb(156,163,175)");
  }, [quantity]);

  const handleRightArrow = () => {
    if (currentIndex === data.length - 1) {
      setIsRightArrowActive(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLeftArrow = () => {
    if (currentIndex === 0) {
      setIsLeftArrowActive(false);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-1 flex-row justify-between h-full p-2 gap-4 px-8 overflow-y-scroll relative z-[1]">
      <div className="flex flex-col gap-8 items-start justify-start w-[500px] py-10 px-10">
        <div className="flex flex-row gap-3 text-[14px] justify-start">
          <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
          <p className="text-gray-500">{`/`}</p>
          <p className="text-gray-500">{`${targetData?.desc}`}</p>
        </div>
        <div className="text-[14px]">Lamasa</div>
        <div className="flex justify-center items-center text-[22px] font-[700]">
          <p>{targetData?.desc}</p>
        </div>
        <div className="flex justify-center items-center text-[18px]">
          <p>{`$${targetData?.price}`}</p>
        </div>
        <div className="flex flex-col justify-center items-start gap-4 w-full">
          <div className="flex flex-col justify-center items-start gap-0 w-full">
            <p>Size</p>
            <div className="bg-white flex flex-row relative border-[1px] border-gray-300  w-full focus:shadow-md">
              <select className="w-full h-full p-4 px-6 bg-white appearance-none">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
              <div className="h-full flex justify-center items-center absolute top-0 right-[10px]">
                <IoIosArrowDown />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-0 w-full">
            <p>Color</p>
            <div className="bg-white flex flex-row relative border-[1px] border-gray-300  w-full focus:shadow-md">
              <select className="w-full h-full p-4 px-6 bg-white appearance-none">
                <option>Black</option>
                <option>Orange</option>
              </select>
              <div className="h-full flex justify-center items-center absolute top-0 right-[10px]">
                <IoIosArrowDown />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row gap-4 items-center">
            <div className="w-[80px] h-full border-[1px] p-4 justify-center items-center border-gray-300 focus:shadow-md flex flex-row">
              <button
                onMouseEnter={() => {
                  quantity === 1
                    ? setMinCol("rgb(156,163,175)")
                    : setMinCol("black");
                }}
                onMouseLeave={() => setMinCol("rgb(156,163,175)")}
                style={{ color: minCol }}
                disabled={quantity === 1 ? true : false}
                className="flex justify-center items-center text-gray-400"
                onClick={() => {
                  if (quantity === 1) return;
                  setQuantity((prev) => prev - 1);
                }}
              >
                <FaMinus />
              </button>
              <div>
                <input
                  className="w-[30px] text-center outline-none"
                  type="text"
                  value={quantity}
                  disabled
                />
              </div>
              <button
                className="hover:text-black flex justify-center items-center text-gray-400"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <FaPlus />
              </button>
            </div>
            <button
              className="flex flex-1 justify-center items-center p-4 bg-black text-white hover:bg-red-600"
              style={{ transition: "all 0.2s ease-in-out" }}
              onClick={() => {
                const target = data.find(
                  (item) => Number(item.id) === Number(id)
                );
                const productTarget = products.find(
                  (item) => Number(item.id) === Number(id)
                );
                if (!productTarget) setProducts((prev) => [...prev, target]);
              }}
            >
              Add Cart
            </button>
          </div>

          <div className="w-full flex flex-row gap-4 items-center p-4">
            <button className="flex flex-1 justify-center items-center p-4 border-[2px] border-black hover:text-red-600 hover:border-red-600">
              Buy it now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-end relative z-[1] p-4 gap-4">
        <div className="w-full h-[480px] overflow-hidden flex flex-row">
          {data?.map((item, index) => (
            <img
              key={index}
              src={item.img[index]}
              className="w-full h-full flex-grow-0 flex-shrink-0 block"
              style={{
                translate: `${-100 * currentIndex}%`,
                transition: "all 0.3s ease-in-out",
              }}
            />
          ))}
        </div>

        <div
          className="absolute -right-[30px] top-[240px] z-[2] hover:cursor-pointer bg-gray-50 p-4"
          onClick={handleRightArrow}
        >
          <FaArrowRight
            size={14}
            style={{ color: isRightArrowActive ? "black" : "rgb(156,163,175)" }}
          />
        </div>
        <div
          className="absolute -left-[30px] top-[240px] z-[2] hover:cursor-pointer bg-gray-50 p-4"
          onClick={handleLeftArrow}
        >
          <FaArrowLeft
            size={14}
            style={{ color: isLeftArrowActive ? "black" : "rgb(156,163,175)" }}
          />
        </div>
        <div className="w-full flex flex-row justify-center absolute bottom-[70px]">
          <div className="rounded-full flex flex-row bg-gray-300 px-3 p-2 gap-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white hover:cursor-pointer hover:scale-[1.2]"
                style={{
                  transition: "scale 0.1 ease-in-out",
                  backgroundColor: currentIndex === index ? "white" : "black",
                }}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
