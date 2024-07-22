import React from 'react';
import CountUp from 'react-countup';

const BatchInfo = ({ key, totalUSDRaised, totalCoinsSold, batchCoinsSold, currentBatch, currentPrice, nextBatchPrice }) => {
  return (
    <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
      <span className="w-full text-gray-200 font-light text-[18px]">
        Current Batch:{" "}
        <span className="text-white font-bold text-[24px]">
          Batch {currentBatch}
        </span>
      </span>
      <div className="line w-full h-[1px] bg-slate-700 mt-10"></div>
      <div className="Total-information grid 2xl:grid-cols-2 grid-rows-1 justify-center items-center gap-10 my-10">
        <div className="totalUSD bg-[#1b457d] w-[290px] h-[100px] rounded-2xl flex flex-col justify-center items-center">
          <span className="text-gray-200 font-light text-[16px] flex-col flex ">
            Total USD Raised
          </span>
          <span className="text-gray-200 font-bold text-[24px]">
            <CountUp
              key={key}
              end={totalUSDRaised}
              duration={2.5}
              separator=","
              decimals={2}
              suffix=" USD"
            />
          </span>
        </div>
        <div className="totalUSD bg-[#1b457d] w-[290px] h-[100px] rounded-2xl flex flex-col justify-center items-center">
          <span className="text-gray-200 font-light text-[16px] flex-col flex ">
            Total Coins Sold
          </span>
          <span className="text-gray-200 font-bold text-[24px]">
            <CountUp
              key={key}
              end={totalCoinsSold + batchCoinsSold}
              duration={2.5}
              decimals={2}
              separator=","
            />
          </span>
        </div>
      </div>
      
      
      
    </div>
  );
};

export default BatchInfo;
