import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Mdpersonr, MdArrowBack,MdArrowForward  } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { LoginSignupToggle } from "./loginsignup-pop";
import { Navigate, useNavigate } from "react-router-dom";



const ReverseArrow = () => (
    <MdArrowBack className="h-6 w-6 text-white-600" />
);

const ForwardArrow = () => (
    <MdArrowForward className="h-6 w-6 text-white-600" />
);

// const tooglePopup = () => {
//     setShowLogin(!showLogin);
//     setIsLogin(true);
// }

const satat = [
    {
        name: 'Pick and Drop inside New-Road',
        img: '../assets/car9.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    },
    {
        name: 'Airport Pickup',
        img: '../assets/car8.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    },
    {
        name: 'VIP-Delegates-Car-Service',
        img: '../assets/car7.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    },
    {
        name: 'Domestic Tour Car-Service',
        img: '../assets/car1.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    },
    {
        name: 'Pick and Drop outside New-Road',
        img: '../assets/car2.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    },
    {
        name: 'Luggage transport inside KTM',
        img: '../assets/car3.jpeg',
        fare: 'Rs. 25000',
        person: '5'
    }
]
// slider arrow
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
export const ExploreDashboard = () => {
    const [service, setService] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startLoc, setStartLoc] = useState("");
    const [endLoc, setEndLoc] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/services/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setService(data))
            .catch(err => setError(err.message));
    }, []);

    const handleRentNow = (service) => {
        setSelectedService(service);
        setShowForm(true);
    };

    const handleSearch = async (e) => {
        if (!startDate || !endDate || !startLoc || !endLoc) {
            alert("Please fill out all fields before searching!");
            return;
        }
        try {
            const response = await fetch(
              `http://localhost:8000/api/available-cars/?start_date=${startDate}&end_date=${endDate}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch available vehicles.");
            }
            const data = await response.json();
      
            const bookingDetails = {
              pickUpLocation: startLoc,
              dropOffLocation: endLoc,
              startDate: startDate,
              endDate: endDate
              };
            
            console.log({
              cars: data,
              bookingDetails: bookingDetails
        });
        navigate("/available-service-cars", {
            state: {
                service: selectedService,
                cars: data,
                bookingDetails: bookingDetails
            },
        });
    } catch (error) {
        console.error("Error fetching available vehicles:", error);
        alert("An error occurred while fetching vehicles.");
      }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedService(null);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, rows: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, rows: 2 },
            },
        ],
    };

    return (
        <div className="w-full bg-white py-10 px-4">
            <div>
                <h1 className="md:text-4xl sm:text-6xl text-4xl font-bold md:py-2 text-center">
                    EXPLORE THE RIGHT CAR FLEET
                </h1>
                <p className="text-[#00df9a] font-bold p-1 text-center">
                    Discover unforgettable adventures with our curated tour packages!
                </p>
            </div>
            <div className="w-3/4 m-auto">
                <Slider {...settings}>
                    {service.map((d) => (
                        <div key={d.id} className="bg-white h-[400px] w-[400px] rounded-xl mx-2 shadow-md p-2">
                            <div className="rounded-t-xl flex justify-center items-center h-2/3">
                                <img src={d.cars[0].image} alt="" className="object-cover h-full w-full" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-4 px-4">
                                <p className="text-[#0e1815] font-extrabold">{d.service}</p>
                                <p className="text-[#00df9a] font-bold">{d.cars[0].price_per_day}</p>
                                <button
                                    onClick={() => handleRentNow(d)}
                                    className="bg-black text-[#00df9a] w-full rounded-md py-2"
                                >
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
                {showForm && (
                    <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="popup-form bg-white p-8 rounded-lg shadow-lg relative">
                            <button
                                onClick={handleCancel}
                                className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Book {selectedService.service}</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block font-medium text-black">Start Location</label>
                                    <input
                                        type="text"
                                        className="border w-full p-2 rounded-md"
                                        value={startLoc}
                                        onChange={(e) => setStartLoc(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium text-black">End Location</label>
                                    <input
                                        type="text"
                                        className="border w-full p-2 rounded-md"
                                        value={endLoc}
                                        onChange={(e) => setEndLoc(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium text-black">Start Date</label>
                                    <input
                                        type="date"
                                        className="border w-full p-2 rounded-md"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium text-black">End Date</label>
                                    <input
                                        type="date"
                                        className="border w-full p-2 rounded-md"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
