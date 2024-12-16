import React from "react";
import { jwtDecode } from 'jwt-decode';
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import HomePage from "../components/homepage";
import RenterDashboard from "../pages/Dashboard-Renter";
import Userboard from "../pages/Userboard";
import ServiceBookings from "../pages/ServiceBookings";
import TourPackageBookings from "../pages/TourPackageBooking";


const Router = () => {
  //Decode the token from localstorage
  const accessToken = localStorage.getItem('access_token');
  let userRole = null;
  if(accessToken){
    try{
      const decodeToken = jwtDecode(accessToken);
      console.log(decodeToken);
      userRole = decodeToken.role;
      console.log("this is a router role: ", decodeToken.role);
    } catch(error){
      console.log('Invalid token:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          userRole === 'admin' ? (
            <Navigate to="/dashboard" element={<Dashboard />} />  
          ) : (
            <Navigate to="/dashboard" element={<Dashboard />} />
          )
        }
      />
      {userRole === 'admin' && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/service-bookings" element={<ServiceBookings />} />
          <Route path="/tourPackage-bookings" element={<TourPackageBookings />} />
          <Route path="/userboard" element={<Userboard />} />
          <Route path="/sell-car" element={<SellCar />} />
          <Route path="/settings" element={<Settings />} />
        </> 
      )}
      {userRole === 'renter' && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<RenterDashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/service-bookings" element={<ServiceBookings />} />
          <Route path="/tourPackage-bookings" element={<TourPackageBookings />} />
          {/* <Route path="/userboard" element={<Userboard />} /> */}
          {/* <Route path="/sell-car" element={<SellCar />} /> */}
          <Route path="/settings" element={<Settings />} />
        </> 
      )}
      <Route path='*' element = {<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
