import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Mdpersonr, MdArrowBack,MdArrowForward  } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { LoginSignupToggle } from "./loginsignup-pop";

const ReverseArrow = () => (
    <MdArrowBack className="h-6 w-6 text-white-600" />
);

const ForwardArrow = () => (
    <MdArrowForward className="h-6 w-6 text-white-600" />
);
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
export const ExploreCars = () => {
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startLoc, setStartLoc] = useState('');
    const [endLoc, setEndLoc] = useState('');
    const [status,setStatus] = useState('Pending');
    const [userId, setUserId] = useState('');
    const [selectedCarId, setSelectedCarId] = useState('');
    const [car, setCar] = useState(null);


    // fetch cars
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/cars/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then(response => {
              if (!response.ok){
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json()
          })
          .then(data => {
              setCars(data)
              console.log("test data: ", data[1]);
          })
          .catch(err => setError(err.message));
    }, []);

    const handleFormOpen = (car) => {
        setSelectedCar(car);
        // setUserId(car.id);
        setSelectedCarId(car.id);
        setShowForm(true);
    };
    const handleCloseForm = (car) => {
        setShowForm(false);
        setSelectedCar(null);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          start_location: startLoc,
          end_location: endLoc,
          start_date: startDate,
          end_date: endDate,
          status: status,
          car: selectedCarId,
          user: localStorage.getItem("id"),

      };
        const token = localStorage.getItem("access_token");
        const user = localStorage.getItem("user");
        if (!token){
          console.log("No access token found. User might not be logged in.");
          return;
        }
        if(!user) {
          console.error("No user information found. Ensure the user is logged in.");
          return;
        }
        try{
          const response = await fetch("http://localhost:8000/api/bookings/create/",{
            method: 'POST',
            headers: {
              "Authorization": `JWT ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          });
          if (response.ok){
            const data = await response.json();
            alert("Car Booked successfully!");
            setShowForm(false);
            console.log("Booking Response: ", data);
          } else{
            const data = await response.json();
            setError(data.errors || "Something went wrong.");
          }
        } catch (err){
          setError("Error Connecting to the server.");
          console.error(err);
        }
   }
    // fetch services
       const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 cards at a person
        slidesToScroll: 1,
        rows: 2, // Show 2 rows
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                },
            },
        ],
    };
    return(
        <div className="w-full bg-white py-10 px-4">
            <div>
                <h1 className="md:text-4xl sm:text-6xl text-4xl font-bold md:py-2 text-center">EXPLORE THE RIGHT CAR FLEET</h1>
                <p className="text-[#00df9a] font-bold p-1 text-center">Discover unforgettable adventures with our curated tour packages designed to explore the world's hidden gems and vibrant cultures!</p>
            </div>
            <div className="w-3/4 m-auto">
                <div className="mt-20 relative">
                    <Slider {...settings}>
                    {cars.map((d) => (
                        <div key={d.id} className="bg-white h-[400px] w-[400px] text-black rounded-xl mx-2 border border-gray-300 shadow-md p-2">
                        <div className="rounded-t-xl bg-indigo-500 flex justify-center items-center h-2/3">
                            <img src={d.image} alt="" className="object-cover h-full w-full"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 pb-8 px-4">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <p className="text-[#0e1815] font-extrabold">{d.make}</p>
                                    <p className="text-[#00df9a] font-bold">{d.price_per_day}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex items-center text-gray-600 alig">
                                    <IoIosPerson className="mr-2" />
                                    <span>{d.seat_capacity}</span>
                                </div>
                                <button onClick={() => handleFormOpen(d)} className="bg-black text-[#00df9a] w-full rounded-md font-medium py-3 hover:bg-gray-800 transition duration-300">Rent Now</button>
                            </div>
                        </div>
                    </div>  
                    ))}
                    </Slider>
                    {showForm && (
                        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div
                            className="popup-form bg-white p-8 rounded-lg shadow-lg relative max-w-3xl w-full h-[750px]"
                        >
                            <button
                                onClick={handleCloseForm}
                                className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-semibold mb-4 text-black">RENT</h2>
                    
                            {/* Booking Form */}
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="text" className="block font-medium text-black">
                                        Start Location
                                    </label>
                                    <input
                                        type="text"
                                        id="startLoc"
                                        className="border w-full p-2 rounded-md"
                                        required
                                        value={startLoc}
                                        onChange={(e) => setStartLoc(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="text" className="block font-medium text-black">
                                        End Location
                                    </label>
                                    <input
                                        type="text"
                                        id="endLoc"
                                        className="border w-full p-2 rounded-md"
                                        required
                                        value={endLoc}
                                        onChange={(e) => setEndLoc(e.target.value)}
                                    />
                                </div>
                    
                                <div className="mb-4">
                                    <label htmlFor="date" className="block font-medium text-black">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="border w-full p-2 rounded-md"
                                        required
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="date" className="block font-medium text-black">
                                        Return Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="border w-full p-2 rounded-md"
                                        required
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="status" className="block font-medium text-black">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        id="status"
                                        className="border w-full p-2 rounded-md"
                                        required
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white rounded-lg p-2 mt-4 w-full text-black"
                                >
                                    Confirm Booking
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}