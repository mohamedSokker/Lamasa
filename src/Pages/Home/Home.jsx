import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div className="h-full flex-1 flex flex-col p-4 justify-start items-start gap-8 overflow-y-scroll px-8">
      <div className="py-10 px-10 h-full flex-1 flex flex-col justify-start items-start gap-8">
        <div className="flex flex-row justify-between items-center">
          <p className="text-[26px] font-[500]">Featured collection</p>
        </div>
        <div className="flex flex-row flex-wrap justify-start items-start w-full gap-8 pb-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center"
            >
              <img className="w-[200px] h-[240px]" src={item.img[0]} />
              <Link
                to={`/product/${item.id}`}
                className="font-bold max-w-[200px]"
              >
                {item.desc}
              </Link>
              <p>{`$${item.price}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
