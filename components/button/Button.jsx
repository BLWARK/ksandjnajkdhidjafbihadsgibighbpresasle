import React from 'react'
import "./Button.css"

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-1 flex justify-center items-center 2xl:w-[550px] w-[320px] h-[55px] p-3 rounded-full font-bold  text-white">{label}</button>
  )
}

export default Button