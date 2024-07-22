"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ProgressBar from "../Progresbar/Progressbar";
import "../Progresbar/Progressbar.css";
import dataBatch from "../constant/Databatch";
import useBnbToUsdRate from "../../hooks/useBnbToUsdRate";
import InputForm from "../InputForm/InputForm";
import BuyButton from "../button/Buybutton";
import Popup from "../popup/Popup";
import OptionSelector from "../OptionSelector/Optionselector"; 
import KYCForm from "../KYC/Kycpopup"; // Tambahkan import KYCForm

const BatchSales = () => {
  const [totalCoinsSold, setTotalCoinsSold] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT"); // Default to USDT
  const [currentBatch, setCurrentBatch] = useState(0);
  const [batchValue, setBatchValue] = useState();
  const [nextPrice, setNextPrice] = useState();
  const [amountLeft, SetAmountLeft] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [stop, setStop] = useState(false);
  const [batches, setBatches] = useState([
    {
      id: null,
      batchNumber: null,
      priceBatch: null,
      totalBatch: null
    }
  ]);
  
  const [buyValue, setBuyValue] = useState("");
  const { bnbToUsdRate, isLoading } = useBnbToUsdRate();
  const [totalUsdtRaised, setTotalUsdtRaised] = useState(0); // State for total USDT raised

  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  
  // State tambahan untuk OptionSelector dan KYCForm
  const [selectedOption, setSelectedOption] = useState(1); 
  const [isKYCVisible, setIsKYCVisible] = useState(false); 
  const [isKYCCompleted, setIsKYCCompleted] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Pilih currency
  const handleCurrency = (event) => {
    setSelectedCurrency(event.currentTarget.getAttribute('data-currency'));
  };

  // Change input form
  const handleBuyForm = (e) => {
    e.preventDefault();
    if (selectedOption === 2 && !isKYCCompleted) {
      setWarningMessage("Please complete the KYC process first.");
      setIsWarningVisible(true);
      return;
    }

    let usdtToBuy = Number(buyValue);
    const currentPrice = dataBatch[currentBatch].priceBatch;
    const tokensLeft = dataBatch[currentBatch].totalBatch - tokenSold;

    // Batasi input hingga maksimal 400 USDT atau sesuai dengan sisa koin yang tersedia
    if (usdtToBuy > 400) {
      usdtToBuy = 400;
    }
    let tokensToBuy = usdtToBuy / currentPrice;
    if (tokensToBuy > tokensLeft) {
      usdtToBuy = tokensLeft * currentPrice;
      tokensToBuy = tokensLeft;
    }

    setTokenSold(tokenSold + tokensToBuy);
    setTotalCoinsSold(totalCoinsSold + tokensToBuy);
    setTotalUsdtRaised(totalUsdtRaised + usdtToBuy);
    setBuyValue(usdtToBuy.toFixed(18)); // Update input value sesuai dengan maksimal yang diizinkan
  };

  useEffect(() => {
    if (tokenSold === dataBatch[currentBatch].totalBatch) {
      if (currentBatch < dataBatch.length - 1) {
        setCurrentBatch(currentBatch + 1);
        setTokenSold(0);
      }
    }
  }, [tokenSold, currentBatch]);

  const tokensLeft = dataBatch[currentBatch].totalBatch - tokenSold;
  const totalTokensPerBatch = dataBatch[currentBatch].totalBatch;

  console.log(tokenSold);

  const handleInputChange = (e) => {
    let value = e.target.value;
    const currentPrice = dataBatch[currentBatch].priceBatch;
    const tokensLeft = dataBatch[currentBatch].totalBatch - tokenSold;
    const maxUsdtAllowed = tokensLeft * currentPrice;

    if (value === "") {
      setBuyValue("");
    } else if (Number(value) > 400) {
      setBuyValue((400).toFixed(18));
    } else if (Number(value) > maxUsdtAllowed) {
      setBuyValue(maxUsdtAllowed.toFixed(18));
    } else {
      setBuyValue(value);
    }
  };

  useEffect(() => {
    const progressPercentage = (tokenSold / totalTokensPerBatch) * 100;
    setProgress(progressPercentage);
    setRemaining((totalTokensPerBatch - tokenSold).toFixed(18));
  }, [tokenSold, totalTokensPerBatch]);

  useEffect(() => {
    if (currentBatch < dataBatch.length - 1) {
      setNextPrice(dataBatch[currentBatch + 1].priceBatch);
    }
  }, [currentBatch]);

  // Logika untuk mengelola pilihan opsi dan KYC
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 2 && !isKYCCompleted) {
      setIsKYCVisible(true);
    }
  };

  const handleKYCComplete = () => {
    setIsKYCCompleted(true);
    setIsSuccessVisible(true);
    setIsKYCVisible(false);
    setSelectedOption(2);
  };

  const handleKYCClose = () => {
    setIsKYCVisible(false);
    setSelectedOption(1); 
  };

  const getPlaceholderText = () => {
    return selectedCurrency === "USDT" ? "Enter USDT Amount" : `Enter USDT Amount (~${(1 / bnbToUsdRate).toFixed(18)} BNB)`;
  };

  return (
    <div className="buy-coin-presale 2xl:w-[700px] w-full 2xl:flex flex-row 2xl:justify-start 2xl:items-start justify-center items-center flex mt-10">
      <div className="wrapper-buy-coin 2xl:w-[1430px] 2xl:h-[1050px] w-[380px] h-[1170px] bg-blue-950 rounded-2xl">
        <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
          <div className="w-full flex flex-col justify-center items-center text-gray-200 font-light text-[18px]">
            Current Batch :{" "}
            <span className="text-white font-bold text-[24px]">
              Batch {currentBatch + 1}
            </span>
          </div>
          <div className="line w-full h-[1px] bg-slate-700 mt-10"></div>
          <div className="Total-information grid 2xl:grid-cols-2 grid-rows-1 justify-center items-center gap-10 mt-10">
            <div className="totalUSD bg-[#1b457d] w-[290px] h-[100px] rounded-2xl flex flex-col justify-center items-center">
              <span className="text-gray-200 font-light text-[16px] flex-col flex ">
                Total USD Raised
              </span>
              <span className="text-gray-200 font-bold text-[24px]">
                <CountUp
                  key={totalUsdtRaised} // Key to force re-render on update
                  end={totalUsdtRaised}
                  duration={2.5}
                  separator=","
                  decimals={2}
                  suffix=" USDT"
                />
              </span>
            </div>
            <div className="totalUSD bg-[#1b457d] w-[290px] h-[100px] rounded-2xl flex flex-col justify-center items-center">
              <span className="text-gray-200 font-light text-[16px] flex-col flex ">
                Total Coins Sold
              </span>
              <span className="text-gray-200 font-bold text-[24px]">
                <CountUp
                  key={totalCoinsSold} // Key to force re-render on update
                  end={totalCoinsSold}
                  duration={2.5}
                  decimals={2}
                  separator=","
                />
              </span>
            </div>
          </div>
          <div className="progress-bar w-[90%] mt-10">
            <ProgressBar progress={progress} remaining={remaining} />
          </div>
          <div className="wrap-price w-[85%] flex justify-between items-center mt-5">
            <div className="wrap-price-left flex flex-col justify-start items-start text-left">
              <span className="text-gray-200 font-light text-[12px]">
                {" "}
                Current Price
              </span>
              <span className="text-gray-200 font-bold text-[12px]">
                1 XZYMER = {dataBatch[currentBatch].priceBatch.toFixed(8)} USDT
              </span>
            </div>
            {currentBatch !== 24 && (
              <div className="wrap-price-left flex flex-col justify-start items-end">
                <span className="text-gray-200 font-light text-[12px]">
                  {" "}
                  Next Batch
                </span>
                <span className="text-gray-200 font-bold text-[12px]">
                  {" "}
                  {nextPrice ? nextPrice.toFixed(8) : 'N/A'} USDT
                </span>
              </div>
            )}
          </div>
          <div className="line w-full h-[1px] bg-slate-700 mt-10"></div>
          <div className="wrap-buy flex flex-col justify-center items-center mt-5">
            <div className="wrap-buy-content flex justify-center items-center">
              <div className="conntent 2xl:w-[620px] 2xl:h-[500px] w-[360px] h-[470px] bg-[#1b457d] mt-5 rounded-2xl">
                <div className="wrap-title-buy flex flex-col justify-start items-start 2xl:px-10 px-5 mt-6">
                  <span className="text-gray-200 font-bold text-[24px]">
                    Buy XZYMER
                  </span>

                  <OptionSelector 
                    selectedOption={selectedOption}
                    handleOptionSelect={handleOptionSelect}
                    selectedCurrency={selectedCurrency}
                    handleCurrencySelect={handleCurrency}
                  />
                  
                  {selectedOption === 1 && (
                    <div className="option-1 mt-2 flex flex-col gap-5">
                      <InputForm
                        placeholder={getPlaceholderText()}
                        value={buyValue}
                        onChange={handleInputChange}
                        currency={selectedCurrency}
                        src={
                          selectedCurrency === "USDT" 
                          ? <Image src="/usdt.png" alt="USDT Icon" width={20} height={20} />
                          : <Image src="/BNB.png" alt="BNB Icon" width={20} height={20} />
                        }
                      />
                      <span className="text-gray-200 font-light text-[12px] mt-2">
                        You will receive: {Number(buyValue / dataBatch[currentBatch].priceBatch).toFixed(18)} XYZMER
                      </span>
                      <BuyButton
                        onClick={handleBuyForm}
                        label="Buy Now"
                      />
                    </div>
                  )}

                  {selectedOption === 2 && !isKYCCompleted && (
                    <div className="option-2 mt-5 flex flex-col gap-5">
                      <KYCForm
                        onComplete={handleKYCComplete}
                        onClose={handleKYCClose}
                      />
                    </div>
                  )}

                  {selectedOption === 2 && isKYCCompleted && (
                    <div className="option-2 mt-5 flex flex-col gap-5">
                      <InputForm
                        placeholder={getPlaceholderText()}
                        value={buyValue}
                        onChange={handleInputChange}
                        currency={selectedCurrency}
                        src={
                          selectedCurrency === "USDT" 
                          ? <Image src="/usdt.png" alt="USDT Icon" width={20} height={20} />
                          : <Image src="/BNB.png" alt="BNB Icon" width={20} height={20} />
                        }
                      />
                      <span className="text-gray-200 font-light text-[12px] mt-2">
                        You will receive: {Number(buyValue / dataBatch[currentBatch].priceBatch).toFixed(18)} XYZMER
                      </span>
                      <BuyButton
                        onClick={handleBuyForm}
                        label="Buy Now"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
        title="KYC Completed"
        message="Thank you for completing the KYC form. Our team will validate it within 1x24 hours."
        icon={{ color: "text-green-500", path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /> }}
      />
      <Popup
        isVisible={isWarningVisible}
        onClose={() => setIsWarningVisible(false)}
        title="Warning"
        message={warningMessage}
        icon={{ color: "text-red-500", path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 0 0118 0z" /> }}
      />
    </div>
  );
};

export default BatchSales;
