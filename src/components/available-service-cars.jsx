import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { FooterNew } from "./footer-new";

export const AvailableServiceCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const { cars } = state || { cars: [] };
  const { service, car, bookingDetails } = state || {}; // Destructure bookingDetails and car

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust this value to set how many cars per page
  
  console.log("available-services state service: ", service);
  // Calculate the total number of pages
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  // Get the current cars to display based on pagination
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Handle the Rent Now button click
  const handleRentNow = (car) => {
    const totalDays = bookingDetails ? 
      Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 60 * 60 * 24)) : 
      0;
    
    const total_price = totalDays * car.price_per_day;
    navigate("/service-booking", { state: { service, car, bookingDetails, total_price } });
  };

  return (
    <>
      <Navbar />
      <div className="p-20 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Available Cars for - {service.service}</h1>

        {/* Booking Details Section */}
        <div className="mb-6 p-6 bg-white shadow rounded-md">
          <h2 className="text-xl font-bold mb-4">Service Booking Details</h2>
          {bookingDetails ? (
            <ul className="list-disc list-inside">
                <li><strong>Service:</strong> {service.service}</li>
              <li><strong>Pick-Up Location:</strong> {bookingDetails.pickUpLocation}</li>
              <li><strong>Drop-Off Location:</strong> {bookingDetails.dropOffLocation}</li>
              <li><strong>Start Date:</strong> {bookingDetails.startDate}</li>
              <li><strong>End Date:</strong> {bookingDetails.endDate}</li>
              <li><strong>Total Days:</strong> {Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 60 * 60 * 24))}</li>
            </ul>
          ) : (
            <p className="text-gray-500">No booking details available.</p>
          )}
        </div>

        {/* Available Cars Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Cars for Service</h2>
          <div className="grid gap-6">
            {currentCars.map((car, index) => {
              const totalDays = bookingDetails ? 
                Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 60 * 60 * 24)) : 
                0;
              const total_price = totalDays * car.price_per_day;

              return (
                <div key={index} className="bg-white p-6 rounded-md shadow flex items-center space-x-6">
                  <img src={car.image} alt={car.make} className="w-48 h-48 object-cover rounded-md" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
                    <p className="text-gray-600">Price per day: Rs.{car.price_per_day}</p>
                    <p className="text-gray-600">Total Price: Rs.{total_price}</p>
                    <button
                      onClick={() => handleRentNow(car)}
                      className="mt-4 bg-[#00df9a] text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="bg-[#00df9a] text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[#00df9a] text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <FooterNew />
    </>
  );
};
