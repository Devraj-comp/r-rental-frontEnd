import React from "react";

import BgImage from '../assets/car24.jpg'
import GOOGLE_ICON from '../assets/google.jpg';

const colors = {
    primary: '#060606',
    background: '#E0E0E0',
    disabled: '#D9D9D9'
}

export const Register = () => {
    return(
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={BgImage} className="w-full h-full object-cover"></img>
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                <h1 className="text-xl text-[#060606] font-semibold">RIGHT-RENTAL</h1>
                <div className="w-full flex flex-col max-w-[500px]">
                    <div className="w-full flex flex-col mb-2">
                        <h3 className="text-3xl font-semibold mb-2">Sign Up</h3>
                        <p className="text-base mb-2">Welcome! Please enter your details.</p>
                    </div> 
                    <div className="w-full flex flex-col">
                        <input type = "email" placeholder = "Email" className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none" />
                        <input type = "password" placeholder = "Password1" className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none" />
                        <input type = "password" placeholder = "Password2" className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none" />
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex items-center">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className="text-sm">I accept the terms and policy</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer">
                            Sign Up
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black/40"></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
                    </div>
                    <button className="w-full text-black my-2 bg-white border border-black/40 rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer">
                           <img src={GOOGLE_ICON} className="h-6 mr-2" /> Sign Up with Google
                        </button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">Already have an account? <span className="font-semibold underline underline-offset-2 cursor-pointer">Log In</span></p>
                </div>
            </div>
        </div>
    )
}