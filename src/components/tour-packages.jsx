import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdTimer, MdArrowBack,MdArrowForward  } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";



const ReverseArrow = () => (
    <MdArrowBack className="h-6 w-6 text-white-600" />
);

const ForwardArrow = () => (
    <MdArrowForward className="h-6 w-6 text-white-600" />
);

const sdata = [
    {   
        id: 1,
        name: 'Pokhara',
        img: '../assets/car9.jpeg',
        fare: 'Rs. 25000',
        time: '5-days'
    },
    {
        id:2,
        name: 'Mustang',
        img: '../assets/car8.jpeg',
        fare: 'Rs. 25000',
        time: '15-days'
    },
    {
        id: 3,
        name: 'ABC',
        img: '../assets/car7.jpeg',
        fare: 'Rs. 25000',
        time: '10-days'
    },
    {
        id: 5,
        name: 'Tilicho',
        img: '../assets/car1.jpeg',
        fare: 'Rs. 25000',
        time: '8-days'
    },
    {
        id: 6,
        name: 'Chitwan',
        img: '../assets/car2.jpeg',
        fare: 'Rs. 25000',
        time: '6-days'
    },
    {
        id: 7,
        name: 'Dhulikhel',
        img: '../assets/car3.jpeg',
        fare: 'Rs. 25000',
        time: '5-days'
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
export const TourPackages = () => {
    const [tourPackages, setTourPackages] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startLoc, setStartLoc] = useState("");
    const [endLoc, setEndLoc] = useState("");
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    // fetch packages
    useEffect(() => {
        // fetch('http://127.0.0.1:8000/api/packages/', {
            fetch('https://r-rental-backend.onrender.com/api/packages/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            setTourPackages(data)
            console.log("tour packages: ", data);
        })
        .catch(err => setError(err.message));
    }, []);
    const handleRentNow = (tourPackages) => {
        setSelectedPackage(tourPackages);
        setShowForm(true);
    };

    const handleSearch = async (e) => {
        if (!startDate || !endDate || !startLoc) {
            alert("Please fill out all fields before searching!");
            return;
        }
        try {
            const response = await fetch(
            //   `http://localhost:8000/api/available-cars/?start_date=${startDate}&end_date=${endDate}`
              `https://r-rental-backend.onrender.com/api/available-cars/?start_date=${startDate}&end_date=${endDate}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch available vehicles.");
            }
            const data = await response.json();

            const bookingDetails = {
              pickUpLocation: startLoc,
            //   dropOffLocation: endLoc,
              startDate: startDate,
              endDate: endDate
              };
            
            console.log({
              cars: data,
              bookingDetails: bookingDetails
        });
       
        navigate("/available-tourPackage-cars", {
            state: {
                tourPackage: selectedPackage,
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
        setSelectedPackage(null);
    };

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="w-full bg-white py-10 px-4">
            <div>
                <h1 className="md:text-4xl sm:text-6xl text-4xl font-bold md:py-2 text-center">TOUR PACKAGES</h1>
                <p className="text-[#00df9a] font-bold p-1 text-center">Discover unforgettable adventures with our curated tour packages designed to explore the world's hidden gems and vibrant cultures!</p>
            </div>
            <div className="w-3/4 m-auto">
                <div className="mt-20 relative">
                    <Slider {...settings}>
                    {tourPackages.map((d) => (
                        <div key={d.id} className="bg-white h-[400px] w-[400px] text-black rounded-xl mx-2 border border-gray-300 shadow-md p-2">
                        <div className="rounded-t-xl bg-indigo-500 flex justify-center items-center h-2/3">
                            <img src={d.cars[0].image} alt="" className="object-cover h-full w-full"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 pb-8 px-4">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <p className="text-[#0e1815] font-extrabold">{d.package}</p>
                                    <p className="text-[#00df9a] font-bold">{d.price}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex items-center text-gray-600 alig">
                                    <MdTimer className="mr-2" />
                                    <span>{d.duration}</span>
                                </div>
                                <button
                                 className="bg-black text-[#00df9a] w-full rounded-md font-medium py-3 hover:bg-gray-800 transition"
                                 onClick={() => handleRentNow(d)}
                                >
                                    Buy Now
                                </button>
                            </div>
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
                            <h2 className="text-2xl font-semibold mb-4">Book {selectedPackage.package}</h2>
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
                                {/* <div className="mb-4">
                                    <label className="block font-medium text-black">End Location</label>
                                    <input
                                        type="text"
                                        className="border w-full p-2 rounded-md"
                                        value={endLoc}
                                        onChange={(e) => setEndLoc(e.target.value)}
                                    />
                                </div> */}
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
        </div>
    )
}
