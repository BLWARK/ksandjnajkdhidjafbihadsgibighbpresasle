import React from 'react';
import "./Progressbar.css"

const ProgressBar = ({ progress, remaining }) => {
  const invertedProgress = 100 - progress;
  const formattedRemaining = parseFloat(remaining).toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });

  return (
    <div className="relative w-full bg-gray-700 border-[1px] border-gray-400 rounded-full h-16 overflow-hidden p-1 flex justify-start items-center">
      <div
        className="progress-bar"
        style={{ width: `${invertedProgress}%` }}
      ></div>
      <div className="absolute inset-1 flex items-center justify-center">
        <span className="text-gray-200 font-bold">{`${formattedRemaining} Remaining`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
