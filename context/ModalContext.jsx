"use client"
import React, { useState, createContext, useContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => { 
    //isi function atau state
    const [open,setOpen] = useState(false) //contoh
    return (
    <ModalContext.Provider value={{open, setOpen}}>
    {children}
    </ModalContext.Provider>
    )
    }
    
    export function useModal() { return useContext(ModalContext)}