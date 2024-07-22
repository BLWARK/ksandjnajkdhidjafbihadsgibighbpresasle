import React from 'react'
import Recenttransaction from '../../../components/pageComponents/Recenttransaction'



const page = () => {
  return (
    <div className="container content w-full  gap-8 mt-10 2xl:ml-[360px] ">
        <div className="wrap-contain grid 2xl:grid-cols-2 grid-rows-1 gap-10 px-5 ">
      <div className="recent-Transaction   w-full flex justify-center items-center ">
        <div className="wrapper-buy-coin   rounded-2xl">
        <div className="wrapper-buy-coin 2xl:w-[700px] 2xl:h-[830px] w-[370px] h-[750px] bg-blue-950 rounded-2xl">
          <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
            <span className="w-full text-gray-200 font-bold text-[24px] text-center p-10">
              My recent transactions
            </span>
            <div className="line w-full h-[1px] bg-slate-700 "></div>
            
          </div>
        </div>
        </div>
      </div>
      <div className="recent-Transaction  w-full flex justify-center items-center ">
        <div className="wrapper-buy-coin rounded-2xl">
        <div className="wrapper-buy-coin 2xl:w-[700px] 2xl:h-[830px] w-[370px] h-[750px] bg-blue-950 rounded-2xl">
          <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
            <span className="w-full text-gray-200 font-bold text-[24px] text-center p-10">
              Live Transactions
            </span>
            <div className="line w-full h-[1px] bg-slate-700 "></div>
            
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default page