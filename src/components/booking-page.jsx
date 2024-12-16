import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./navbar";
import { FooterNew } from "./footer-new";

export const BookingPage = () => {
    const { state } = useLocation();  // Get the state passed from navigate
    const { car, bookingDetails } = state || {};  // Destructure bookingDetails and car

    console.log('Booking State: ', state);
    const { pickUpLocation, dropOffLocation, startDate, endDate } = bookingDetails || {};

    const [status, setStatus] = useState('Pending');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            start_location: pickUpLocation,
            end_location: dropOffLocation,
            start_date: startDate,
            end_date: endDate,
            status: status,
            car: car?.id,  // Use car's ID
            user: localStorage.getItem("id"),
        };

        const token = localStorage.getItem("access_token");
        if (!token) {
            console.log("No access token found. User might not be logged in.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/bookings/create/", {
                method: 'POST',
                headers: {
                    "Authorization": `JWT ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Car booked successfully!");
                console.log("Booking Response: ", data);
            } else {
                const data = await response.json();
                console.error(data.errors || "Something went wrong.");
            }
        } catch (err) {
            console.error("Error Connecting to the server.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gray-100 p-20">
                <h2 className="text-2xl font-semibold text-black mb-4">Booking Car</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car Details Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Car Details</h3>
                        {car ? (
                            <div>
                                <img
                                    src={car.image}
                                    alt={car.make}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <ul className="space-y-2">
                                    <li><strong>Make:</strong> {car.make}</li>
                                    <li><strong>Model:</strong> {car.model}</li>
                                    <li><strong>Price Per Day:</strong> Rs.{car.price_per_day}</li>
                                    <li><strong>Seats:</strong> {car.seats}</li>
                                    <li><strong>Fuel Type:</strong> {car.fuel_type}</li>
                                </ul>
                            </div>
                        ) : (
                            <p>No car details available.</p>
                        )}
                    </div>

                    {/* Booking Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Booking Information</h3>
                        {bookingDetails ? (
                            <ul className="space-y-2">
                                <li><strong>Pick-Up Location:</strong> {pickUpLocation}</li>
                                <li><strong>Drop-Off Location:</strong> {dropOffLocation}</li>
                                <li><strong>Start Date:</strong> {startDate}</li>
                                <li><strong>End Date:</strong> {endDate}</li>
                                <li>
                                    <strong>Total Days:</strong> 
                                    {startDate && endDate
                                        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
                                        : 0}
                                </li>
                                <li>
                                    <strong>Total Price:</strong> Rs.
                                    {startDate && endDate
                                        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * car?.price_per_day
                                        : 0}
                                </li>
                            </ul>
                        ) : (
                            <p>No booking details available.</p>
                        )}
                    </div>
                </div>

                {/* Booking Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6 col-span-2">
                    <h3 className="text-xl font-bold mb-4">Confirm Your Booking</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-black">Start Location</label>
                            <input
                                type="text"
                                value={pickUpLocation || ''}
                                readOnly
                                className="w-full p-2 rounded-md border"
                            />
                        </div>
                        <div>
                            <label className="block text-black">End Location</label>
                            <input
                                type="text"
                                value={dropOffLocation || ''}
                                readOnly
                                className="w-full p-2 rounded-md border"
                            />
                        </div>
                        <div>
                            <label className="block text-black">Start Date</label>
                            <input
                                type="date"
                                value={startDate || ''}
                                readOnly
                                className="w-full p-2 rounded-md border"
                            />
                        </div>
                        <div>
                            <label className="block text-black">End Date</label>
                            <input
                                type="date"
                                value={endDate || ''}
                                readOnly
                                className="w-full p-2 rounded-md border"
                            />
                        </div>
                        <div>
                            <label className="block text-black">Status</label>
                            <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 rounded-md border"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
            <FooterNew />
        </>
    );
};
