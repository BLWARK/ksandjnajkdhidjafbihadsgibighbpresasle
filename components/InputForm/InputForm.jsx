import React from "react";

const formatPlaceholder = (placeholder) => {
  if (!placeholder) return placeholder;
  return placeholder.replace(/,/g, '.');
};

const InputForm = ({ placeholder, value, onChange, currency }) => {
  const getImageSrc = (currency) => {
    switch (currency) {
      case 'USDT':
        return "/usdt.png";
      case 'BNB':
        return "/BNB.png";
       // Default image if currency is not recognized
    }
  };

  return (
    <div className="relative flex justify-start items-center">
      <input
        type="text"
        className="2xl:w-[540px] 2xl:h-[60px] w-[310px] pl-10 p-4 rounded-lg text-gray-200 text-[14px] mt-2 bg-gray-700 border-[1px] border-gray-600"
        placeholder={formatPlaceholder(placeholder)}
        value={value}
        onChange={(e) => {
          const val = e.target.value.replace(/,/g, '.');
          onChange({ target: { value: val } });
        }}
      />
      <img
        src={getImageSrc(currency)}
        alt={currency}
        className="absolute left-3 2xl:top-[39px] top-[36px] transform -translate-y-1/2 w-6 h-auto"
      />
    </div>
  );
};

export default InputForm;
