"use client"
import React from "react";
import "./Navbar.css";
import { Spiral as Hamburger } from "hamburger-react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext"

const Navbar = ({ isPreloading }) => {


   const {open, setOpen} = useModal()
  return (
    <nav className="nav-bar fixed top-0 left-0 w-full h-[80px] bg-white/20 backdrop-blur-lg">
      <div className="warpnav h-[70px] px-5 flex justify-between items-center">
        <div className="left 2xl:w-full h-full flex justify-start items-center gap-2">
          <span className="title flex w-full gap-3 items-center">
            <Image className="h-[35px] w-auto" src="/XYZMER LOGOs.png" alt="XYZMER Coin" width={50} height={50} />
            <div className="title flex flex-col justify-center items-start">
              <p className="text-white font-bold text-[14px]">XYZMER COIN</p>
            </div>
          </span>
        </div>
        {!isPreloading && (
          <div className="right 2xl:w-full h-full justify-center items-center 2xl:hidden block mt-5">
            <Hamburger color="#fff" toggled={open} toggle={setOpen} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
