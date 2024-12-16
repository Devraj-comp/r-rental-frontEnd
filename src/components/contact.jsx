import React from "react";

import BgImage from '../assets/car24.jpg'
import GOOGLE_ICON from '../assets/google.jpg';

import { Navbar } from "./navbar";
import { FooterNew } from "./footer-new";

const colors = {
    primary: '#060606',
    background: '#E0E0E0',
    disabled: '#D9D9D9'
}

export const Contact = () => {
    return(
        <div>
            <Navbar />
            <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={BgImage} className="w-full h-full object-cover"></img>
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                {/* <h1 className="text-xl text-[#060606] font-semibold">RIGHT-RENTAL</h1> */}
                <div className="w-full flex flex-col max-w-[500px]">
                    <div className="w-full flex flex-col mb-2">
                        <h3 className="text-3xl font-semibold mb-2">Contact Us</h3>
                        {/* <p className="text-base mb-2">Rent a car in just a few steps.</p> */}
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-base mb-1" htmlFor="name">Your Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Please enter your name" 
                            className="pl-2 w-full text-black py-4 my-4 bg-transparent border border-black rounded-md" 
                        />
                        
                        <label className="text-base mb-1" htmlFor="email">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Please enter your mail" 
                            className="pl-2 w-full text-black py-4 my-4 bg-transparent border border-black outline-none focus:outline-none rounded-md" 
                        />
                        <label className="text-base mb-1" htmlFor="message">Your Message</label>
                        <textarea rows={8} cols={40} placeholder="Please enter your message" className="pl-2 w-full text-black border border-black outline-none focus:outline-none rounded-md"/>
                    </div>
                    <div className="w-full flex flex-col">
                        <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer">
                            Send Message    
                        </button>
                    </div>
                </div>

                {/* <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">Already have an account? <span className="font-semibold underline underline-offset-2 cursor-pointer">Log In</span></p>
                </div> */}
            </div>
        </div>
        <FooterNew />
        </div>
        
    )
}