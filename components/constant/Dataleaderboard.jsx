"use client"
import React, { useState, useEffect } from "react";

const Dataleaderboard = ({ buyData }) => {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 2, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 3, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 4, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 5, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 6, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 7, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 8, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 9, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
    { rank: 10, address: "0x52C3FD533276DC4B3146510e84D4C19F35114E32", transactions: 0 },
  ]);

  const handleButtonClick = (url) => {
    window.open(url, "_blank"); 
  };

  const url = "https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955?a=0x3c02290922a3618a4646e3bbca65853ea45fe7c6";

  const formatAddress = (address) => {
    if (address.length > 16) {
      return `${address.slice(0, 12)}...${address.slice(-4)}`;
    }
    return address;
  };

  // Update data beli
  useEffect(() => {
    if (buyData) {
      setLeaderboardData((prevData) => {
        const updatedData = [...prevData];
        const userIndex = updatedData.findIndex((item) => item.address === buyData.address);
        if (userIndex !== -1) {
          updatedData[userIndex].transactions += buyData.value;
        } else {
          updatedData.push({ rank: updatedData.length + 1, address: buyData.address, transactions: buyData.value });
        }
        updatedData.sort((a, b) => b.transactions - a.transactions);

        // Update ranks
        updatedData.forEach((item, index) => {
          item.rank = index + 1;
        });

        return updatedData;
      });
    }
  }, [buyData]);

  return (
    <div className="wrap-list w-full 2xl:h-[820px] h-[620px] p-5 grid grid-cols-1 divide-y-[1px] divide-gray-700 justify-center items-center text-white overflow-y-scroll ">
      {leaderboardData.map((item, index) => (
        <button
          key={index}
          className="w-full flex justify-between items-center"
          onClick={() => handleButtonClick(url)}
        >
          <span className="2xl:text-[14px] text-[10px] font-bold 2xl:p-10 py-10 px-2">{item.rank}</span>
          <span className="2xl:text-[14px] text-[10px] font-bold 2xl:p-10 py-10 px-2">{formatAddress(item.address)}</span>
          <span className="2xl:text-[14px] text-[10px] font-bold 2xl:p-10 py-10 px-2 text-end">
            <p className="text-gray-200 font-light">Total Transaction</p>
            <p>{item.transactions.toLocaleString()}</p>
          </span>
        </button>
      ))}
    </div>
  );
};

export default Dataleaderboard;
