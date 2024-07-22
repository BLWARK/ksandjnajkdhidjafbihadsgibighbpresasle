import React from "react";
import Button from "../button/Button";

const BuyButton = ({ onClick, disabled, label }) => (
  <Button
    onClick={onClick}
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
    label={label}
    disabled={disabled}
  />
);

export default BuyButton;
