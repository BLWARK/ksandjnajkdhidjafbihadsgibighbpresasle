"use client"
import React from 'react'

const Recenttransaction = () => {
  return (
    <div className="recent-Transaction 2xl:w-[700px] w-full flex justify-start items-start ">
              <div className="wrapper-buy-coin 2xl:w-[1430px] 2xl:h-[350px] w-[380px] h-[350px] bg-blue-950 rounded-2xl">
                <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
                  <span className="w-full text-gray-200 font-bold text-[24px] text-center">
                    Your recent transactions
                  </span>
                  <div className="line w-full h-[1px] bg-slate-700 mt-10"></div>
                  <div className="wrap-list w-full p-5">
                    
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Recenttransaction