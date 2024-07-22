'use client'
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './Calculator.css';
import dataBatch from '@/components/constant/Databatch';

const totalBatches = 25;
const maxSliderValue = 1000;
const maxSliderBatchValue = 0.9 * maxSliderValue;

const getPriceForBatch = (batchIndex) => {
  const batch = dataBatch.find(batch => batch.batchNumber === batchIndex + 1);
  return batch ? batch.priceBatch : dataBatch[0].priceBatch;
};

const CalculatorPage = () => {
  const [coinValue, setCoinValue] = useState('');
  const [usdtValue, setUsdtValue] = useState(0);
  const [batchIndex, setBatchIndex] = useState(0);
  const [isMoon, setIsMoon] = useState(false);

  const handleSliderChange = (value) => {
    const newBatchIndex = Math.min(Math.floor(value / (maxSliderBatchValue / (totalBatches - 1))), totalBatches - 1);
    setBatchIndex(newBatchIndex);
    setIsMoon(false);
    setUsdtValue((coinValue || 0) * getPriceForBatch(newBatchIndex));
  };

  const handleCoinInputChange = (e) => {
    const value = e.target.value;
    setCoinValue(value);
    if (isMoon) {
      setUsdtValue(value * 5.22);
    } else {
      setUsdtValue(value * getPriceForBatch(batchIndex));
    }
  };

  const handlePresaleClick = () => {
    setBatchIndex(0);
    setIsMoon(false);
    setUsdtValue((coinValue || 0) * dataBatch[0].priceBatch);
  };

  const handleToTheMoonClick = () => {
    setIsMoon(true);
    setBatchIndex(totalBatches - 1);
    setUsdtValue((coinValue || 0) * 5.22);
  };

  return (
    <div className="calculator-sec content overflow-y-hidden overflow-x-hidden 2xl:ml-[360px] px-2">
      <div className="wrapper-calculator 2xl:w-[1400px] 2xl:h-[840px] w-[375px] h-[780px] bg-blue-950 rounded-2xl flex flex-col justify-center items-center 2xl:mt-5 2xl:mb-0 mt-20 mb-44 py-20">
        <div className="title w-full flex justify-center items-center 2xl:mt-0 mt-24">
          <p className="text-white font-bold 2xl:text-[24px] xl:text-[40px] lg:text-[40px] text-[20px]">
            Calculate your profits on coin launch
          </p>
        </div>
        <div className="line w-full h-[1px] bg-slate-700 2xl:mt-5 mt-5"></div>
        <div className="input-number w-full flex flex-col justify-center items-start mt-5 px-10">
          <p className="text-gray-200 font-light 2xl:text-[16px] text-[12px] py-3">
            Enter your XYZMER coins in the input below
          </p>
          <input
            type="number"
            className="w-full h-[70px] p-4 border border-gray-300 rounded-xl text-black"
            placeholder="Enter a number"
            value={coinValue}
            onChange={handleCoinInputChange}
          />
        </div>
        <div className="input-number w-full flex flex-col justify-center items-start mt-5 px-10">
          <p className="text-gray-200 font-light 2xl:text-[16px] text-[12px] py-5">
            USDT Amount estimate
          </p>
          <input
            type="number"
            className="w-full h-[70px] p-4 border border-gray-300 rounded-xl text-black"
            placeholder="Enter a number"
            value={usdtValue}
            readOnly
          />
        </div>
        <div className="slider w-full flex flex-col justify-center items-start p-10">
          <div className="title w-full flex justify-start items-start">
            <p className="text-gray-200 font-light 2xl:text-[16px] text-[12px] 2xl:py-5 py-2">
              Drag the slider to select the batch
            </p>
          </div>

          <div className="slider-wrap w-full justify-center items-center gap-10 2xl:flex hidden">
            <div className="buttons-wrap flex justify-center items-center gap-5 mt-5">
              <button
                className="btn-presale w-[150px] h-[55px] bg-green-500 text-white rounded-xl flex flex-col justify-center items-center"
                onClick={handlePresaleClick}
              >
                Presale price 🔥
                <span>0.004134</span>
              </button>
            </div>
            <ReactSlider
              className="custom-slider"
              thumbClassName="custom-thumb"
              trackClassName="custom-track"
              min={0}
              max={maxSliderValue}
              value={isMoon ? maxSliderValue : batchIndex * (maxSliderBatchValue / (totalBatches - 1))}
              onChange={handleSliderChange}
              renderThumb={(props, state) => <div {...props}>{state.valueNow === maxSliderBatchValue ? '🔥' : '🚀'}</div>}
              renderTrack={(props, state) => {
                const { key, ...trackProps } = props; // Destructure key to avoid spreading it
                return (
                  <div
                    {...trackProps}
                    key={key} // Assign key directly
                    style={{
                      ...trackProps.style,
                      background: isMoon ? "linear-gradient(to right, black, red)" :
                        state.index === 0
                          ? "linear-gradient(to right, #074C00, #7ae56e)"
                          : "#ddd",
                      width:
                        state.index === 0
                          ? `${state.valueNow}%`
                          : `${100 - state.valueNow}%`,
                      left: state.index === 0 ? "0" : `${state.valueNow}%`,
                    }}
                  />
                );
              }}
            />
            <div className="buttons-wrap flex justify-center items-center gap-5 mt-5">
              <button
                className="btn-moon w-[150px] h-[55px] bg-red-500 text-white rounded-xl flex flex-col justify-center items-center"
                onClick={handleToTheMoonClick}
              >
                To the Moon 🚀<span>5.22</span>
              </button>
            </div>
          </div>
          <div className="slider-wrap-mobile w-full justify-center items-center gap-10 2xl:hidden block">
            <div className="buttons-wrap flex justify-center items-center gap-5">
            </div>
            <ReactSlider
              className="custom-slider"
              thumbClassName="custom-thumb"
              trackClassName="custom-track"
              min={0}
              max={maxSliderValue}
              value={isMoon ? maxSliderValue : batchIndex * (maxSliderBatchValue / (totalBatches - 1))}
              onChange={handleSliderChange}
              renderThumb={(props, state) => <div {...props}>{state.valueNow === maxSliderBatchValue ? '🔥' : '🚀'}</div>}
              renderTrack={(props, state) => {
                const { key, ...trackProps } = props; // Destructure key to avoid spreading it
                return (
                  <div
                    {...trackProps}
                    key={key} // Assign key directly
                    style={{
                      ...trackProps.style,
                      background: isMoon ? "linear-gradient(to right, black, red)" :
                        state.index === 0
                          ? "linear-gradient(to right, #074C00, #7ae56e)"
                          : "#ddd",
                      width:
                        state.index === 0
                          ? `${state.valueNow}%`
                          : `${100 - state.valueNow}%`,
                      left: state.index === 0 ? "0" : `${state.valueNow}%`,
                    }}
                  />
                );
              }}
            />
            <div className="buttons-wrap flex justify-between items-center gap-5 mt-5">
              <button
                className="btn-presale 2xl:w-[150px] 2xl:h-[55px] w-[100px] h-[45px] bg-green-500 text-white rounded-xl flex flex-col justify-center items-center text-[12px]"
                onClick={handlePresaleClick}
              >
                Presale price 🔥
                <span>0.004134</span>
              </button>
              <button
                className="btn-moon 2xl:w-[150px] 2xl:h-[55px] w-[100px] h-[45px] bg-red-500 text-white rounded-xl flex flex-col justify-center items-center text-[12px]"
                onClick={handleToTheMoonClick}
              >
                To the Moon 🚀<span>5.22</span>
              </button>
            </div>
          </div>
        </div>
        <div className="batch-info flex flex-col justify-center items-center 2xl:w-[400px] w-[300px] mb-20 text-white text-center bg-[#3d4db7] rounded-2xl p-5 gap-2">
          <div className="wrap-batch-info w-full flex justify-center items-center">
            <p className="text-gray-200 font-light 2xl:text-[14px] text-[12px] px-2">Batch:</p> <span className="text-white font-bold text-[14px]"> {isMoon ? 'To the Moon' : batchIndex + 1}</span>
          </div>
          <div className="wrap-batch-info w-full flex justify-center items-center">
            <p className="text-gray-200 font-light 2xl:text-[14px] text-[12px] px-2">Price :</p> <span className="text-white font-bold text-[14px]"> {isMoon ? "5.22" : getPriceForBatch(batchIndex).toFixed(4)} USDT </span>
          </div>
          <div className="wrap-batch-info w-full flex justify-center items-center">
            <p className="text-gray-200 font-light 2xl:text-[14px] text-[12px] px-2">Estimated USDT :</p> <span className="text-white font-bold text-[14px]"> {usdtValue.toFixed(4)} USDT</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorPage;
