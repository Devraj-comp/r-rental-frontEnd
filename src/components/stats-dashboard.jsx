import React from "react";
import {ReactTyped} from 'react-typed';
import BgImage from '../assets/car27.jpg';
import { MdOpacity } from "react-icons/md";

const bgImage = {
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // height: '100vh',
    filter: `opacity(0.6)`
}


export const StatsDashboard = () => {
    return (
        <main style={bgImage}>
            <div className="bgImage w-full text-white py-40 px-5 md:px-20">
                <div className="max-w-[1240px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-auto">
                        <div className="bg-gray-300 text-white rounded-lg flex flex-col justify-center h-full p-4 font-bold">
                            <p className="text-center p-4">2500+</p>
                            <p className="text-center p-4">No. of Vehicles</p>
                        </div>
                        <div className="bg-gray-300 text-white rounded-lg flex flex-col justify-center h-full p-4 font-bold">
                            <p className="text-center p-4">2500+</p>
                            <p className="text-center p-4">Annual Customers</p>
                        </div>
                        <div className="bg-gray-300 text-white rounded-lg flex flex-col justify-center h-full p-4 font-bold">
                            <p className="text-center p-4">2500+</p>
                            <p className="text-center p-4">No. of Drivers</p>
                        </div>
                        <div className="bg-gray-300 text-white rounded-lg flex flex-col justify-center h-full p-4 font-bold">
                            <p className="text-center p-4">25</p>
                            <p className="text-center p-4">Years of Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
    )
}