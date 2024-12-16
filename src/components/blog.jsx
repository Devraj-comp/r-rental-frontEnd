import React from "react";

import { Navbar } from './navbar';
import { FooterNew } from './footer-new';

import RCar1 from '../assets/r-rental-1.jpg';
import RCar2 from '../assets/r-rental-2.jpg';
import RCar3 from '../assets/r-rental-3.jpg';

export const Blog = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full bg-gray-200 py-16 px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <img className='w-[500px] mx-auto my-4' src={RCar1} alt="/" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">EXPLORE THE RIGHT CARS FLEET</p>
                        <h1 className="text-[#00df9a] md:text-4xl sm:text-3xl text-2xl font-bold py-2">RIGHT-RENTAL BLOG</h1>
                        <p className="text-[#00df9a]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ipsum molestiae reiciendis. Maiores quos tenetur aliquam autem aperiam, nihil fugiat recusandae dolorum, adipisci eligendi tempora laborum, pariatur quae. Et, eveniet.
                        </p>
                        <button className="bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">Read Now</button>
                    </div>
                </div>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <img className='w-[500px] mx-auto my-4' src={RCar2} alt="/" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">EXPLORE THE RIGHT CARS FLEET</p>
                        <h1 className="text-[#00df9a] md:text-4xl sm:text-3xl text-2xl font-bold py-2">RIGHT-RENTAL BLOG</h1>
                        <p className="text-[#00df9a]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ipsum molestiae reiciendis. Maiores quos tenetur aliquam autem aperiam, nihil fugiat recusandae dolorum, adipisci eligendi tempora laborum, pariatur quae. Et, eveniet.
                        </p>
                        <button className="bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">Read Now</button>
                    </div>
                </div>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <img className='w-[500px] mx-auto my-4' src={RCar3} alt="/" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">EXPLORE THE RIGHT CARS FLEET</p>
                        <h1 className="text-[#00df9a] md:text-4xl sm:text-3xl text-2xl font-bold py-2">RIGHT-RENTAL BLOG</h1>
                        <p className="text-[#00df9a]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ipsum molestiae reiciendis. Maiores quos tenetur aliquam autem aperiam, nihil fugiat recusandae dolorum, adipisci eligendi tempora laborum, pariatur quae. Et, eveniet.
                        </p>
                        <button className="bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">Read Now</button>
                    </div>
                </div>
            </div>
            <FooterNew />
        </div>
    )
}
