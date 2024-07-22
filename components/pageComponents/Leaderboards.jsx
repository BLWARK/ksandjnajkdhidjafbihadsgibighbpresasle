"use client"
import React from "react";
import Dataleaderboards from "../constant/Dataleaderboard";

const Leaderboards = () => {

  return (
    <div className="top-leaderboards 2xl:w-[700px] w-full flex justify-center items-start 2xl:mt-10 mt-5 ">
      <div className="wrapper-buy-coin 2xl:w-[1430px] 2xl:h-[1050px] w-[380px] h-[750px] bg-blue-950 rounded-2xl ">
        <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
          <span className="w-full text-gray-200 font-bold text-[24px] text-center">
            Top Leaderboards
          </span>
          <div className="line w-full h-[1px] bg-slate-700 mt-10"></div>
          <Dataleaderboards />
          
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
