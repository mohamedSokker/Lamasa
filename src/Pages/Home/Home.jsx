import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../CartCard/Style/style.css";
import { useMainContext } from "../../contexts/MainContext";

const Home = ({ data }) => {
  const { screenSize } = useMainContext();
  return (
    <div className="h-full w-full flex flex-col px-2 p-4 justify-start items-start gap-8 overflow-y-scroll hideScroll ">
      <div className="md:py-10 md:px-10 h-full flex-1 flex flex-col justify-start items-start gap-8">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="md:text-[26px] text-[22px] font-[500] w-full">
            Featured collection
          </p>
        </div>
        <div className="w-full flex justify-center items-center m-auto">
          <div className="flex mx-auto md:flex-row md:flex-wrap flex-col justify-center items-start gap-8 md:pb-4 pb-[100px]">
            {data.map((item, index) => (
              <Link
                to={`/product/${item.id}`}
                key={index}
                className="flex flex-col gap-4 items-start justify-center"
              >
                <img
                  className="md:w-[200px] flex-grow-[1] w-screen md:h-[240px] h-[80%]"
                  src={item.img[0]}
                />
                <div className="font-bold max-w-[200px]">{item.desc}</div>
                <p>{`$${item.price}`}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
