"use client"
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const page = () => {
    const [expandedSections, setExpandedSections] = useState({
        option1: false,
        option2: false,
        summary: false
      });
    
      const toggleSection = (section) => {
        setExpandedSections((prev) => ({
          ...prev,
          [section]: !prev[section]
        }));
      };
  return (
    <div className="Activity-sec content 2xl:w-full w-[390px] 2xl:flex-col flex flex-row justify-center items-center overflow-y-hidden overflow-x-hidden pb-[310px] 2xl:ml-[360px] ">
      <div className="wrap-activity 2xl:w-[1420px] 2xl:h-full w-[380px] h-auto bg-blue-950 rounded-2xl my-10 pb-10">
        <div className="wrap-title mt-10">
          <h1 className="text-white font-bold text-[34px] px-10">Activity Rules</h1>
        </div>
        <div className="line w-full h-[1px] bg-white/20 mt-10"></div>

        <div className="option-1 mt-10 flex flex-col justify-start items-start px-10">
          <button className="w-full text-left bg-[#3d4db7] text-white rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-[#163d6e] focus:outline-none" onClick={() => toggleSection('option1')}>
            <div className="font-bold text-[20px] text-blue-200">Option 1: Retail Investor</div>
            {expandedSections.option1 ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
          </button>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.option1 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            {expandedSections.option1 && (
              <div className="wrap-content flex flex-col justify-start items-start gap-2 my-5">
                <p className="text-white font-bold text-[18px] pl-3">Minimum and Maximum Purchase:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Minimum purchase: $0</li>
                  <li className="text-red-500 font-bold">Maximum purchase: $400</li>
                </ul>
                <p className="text-white font-bold text-[18px] mt-10 pl-3">Price Options:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Consists of 25 batches, including a fair launch.</li>
                </ul>
                <p className="text-white font-bold text-[18px] mt-10 pl-3">Vesting System:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>First week after launching: 10%</li>
                  <li>Each following month:</li>
                  <ul className="text-white font-light text-[16px] marker:text-sky-400 list-none space-y-2 text-left ">
                    <li>- Month 1: 20%</li>
                    <li>- Month 2: 30%</li>
                    <li>- Month 3: 40%</li>
                    <li>- Month 4: 50%</li>
                    <li>- Month 5: 100%</li>
                  </ul>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="option-2 mt-5 flex flex-col justify-start items-start px-10">
          <button className="w-full text-left bg-[#3d4db7] text-white rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-[#163d6e] focus:outline-none" onClick={() => toggleSection('option2')}>
            <div className="font-bold text-[20px] text-blue-200">Option 2: Whale Investor</div>
            {expandedSections.option2 ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
          </button>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.option2 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            {expandedSections.option2 && (
              <div className="wrap-content flex flex-col justify-start items-start gap-2 my-5">
                <p className="text-white font-bold text-[18px] pl-3">Minimum and Maximum Purchase:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Minimum purchase: $0</li>
                  <li className="text-red-500 font-bold">Maximum purchase: Maximum value/batch</li>
                </ul>
                <p className="text-white font-bold text-[18px] mt-10 pl-3">Vesting System:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>First year: 30%</li>
                  <li>Second year: 15%</li>
                  <li>Third year: 10%</li>
                  <li>Fourth year: 7%</li>
                  <li>Fifth year: 6%</li>
                </ul>
                <p className="text-white font-bold text-[18px] mt-10 pl-3">Additional Benefits:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Whale investors will receive an additional benefit of 10% dividends from ecosystem profits.</li>
                  <li>Only whale investors will receive a referral code.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="Vesting-system mt-5 flex flex-col justify-start items-start px-10">
          <button className="w-full text-left bg-[#3d4db7] text-white rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-[#163d6e] focus:outline-none" onClick={() => toggleSection('summary')}>
            <div className="font-bold text-[20px] text-blue-200">Vesting System Summary</div>
            {expandedSections.summary ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
          </button>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.summary ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            {expandedSections.summary && (
              <div className="wrap-content flex flex-col justify-start items-start gap-2 mt-4">
                <p className="text-white font-bold text-[18px] pl-3">For Retail Investors Without KYC:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Total vesting period is 5 months.</li>
                  <li>Token distribution is done monthly with increasing percentages.</li>
                </ul>
                <p className="text-white font-bold text-[18px] mt-10 pl-3">For Whale Investors:</p>
                <ul className="text-white font-light text-[16px] marker:text-sky-400 list-disc pl-10 space-y-2 text-left">
                  <li>Total vesting period is 5 years.</li>
                  <li>Token distribution is done yearly dengan decreasing percentages.</li>
                  <li>Holders who qualify as "whale investors" from the presale stage will receive an additional 10% dividend from the profits generated by the ecosystem, and this dividend will be distributed equally among the qualifying holders.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default page