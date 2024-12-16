import React, { useEffect, useState } from "react";
import "../styles/bookings.css";

// import carData from "../assets/dummy-data/booking-cars.js";
import CarItem from "../components/UI/CarItem";
import bookingCars from "../assets/dummy-data/booking-cars.js";
import OrdersTable from "../components/UI/OrdersTable.jsx";
import ServiceOrdersTable from "../components/UI/ServiceOrderTable.jsx";
import TourPackageOrdersTable from "../components/UI/TourPackageOrderTable.jsx";

console.log("bookingcars data: ", bookingCars);

const TourPackageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [makeFilter, setMakeFilter] = useState("All");

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  }
  const handleMakeFilterChange = (e) => {
    setMakeFilter(e.target.value);
  }

  // apply filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    const matchesMake = makeFilter === 'All' || booking.make === makeFilter;
    
    return matchesStatus && matchesMake;
  });
  

  useEffect(() => {
    bookingCars()
    .then((data) => setBookings(data))
    .catch((err) => setError(err.message));
  }, []);
  console.log("bookings_jsxs data: ", bookings[0]);
  if(error){
    return <div>Error: {error}</div>
  }

  return (
    <div className="bookings bg-white">
      <div className="booking__wrapper">
        <h2 className="booking__title">Service Booking</h2>

        <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select onChange={handleStatusFilterChange}>
              {/* <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option> */}
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select onChange={handleMakeFilterChange}>
            <option value="All">All</option>
              <option value="Toyota">Toyota</option>
              <option value="Bmw">Bmw</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Audi">Audi</option>
            </select>
          </div>
        </div>

        <div className="booking__car-list">
          {/* {filteredBookings.length > 0 ? (
            filteredBookings.map((item) => <CarTable item={item} key={item.id} />)
          ) : (
            <p>No bookings available for the selected filter.</p>
          )} */}
          <TourPackageOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default TourPackageBookings;
