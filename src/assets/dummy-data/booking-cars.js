import { useEffect, useState } from "react";
import car01 from "../images/car-01.png";
import car02 from "../images/car-02.png";
import car03 from "../images/car-03.png";
import car04 from "../images/car-04.png";
import car05 from "../images/car-05.png";
import car06 from "../images/car-06.png";

// const bookingCars = [
//   {
//     id: "01",
//     carName: "Porshe 718 Cayman S",
//     category: "Audi",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 89,
//     imgUrl: car01,
//   },
//   {
//     id: "02",
//     carName: "Porshe 718 Cayman S",
//     category: "Toyota",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 59,
//     imgUrl: car02,
//   },
//   {
//     id: "03",
//     carName: "Porshe 718 Cayman S",
//     category: "Bmw",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 109,
//     imgUrl: car03,
//   },
//   {
//     id: "04",
//     carName: "Porshe 718 Cayman S",
//     category: "Coupe",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 99,
//     imgUrl: car04,
//   },
//   {
//     id: "05",
//     carName: "Porshe 718 Cayman S",
//     category: "Bmw",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 109,
//     imgUrl: car05,
//   },
//   {
//     id: "06",
//     carName: "Porshe 718 Cayman S",
//     category: "Toyota",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 89,
//     imgUrl: car06,
//   },
//   {
//     id: "07",
//     carName: "Porshe 718 Cayman S",
//     category: "Audi",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 89,
//     imgUrl: car01,
//   },
//   {
//     id: "08",
//     carName: "Porshe 718 Cayman S",
//     category: "Toyota",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 59,
//     imgUrl: car02,
//   },
//   {
//     id: "09",
//     carName: "Porshe 718 Cayman S",
//     category: "Bmw",
//     type: "Manual",
//     groupSize: 4,
//     rentPrice: 109,
//     imgUrl: car03,
//   },
// ];

// const bookingCars = [
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89
//   },
//   {
//     id: "02",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89
//   },  
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
//   {
//     id: "01",
//     car: {
//       model: "Porshe 718 Cayman S",
//       make: "Audi",
//       fuel_type: "Petrol",
//       seat_capacity: 4,
//       image: 'http://localhost:8000/media/cars/toyota-corrola_sttbYkQ.jpg',
//     },
//       total_price: 89,
    
//   },
// ];

const bookingCars = async () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  
  // const fetch_detail_url = role === 'admin' ? "http://localhost:8000/api/bookings/detail": "http://localhost:8000/api/bookings/"
  const fetch_detail_url = role === 'admin' ? "https://r-rental-backend.onrender.com/api/bookings/detail": "https://r-rental-backend.onrender.com/api/bookings/"
  try {
    const response = await fetch(fetch_detail_url, {
      method: 'GET',
      headers: {
        "Authorization": `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log('booking_token: ', token);
    
    if (!response.ok){
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('booking data: ', data);
    const preocessedData = data.map(item => ({
      total_price: item.total_price,
      make: item.car?.make || null,
      model: item.car?.model || null,
      seat_capacity: item.car?.seat_capacity || null,
      image: item.car?.image || null,
      fuel_type: item.car?.fuel_type || null,
      status: item.status,
      username: item.user?.username || null,
      email: item.user?.email || null,

    }))
    console.log('preprocessedData: ',preocessedData);
    return preocessedData;
  } catch(error){
    console.error('Error fetching bookings: ', error);
  }
}

export default bookingCars;