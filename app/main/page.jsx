"use client";
import React, { useState, useEffect } from "react";
import CardInfo from "@/components/pageComponents/Cardinfo";
import BatchSales from "@/components/pageComponents/BatchSales";
import Leaderboards from "@/components/pageComponents/Leaderboards";
import Recenttransaction from "@/components/pageComponents/Recenttransaction";
import Referral from "@/components/pageComponents/Referral";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const page = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleAgreeTerms = () => {
    setIsPopupVisible(false);
  };

  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);
  return (
    <div className="dashboard-sec 2xl:ml-[360px] content 2xl:w-full w-[390px] 2xl:flex flex flex-row justify-center items-center overflow-y-hidden overflow-x-hidden text-black ">
      <div className="wrapdasboard w-full flex justify-center items-center">
        <div className="wrapper w-full flex flex-col justify-center items-center">
          <Image
            className=" w-full"
            src="/Welcome.gif"
            alt="XYZMER Coin"
            width={150}
            height={150}
          />
          <CardInfo />
          <div className="wrapper-content-all grid 2xl:grid-cols-2 grid-rows-1 justify-center items-center gap-8 mb-10">
            {/* <PageBatch /> */}
            <BatchSales/>
            <Leaderboards />
            <Recenttransaction />
            <Referral />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 2xl:mt-10 mt-16 rounded-lg shadow-lg text-left 2xl:max-w-md max-w-sm mx-2  w-full popup">
            <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
            <div className="mb-4 text-left">
              <p className="font-bold">1. Acknowledgment of Risk</p>
              <p className="mb-4 font-light text-sm ">
                By purchasing cryptocurrencies, you acknowledge that such
                transactions involve high volatility and the potential for
                significant losses. Cryptoassets can experience rapid changes in
                value, and you should be prepared to lose all the money you
                invest.
              </p>
              <p className="font-bold">2. Conducting Due Diligence</p>
              <p className="mb-4 font-light text-sm">
                You confirm that you have conducted thorough research on the
                XYZMER coin and are aware of its current valuation.
              </p>
              <p className="font-bold">3. Pledge Redemption</p>
              <p className="mb-4 font-light text-sm">
                You confirm that you are aware that your pledge may be fully
                redeemed to purchase XYZMER coin.
              </p>
              <p className="font-bold">
                4. Responsibility for Purchase Decision
              </p>
              <p className="mb-4 font-light text-sm">
                You confirm that you fully understand that you are solely
                responsible for your coin purchase decision. XYZMER coin is not
                liable for any potential losses resulting from your investment.
              </p>
              <p className="font-bold text-red-500 text-sm">
                By agreeing to these terms and conditions, you acknowledge that
                you have read, understood, and accepted the above statements.
              </p>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-gray-700">
                  I Agree to the terms and conditions
                </span>
              </label>
            </div>
            <button
              onClick={handleAgreeTerms}
              className={`mt-4 px-4 py-2 rounded-full text-white ${
                isChecked
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isChecked}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
