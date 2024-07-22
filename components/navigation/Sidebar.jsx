"use client"
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { sideButton } from "@/components/constant/ConsSidebar";
import { sideButton2 } from "@/components/constant/Cons2Sidebar";
import SidebarBtn from "@/components/button/SidebarBtn";
import SidebarBtn2 from "@/components/button/SidebarBtn2";
import { useModal } from "@/context/ModalContext";
import "./Sidebar.css";

const SidebarMobile = () => {
  const [onActive, setOnActive] = useState(""); // State untuk mengelola tombol aktif
  const { open, setOpen } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    // Mengatur tombol aktif berdasarkan path saat ini
    setOnActive(pathname);
  }, [pathname]);

  const handleNav = (path) => {
    setOnActive(path); // Set tombol yang aktif
    setOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`sidebar side-bars fixed block transition-all duration-300 bg-blue-950 w-[300px] ${
        open ? "translate-x-0 " : "-translate-x-[300px] "
      } 2xl:hidden xl:hidden lg:hidden `}
    >
      <div className="wrapside absolute w-full flex-col items-start pt-5 gap-5 pl-2 pr-2">
        {sideButton.map((item, index) => (
          <SidebarBtn
            key={index}
            icon={item.icon}
            link={item.link}
            label={item.title}
            onActive={onActive}
            onClick={() => handleNav(item.link)} // Event klik untuk mengatur tombol aktif
          />
        ))}
        <div className="w-full h-[1px] bg-white/20 mt-10"></div>
        {sideButton2.map((item, index) => (
          <SidebarBtn2
            key={index}
            icon={item.icon}
            link={item.link}
            label={item.title}
            onActive={onActive}
            onClick={() => handleNav(item.link)} // Event klik untuk mengatur tombol aktif
          />
        ))}
        <div className="wallet-button flex justify-start items-start w-full -ml-5 mt-5">
          <w3m-button />
        </div>
      </div>
    </div>
  );
};

const SideBarDesktop = () => {
  const [onActive, setOnActive] = useState(""); // State untuk mengelola tombol aktif
  const pathname = usePathname();

  useEffect(() => {
    // Mengatur tombol aktif berdasarkan path saat ini
    setOnActive(pathname);
  }, [pathname]);

  return (
    <div className={`sidebar fixed hidden transition-all duration-300 bg-blue-950 w-[350px] 2xl:block xl:block lg:block`}>
      <div className="wrapside w-full flex-col justify-center items-start py-3 px-5">
        {sideButton.map((item, index) => (
          <SidebarBtn
            key={index}
            icon={item.icon}
            link={item.link}
            label={item.title}
            onActive={onActive}
            onClick={() => setOnActive(item.link)} // Event klik untuk mengatur tombol aktif
          />
        ))}
        <div className="w-full h-[1px] bg-white/20 my-10"></div>
        {sideButton2.map((item, index) => (
          <SidebarBtn2
            key={index}
            icon={item.icon}
            link={item.link}
            label={item.title}
            onActive={onActive}
            onClick={() => setOnActive(item.link)} // Event klik untuk mengatur tombol aktif
          />
        ))}
         <div className="wallet-button flex justify-start items-start w-full ml-3 mt-5">
          <w3m-button />
        </div>

      </div>
    </div>
  );
};

export { SidebarMobile, SideBarDesktop };
