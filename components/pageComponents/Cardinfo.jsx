"use client"
import React, { useState, useEffect } from 'react'
import { LuWallet2 } from "react-icons/lu";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { BsPersonAdd } from "react-icons/bs";
import CountUp from "react-countup";

const Cardinfo = () => {

    const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1); 
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);
  return (
    <div className="card-info-wrapper  w-full flex flex-col justify-center items-center mt-10">
            <div className="card-info grid 2xl:grid-cols-3 grid-row-1 justify-center items-center gap-10">
              <div className="card1 rounded-2xl 2xl:w-[450px] 2xl:h-[150px] w-[360px] h-[120px] flex justify-start items-center gap-5 px-10 bg-gradient-to-t from-orange-600 to-orange-400">
                <div className="icon">
                  <LuWallet2 className="w-[60px] h-auto text-gray-200" />
                </div>
                <div className="wrap-text flex flex-col justify-center items-start text-left">
                  <p className="text-gray-200 font-medium 2xl:text-[18px] text-[14px]">
                    Your Total Balance
                  </p>
                  <p className="text-gray-200 font-bold text-[24px]">
                    <CountUp
                      key={key}
                      end={231991}
                      duration={2.5}
                      separator=","
                    />
                  </p>
                </div>
              </div>
              <div className="card2 rounded-2xl 2xl:w-[450px] 2xl:h-[150px] w-[360px] h-[120px] flex justify-start items-center gap-5 px-10 bg-gradient-to-t from-green-600 to-green-400">
                <div className="icon">
                  <HiOutlineCurrencyDollar className="w-[65px] h-auto text-gray-200" />
                </div>
                <div className="wrap-text flex flex-col justify-center items-start text-left">
                  <p className="text-gray-200 font-medium 2xl:text-[18px] text-[14px]">
                    Your Coin Worth at Launch
                  </p>
                  <p className="text-gray-200 font-bold text-[24px]">
                    <CountUp
                      key={key}
                      end={231991}
                      duration={2.5}
                      separator=","
                    />
                  </p>
                </div>
              </div>
              <div className="card3  rounded-2xl 2xl:w-[450px] 2xl:h-[150px] w-[360px] h-[120px] flex justify-start items-center gap-5 px-10 bg-gradient-to-t from-blue-600 to-blue-400">
                <div className="icon">
                  <BsPersonAdd className="w-[60px] h-auto text-gray-200" />
                </div>
                <div className="wrap-text flex flex-col justify-center items-start text-left">
                  <p className="text-gray-200 font-medium 2xl:text-[18px] text-[14px]">
                    Referral Earnings
                  </p>
                  <p className="text-gray-200 font-bold text-[24px]">
                    <CountUp
                      key={key}
                      end={231991}
                      duration={2.5}
                      separator=","
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Cardinfo