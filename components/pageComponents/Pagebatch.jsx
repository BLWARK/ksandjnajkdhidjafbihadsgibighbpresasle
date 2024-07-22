"use client"
import Image from "next/image"
import React, { useState, useEffect, useCallback } from "react";
import CountUp from "react-countup";
import ProgressBar from "../Progresbar/Progressbar";
import "../Progresbar/Progressbar.css";
import dataBatch from "../constant/Databatch";
import batchValues from "../constant/BatrchValues";
import KYCForm from "../KYC/Kycpopup";
import useBnbToUsdRate from "../../hooks/useBnbToUsdRate"; 
import InputForm from "../InputForm/InputForm"; 
import BuyButton from "../button/Buybutton"; 
import Popup from "../popup/Popup"; 
import OptionSelector from "../OptionSelector/Optionselector"; 

const Pagebatch = ({ onBuy }) => {
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalCoinsSold, setTotalCoinsSold] = useState(0);
  const [batchCoinsSold, setBatchCoinsSold] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [inputAmount1, setInputAmount1] = useState("");
  const [inputAmount2, setInputAmount2] = useState("");
  const [isMaxBatchReached, setIsMaxBatchReached] = useState(false);
  const [isMaxTotalCoinsSoldReached, setIsMaxTotalCoinsSoldReached] = useState(false);
  const [maxBatchValueReached, setMaxBatchValueReached] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1); // eslint-disable-next-line
  const [isKYCVisible, setIsKYCVisible] = useState(false); 
  const [isKYCCompleted, setIsKYCCompleted] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isNextBatchDisabled, setIsNextBatchDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [totalUSDRaised, setTotalUSDRaised] = useState(0); 

  const {bnbToUsdRate, isLoading} = useBnbToUsdRate();
  const maxTotalCoinsSold = 222666666.444;

  const calculateTargetValue = useCallback((batchNumber) => {
    if (batchNumber < 1 || batchNumber > 25) {
      return 0;
    }
    return batchValues[batchNumber - 1];
  }, []);

  const getCurrentBatchPrice = (batchNumber) => {
    const batch = dataBatch.find(b => b.batchNumber === batchNumber);
    return batch.priceBatch;
  };

  const [targetValue, setTargetValue] = useState(calculateTargetValue(currentBatch));
  const [currentPrice, setCurrentPrice] = useState(getCurrentBatchPrice(currentBatch));

  useEffect(() => {
    const newTargetValue = calculateTargetValue(currentBatch);
    const newCurrentPrice = getCurrentBatchPrice(currentBatch);
    setTargetValue(newTargetValue);
    setCurrentPrice(newCurrentPrice);
    setRemaining((newTargetValue - batchCoinsSold).toFixed(18));
  }, [currentBatch, batchCoinsSold, calculateTargetValue]);

  useEffect(() => {
    const progressPercentage = (batchCoinsSold / targetValue) * 100;
    setProgress(progressPercentage);
    setRemaining((targetValue - batchCoinsSold).toFixed(18));
  }, [batchCoinsSold, targetValue]);

  useEffect(() => {
    if (progress >= 100) {
        const newTotalCoinsSold = parseFloat(totalCoinsSold);

        if (newTotalCoinsSold >= maxTotalCoinsSold) {
            setIsMaxTotalCoinsSoldReached(true);
            setBatchCoinsSold((maxTotalCoinsSold - totalCoinsSold).toFixed(18));
            setTotalCoinsSold(maxTotalCoinsSold.toFixed(18));
        } else {
            setTotalCoinsSold(newTotalCoinsSold.toFixed(18));
            setBatchCoinsSold(0);
            setProgress(0);
            setRemaining(0); // Set remaining to 0 explicitly

            if (currentBatch < 25) {
                setIsNextBatchDisabled(true);
                setTimeLeft(3);
                const timerInterval = setInterval(() => {
                    setTimeLeft((prevTime) => {
                        if (prevTime <= 1) {
                            clearInterval(timerInterval);
                            setCurrentBatch((prevBatch) => {
                                const nextBatch = prevBatch + 1;
                                setTargetValue(calculateTargetValue(nextBatch));
                                setCurrentPrice(getCurrentBatchPrice(nextBatch));
                                setIsNextBatchDisabled(false);
                                return nextBatch;
                            });
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            } else {
                setIsMaxBatchReached(true);
            }
        }
    }
}, [progress, batchCoinsSold, totalCoinsSold, currentBatch, calculateTargetValue]);

const addSoldCoins = (amount) => {
    if (isNextBatchDisabled) {
        alert("Please wait for the next batch to start.");
        return;
    }

    const newBatchCoinsSold = parseFloat(batchCoinsSold) + parseFloat(amount);
    const newTotalCoinsSold = parseFloat(totalCoinsSold) + parseFloat(amount);
    const usdAmount = amount * currentPrice;

    if (!isMaxBatchReached && !isMaxTotalCoinsSoldReached) {
        if (currentBatch === 25 && newBatchCoinsSold >= targetValue) {
            setMaxBatchValueReached(true);
            alert("Maximum value for batch 25 reached. You cannot buy more coins.");
        } else if (newTotalCoinsSold <= maxTotalCoinsSold) {
            setBatchCoinsSold(newBatchCoinsSold.toFixed(18));
            setTotalCoinsSold(newTotalCoinsSold.toFixed(18));
            setTotalUSDRaised((prevTotal) => (parseFloat(prevTotal) + parseFloat(usdAmount)).toFixed(2));
        } else {
            alert("Maximum total coin limit reached. You cannot buy more coins.");
            setIsMaxTotalCoinsSoldReached(true);
        }
    } else {
        alert("Maximum batch limit reached. You cannot buy more coins.");
    }
};

const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setKey((prevKey) => prevKey + 1);
    setInputAmount1("");
    setInputAmount2("");
};

const handleInputChange1 = (e) => {
    const amount = e.target.value;

    if (amount === "" || parseFloat(amount) < 0) {
        setInputAmount1("");
        return;
    }

    const parsedAmount = parseFloat(amount);
    const conversionRate = selectedCurrency === "BNB" ? bnbToUsdRate : 1;
    const amountInUSD = parsedAmount * conversionRate;
    const maxAmount = Math.min(400, remaining * currentPrice);
    const maxAmountInBNB = maxAmount / conversionRate;

    if (amountInUSD <= maxAmount) {
        setInputAmount1(amount);
    } else {
        setInputAmount1(maxAmountInBNB.toFixed(18));
    }
};

const handleInputChange2 = (e) => {
    const amount = e.target.value;

    if (amount === "" || parseFloat(amount) < 0) {
        setInputAmount2("");
        return;
    }

    const parsedAmount = parseFloat(amount);
    const conversionRate = selectedCurrency === "BNB" ? bnbToUsdRate : 1;
    const maxAmount = (remaining * currentPrice) / conversionRate;

    setInputAmount2(amount);

    if (parsedAmount > maxAmount) {
        setInputAmount2(maxAmount.toFixed(18));
    }
};

const nextBatchPrice = getCurrentBatchPrice(currentBatch + 1);
const conversionRate = selectedCurrency === "BNB" ? bnbToUsdRate : 1;
const coinsReceived1 = parseFloat(inputAmount1 || 0) / (currentPrice / conversionRate);
const coinsReceived2 = parseFloat(inputAmount2 || 0) / (currentPrice / conversionRate);

const handleBuy1 = () => {
    if (isNextBatchDisabled) {
        alert("Please wait for the next batch to start.");
        return;
    }

    const amountInUSD = parseFloat(inputAmount1 || 0) * (selectedCurrency === "BNB" ? bnbToUsdRate : 1);
    const maxAmount = Math.min(400, remaining * currentPrice);

    if (amountInUSD > maxAmount) {
        setWarningMessage(`Purchase amount for Option 1 must be less than or equal to ${maxAmount.toFixed(2)} USDT`);
        setIsWarningVisible(true);
    } else {
        addSoldCoins(coinsReceived1.toFixed(18));
        if (typeof onBuy === 'function') {
            onBuy({
                address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32",
                value: coinsReceived1.toFixed(18),
            });
        } else {
            console.error("onBuy is not a function");
        }
    }
};

const handleBuy2 = () => {
    if (isNextBatchDisabled) {
        alert("Please wait for the next batch to start.");
        return;
    }

    addSoldCoins(coinsReceived2.toFixed(18));
    if (typeof onBuy === 'function') {
        onBuy({
            address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32",
            value: coinsReceived2.toFixed(18),
        });
    } else {
        console.error("onBuy is not a function");
    }
};

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
        return selectedCurrency === "USDT" ? "0-400 USDT" : `0-400 USDT (~${(0 / bnbToUsdRate).toFixed(18)}-${(400 / bnbToUsdRate).toFixed(18)} BNB)`;
    } else {
        return selectedCurrency === "USDT" ? "Enter amount in USDT" : `Enter amount in USDT (~${(1 / bnbToUsdRate).toFixed(18)} BNB)`;
    }
};

return (
    <div className="buy-coin-presale 2xl:w-[700px] w-full 2xl:flex flex-row 2xl:justify-start 2xl:items-start justify-center items-center flex mt-10">
      <div className="wrapper-buy-coin 2xl:w-[1430px] 2xl:h-[1050px] w-[380px] h-[1170px] bg-blue-950 rounded-2xl">
        <div className="wrap-title w-full flex flex-col justify-center items-center mt-10">
          <div className="w-full flex flex-col justify-center items-center text-gray-200 font-light text-[18px]">
            Current Batch :{" "}
            <span className="text-white font-bold text-[24px]">
              Batch {currentBatch}
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
                  end={totalCoinsSold}
                  duration={2.5}
                  decimals={2}
                  separator=","
                />
              </span>
            </div>
          </div>
          <div className="progress-bar w-[90%] mt-10">
            <ProgressBar progress={progress} remaining={remaining} setKey={setKey} />
          </div>
          <div className="wrap-price w-[85%] flex justify-between items-center mt-5">
            <div className="wrap-price-left flex flex-col justify-start items-start text-left">
              <span className="text-gray-200 font-light text-[12px]">
                {" "}
                Current Price
              </span>
              <span className="text-gray-200 font-bold text-[12px]">
                1 XZYMER = {currentPrice.toFixed(8)} USDT
              </span>
            </div>
            {currentBatch !== 25 && (
              <div className="wrap-price-left flex flex-col justify-start items-end">
                <span className="text-gray-200 font-light text-[12px]">
                  {" "}
                  Next Batch
                </span>
                <span className="text-gray-200 font-bold text-[12px]">
                  {" "}
                  {nextBatchPrice ? nextBatchPrice.toFixed(8) : 'N/A'} USDT
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
                    handleCurrencySelect={handleCurrencySelect}
                  />
                  {selectedOption === 1 && (
                    <div className="option-1 mt-2 flex flex-col gap-5">
                      <InputForm
                        placeholder={getPlaceholderText()}
                        value={inputAmount1}
                        onChange={handleInputChange1}
                        currency={selectedCurrency}
                        src={
                          selectedCurrency === "USDT" 
                          ? <Image src="/usdt.png" alt="USDT Icon" width={20} height={20} />
                          : <Image src="/BNB.png" alt="BNB Icon" width={20} height={20} />
                        }
                      />
                      <span className="text-gray-200 font-light text-[12px] mt-2">
                        You will receive: {coinsReceived1.toFixed(18)} XYZMER
                      </span>
                      <BuyButton
                        onClick={handleBuy1}
                        label="Buy Now"
                        disabled={isMaxBatchReached || isMaxTotalCoinsSoldReached || maxBatchValueReached}
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
                        value={inputAmount2}
                        onChange={handleInputChange2}
                        currency={selectedCurrency}
                        src={
                          selectedCurrency === "USDT" 
                          ? <Image src="/icons/usdt.png" alt="USDT Icon" width={20} height={20} />
                          : <Image src="/icons/bnb.png" alt="BNB Icon" width={20} height={20} />
                        }
                      />
                      <span className="text-gray-200 font-light text-[12px] mt-2">
                        You will receive: {coinsReceived2.toFixed(18)} XYZMER
                      </span>
                      <BuyButton
                        onClick={handleBuy2}
                        label="Buy Now"
                        disabled={isMaxBatchReached || isMaxTotalCoinsSoldReached || maxBatchValueReached}
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
      {isNextBatchDisabled && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-black">Next Batch Starting In</h2>
            <p className="text-red-500 text-4xl mt-4">{timeLeft}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagebatch;
