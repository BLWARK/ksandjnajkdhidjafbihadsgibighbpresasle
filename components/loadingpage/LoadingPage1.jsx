import React from "react";
import LoadingSpinner from "../loadingspiner/LoadingSpinner";

const LoadingPage1 = () => {
  return (
    <div className="fixed w-1/4 h-screen flex items-center justify-center bg-black translate-y-[500px] translate-x-[200px] ">
      <div className=" 2xl:max-w-xl max-w-sm rounded-lg shadow-lg text-center p-10">
        <div className="wraptitle text-white flex flex-col justify-center items-center">
          <LoadingSpinner/>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage1;
