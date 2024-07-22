import React from "react";
import Link from "next/link";

const SidebarBtn = ({ link, label, icon, onActive, onClick }) => {
  return (
    <Link href={link}>
      <div
        className={`w-full h-[90px] group flex items-center pl-5 relative overflow-hidden cursor-pointer`}
        style={{ transition: 'transform 0.3s ease-in-out' }}
        onClick={onClick}
      >
        <div
          className={`absolute inset-0 transform transition-transform duration-300 ease-in-out 
            ${onActive === link ? 'translate-y-0' : 'translate-y-full'} 
            ${onActive === link ? 'bg-[#3d4db7] rounded-lg' : 'bg-transparent'}`}
        ></div>
        <span className={`relative flex justify-center items-center gap-2 z-10 
          ${onActive === link ? "text-orange-400" : "text-white group-hover:text-orange-400"} 
          transition-colors duration-300`}>
          {icon}
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarBtn;
