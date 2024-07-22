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
import KYCForm from "../KYC/Kycpopup"; 
import LoadingSpinner from "@/components/loadingspiner/LoadingSpinner"; 

// Komponen LoadingPage untuk tampilan loading
const LoadingPage = () => (
  <div className="flex justify-center items-center min-h-screen">
    <LoadingSpinner />
  </div>
);

const BatchSales = () => {
  const [isPageLoading, setIsPageLoading] = useState(true); // State untuk mengelola status loading halaman
  const [totalCoinsSold, setTotalCoinsSold] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT"); 
  const [currentBatch, setCurrentBatch] = useState(0);
  const [batchValue, setBatchValue] = useState();
  const [nextPrice, setNextPrice] = useState();
  const [amountLeft, setAmountLeft] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [stop, setStop] = useState(false);
  const [batches, setBatches] = useState([
    {
      id: null,
      batchNumber: null,
      priceBatch: null,
      totalBatch: null,
    },
  ]);

  const [buyValue, setBuyValue] = useState("");
  const { bnbToUsdRate, isLoading: isRateLoading } = useBnbToUsdRate();
  const [totalUsdtRaised, setTotalUsdtRaised] = useState(0); // State for total USDT raised

  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // Additional states for KYC and purchase notifications
  const [selectedOption, setSelectedOption] = useState(1);
  const [isKYCVisible, setIsKYCVisible] = useState(false);
  const [isKYCCompleted, setIsKYCCompleted] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isPurchaseSuccessVisible, setIsPurchaseSuccessVisible] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // Select Currency
  const handleCurrency = (currency) => {
    setSelectedCurrency(currency);
    setBuyValue(""); // Reset value amount if user buy
  };

  // Change input form
  const handleBuyForm = async (e) => {
    e.preventDefault();
    if (selectedOption === 2 && !isKYCCompleted) {
      setWarningMessage("Please complete the KYC process first.");
      setIsWarningVisible(true);
      return;
    }

    if (buyValue === "" || Number(buyValue) <= 0) {
      setWarningMessage("Please enter a valid amount.");
      setIsWarningVisible(true);
      return;
    }

    setIsLoading(true); // Activated loading

    let usdtToBuy = Number(buyValue);
    if (selectedCurrency === "BNB") {
      usdtToBuy = Number(buyValue) * bnbToUsdRate;
    }
    const currentPrice = dataBatch[currentBatch].priceBatch;
    const tokensLeft = dataBatch[currentBatch].totalBatch - tokenSold;

    // Limit the input to a maximum of 400 USDT if option 1 is chosen or according to the remaining available coins if option 2 is chosen.
    const maxUsdtAllowed = tokensLeft * currentPrice;
    if (selectedOption === 1 && usdtToBuy > 400) {
      usdtToBuy = 400;
    }
    if (usdtToBuy > maxUsdtAllowed) {
      usdtToBuy = maxUsdtAllowed;
    }
    let tokensToBuy = usdtToBuy / currentPrice;

    setPurchaseAmount(Number(buyValue)); // Set purchase amount for notification in the selected currency

    // Buy delay simulation
    setTimeout(() => {
      // Display a successful purchase notification.
      setIsPurchaseSuccessVisible(true);
      setIsLoading(false); // turn off loading

      // Update the state after a successful purchase.
      setTokenSold((prevTokenSold) => prevTokenSold + tokensToBuy);
      setTotalCoinsSold((prevTotalCoinsSold) => prevTotalCoinsSold + tokensToBuy);
      setTotalUsdtRaised((prevTotalUsdtRaised) => prevTotalUsdtRaised + usdtToBuy);
      setBuyValue(""); // Clear input value after successful purchase
    }, 2000);
  };

  useEffect(() => {
    setIsPageLoading(false); // Set page loading to false after content is loaded
  }, []);

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

  const handleInputChange = (e) => {
    let value = e.target.value;
    let usdtValue = parseFloat(value);

    if (selectedCurrency === "BNB") {
      usdtValue = parseFloat(value) * bnbToUsdRate;
    }

    const currentPrice = dataBatch[currentBatch].priceBatch;
    const maxUsdtAllowed = tokensLeft * currentPrice;

    if (usdtValue === "" || isNaN(usdtValue) || usdtValue <= 0) {
      setBuyValue("");
    } else if (selectedOption === 1 && usdtValue > 400 && maxUsdtAllowed >= 400) {
      setBuyValue((400 / (selectedCurrency === "BNB" ? bnbToUsdRate : 1)).toFixed(18));
    } else if (usdtValue > maxUsdtAllowed) {
      setBuyValue((maxUsdtAllowed / (selectedCurrency === "BNB" ? bnbToUsdRate : 1)).toFixed(18));
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

  // Logic for managing options and KYC
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
    if (selectedOption === 1) {
      return selectedCurrency === "USDT" 
        ? "Enter USDT Amount (0-400 USDT)" 
        : `Enter BNB Amount (0-${(400 / bnbToUsdRate).toFixed(6)} BNB)`;
    } else {
      return selectedCurrency === "USDT" ? "Enter USDT Amount" : `Enter BNB Amount`;
    }
  };

  const getConvertedValue = () => {
    if (selectedCurrency === "BNB" && buyValue) {
      return (buyValue * bnbToUsdRate).toFixed(18);
    }
    return buyValue;
  };

  const handleBNBConversion = (value) => {
    return (value * bnbToUsdRate).toFixed(18);
  };

  const getCoinsReceived = () => {
    if (selectedCurrency === "BNB") {
      return Number(handleBNBConversion(buyValue) / dataBatch[currentBatch].priceBatch).toFixed(18);
    }
    return Number(buyValue / dataBatch[currentBatch].priceBatch).toFixed(18);
  };

  // useEffect to set the maximum input limit according to the remaining coins
  useEffect(() => {
    const currentPrice = dataBatch[currentBatch].priceBatch;
    const maxUsdtAllowed = tokensLeft * currentPrice;
    const maxInputValue = (maxUsdtAllowed / (selectedCurrency === "BNB" ? bnbToUsdRate : 1)).toFixed(18);
    if (buyValue !== "" && Number(buyValue) > Number(maxInputValue)) {
      setBuyValue(maxInputValue);
    }
  }, [tokensLeft, selectedCurrency, bnbToUsdRate]);

  if (isPageLoading) {
    return <LoadingPage />;
  }

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

                  {/* Option Buy  */}
                  <div className="flex gap-3 mt-10">
                    <button
                      onClick={() => handleOptionSelect(1)}
                      className={`py-4 px-5 text-white font-bold rounded-lg ${selectedOption === 1 ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      Option Buy 1
                    </button>
                    <button
                      onClick={() => handleOptionSelect(2)}
                      className={`py-4 px-5 text-white font-bold rounded-lg ${selectedOption === 2 ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      Option Buy 2
                    </button>
                  </div>

                  {/* Select Currency */}
                  <div className="buttons flex gap-3 mt-10">
                    <button
                      data-currency="USDT"
                      onClick={() => handleCurrency("USDT")}
                      className={`py-3 px-4 text-white font-bold rounded-lg flex justify-center items-center gap-1 ${selectedCurrency === "USDT" ? 'bg-blue-500' : 'bg-gray-500'}`}
                    ><Image
                   
                    src="/USDT.png"
                    alt="USDT"
                    width={30}
                    height={30}
                  />
                      USDT
                    </button>
                    <button
                      data-currency="BNB"
                      onClick={() => handleCurrency("BNB")}
                      className={`py-3 px-6 text-white font-bold rounded-lg flex justify-center items-center gap-1 ${selectedCurrency === "BNB" ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <Image
                   
                   src="/bnb.png"
                   alt="BNB"
                   width={30}
                   height={30}
                 />
                      BNB
                    </button>
                  </div>

                  {selectedOption === 1 && (
                    <div className="option-1 mt-4 flex flex-col gap-2">
                      <InputForm
                        placeholder={getPlaceholderText()}
                        value={buyValue}
                        onChange={handleInputChange}
                        currency={selectedCurrency}
                      />
                      <span className="text-gray-200 font-light text-[12px] ">
                        You will receive: {getCoinsReceived()} XYZMER
                      </span>
                      <div className="mt-5">
                      <BuyButton
                        onClick={handleBuyForm}
                        label={
                          isLoading ? (
                            <div className="flex items-center">
                              <LoadingSpinner />
                              Processing...
                            </div>
                          ) : (
                            "Buy Now"
                          )
                        }
                        disabled={isLoading} // Disable button when loading
                      />
                      </div>
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
                    <div className="option-2 mt-4 flex flex-col gap-2 ">
                      <InputForm
                        placeholder={getPlaceholderText()}
                        value={buyValue}
                        onChange={handleInputChange}
                        currency={selectedCurrency}
                      />
                      <span className="text-gray-200 font-light text-[12px]  ">
                        You will receive: {getCoinsReceived()} XYZMER
                      </span>
                      <div className=" mt-5">
                      <BuyButton
                      
                        onClick={handleBuyForm}
                        label={
                          isLoading ? (
                            <div className="flex items-center">
                              <LoadingSpinner />
                              Processing...
                            </div>
                          ) : (
                            "Buy Now"
                          )
                        }
                        disabled={isLoading} // Disable button when loading
                      />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifcation success */}
        <Popup
          isVisible={isPurchaseSuccessVisible}
          onClose={() => setIsPurchaseSuccessVisible(false)}
          title="Purchase Successful"
          message={
            <span>
              Your purchase of{" "}
              <span style={{ color: 'green' }}>
                {purchaseAmount} {selectedCurrency}
              </span>{" "}
              was successful.
            </span>
          }
          icon={{
            color: "text-green-500",
            path: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ),
          }}
        />

        {/* Notification KYC Success */}
        <Popup
          isVisible={isSuccessVisible}
          onClose={() => setIsSuccessVisible(false)}
          title="KYC Completed"
          message="Thank you for completing the KYC form. Our team will validate it within 1x24 hours."
          icon={{
            color: "text-green-500",
            path: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ),
          }}
        />

        {/* Warning Notification */}
        <Popup
          isVisible={isWarningVisible}
          onClose={() => setIsWarningVisible(false)}
          title="Warning"
          message={warningMessage}
          icon={{
            color: "text-red-500",
            path: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 0 0118 0z"
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default BatchSales;
