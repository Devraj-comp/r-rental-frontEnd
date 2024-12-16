import React from "react";

import { Navbar } from './navbar';
import { FooterNew } from './footer-new';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdTimer, MdArrowBack,MdArrowForward  } from "react-icons/md";


const data = [
    {
        name: 'Profile-1',
        img: '../assets/man1.jpeg',
        profession: 'CEO-MediaHub',
    },
    {
        name: 'Profile-2',
        img: '../assets/man1.jpeg',
        profession: 'Journalist',
    },
    {
        name: 'Profile-3',
        img: '../assets/man1.jpeg',
        profession: 'Veteran Actor',
    },
    {
        name: 'Profile-4',
        img: '../assets/man1.jpeg',
        profession: 'Businessman',
    },
    {
        name: 'Profile-5',
        img: '../assets/man1.jpeg',
        profession: 'CEO-Nabil Bank',
    },
    {
        name: 'Profile-6',
        img: '../assets/man1.jpeg',
        profession: 'Professor',
    }
]
// slider arrow
const ReverseArrow = () => (
    <MdArrowBack className="h-6 w-6 text-white-600" />
);

const ForwardArrow = () => (
    <MdArrowForward className="h-6 w-6 text-white-600" />
);
const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer text-white bg-black rounded-full p-2 shadow-lg z-10"
            onClick={onClick}
        >
            {/* ➔ */}
            <ForwardArrow />
        </div>
    );
};
const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute left-4 top-[50%] transform -translate-y-1/2 cursor-pointer text-white bg-black rounded-full p-2 shadow-lg z-10"
            onClick={onClick}
        >
            {/* ➔ */}
            <ReverseArrow />
        </div>
    );
};

export const AboutUs = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    return (
        <div>
            <Navbar />
            <div className="w-full bg-white py-16 px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <img className='w-[500px] mx-auto my-4' src='../assets/car12.jpeg' alt="/" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">EXPLORE THE RIGHT CARS FLEET</p>
                        <h1 className="text-black md:text-4xl sm:text-3xl text-2xl font-bold py-2">ABOUT US</h1>
                        <p className="text-[#00df9a]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ipsum molestiae reiciendis. Maiores quos tenetur aliquam autem aperiam, nihil fugiat recusandae dolorum, adipisci eligendi tempora laborum, pariatur quae. Et, eveniet.
                        </p>
                        <button className="bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">Get Started</button>
                    </div>
                </div>
                <div className="w-full bg-white py-10 px-4">
            <div>
                <h1 className="md:text-4xl sm:text-6xl text-4xl font-bold md:py-2 text-center">Testimonials</h1>
                <p className="text-[#00df9a] font-bold p-1 text-center">Discover unforgettable adventures with our curated tour packages designed to explore the world's hidden gems and vibrant cultures!</p>
            </div>
            <div className="w-3/4 m-auto">
                <div className="mt-20 relative">
                    <Slider {...settings}>
                    {data.map((d) => (
                        <div className="bg-white h-[400px] w-[400px] text-black rounded-xl mx-2 border border-gray-300 shadow-md p-2">
                            <div className="rounded-t-xl bg-white flex justify-center items-center h-1/2">
                                <img src={d.img} alt="" className="h-32 w-32 rounded-full"/>
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-8 pb-8 px-4">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="text-center">
                                        <p className="text-[#0e1815] font-extrabold">{d.name}</p>
                                        <p className="text-[#0e1815] font-sm font-bold">{d.profession}</p>
                                        <h1 className="text-center justify-between">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id molestiae soluta quo beatae pariatur adipisci quis expedita facere earum!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    ))}
                    </Slider>
                </div>
            </div>
        </div>
            </div>
            <FooterNew />
        </div>
    )
}
