"use client"
import React from 'react'
import Navbar from "@/components/navigation/Navbar";
import { SidebarMobile, SideBarDesktop } from "@/components/navigation/Sidebar";

const layout = ({ children }) => {

    
    return (
      <div className="w-full  flex justify-center items-center">
       <Navbar/>
       <SidebarMobile   />
            <SideBarDesktop   />
          {children}
          
       
      </div>
    );
  }
  
  export default layout;