import './App.css';
import { Login } from './components/login';
import { Register } from './components/signup';
import HomePage from './components/homepage';
import React, {useState} from 'react';
import { AboutUs } from './components/about';
import { Blog } from './components/blog';
import { Contact } from './components/contact';
import { Partner } from './components/partner';
import { Hire } from './components/hire';
import { Layout } from './components/Layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AvailableCars } from './components/available-cars';
import { BookingPage } from './components/booking-page';
import { TourBookingPage } from './components/tour-booking-page';
import { ServiceBookingPage } from './components/service-booking-page';
import { AvailableServiceCars } from './components/available-service-cars';
import { AvailableTourPackageCars } from './components/available-tourPackage-cars';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/partner' element={<Partner />} />
        <Route path='/*' element={<Layout />} />
        <Route path='/hire' element={<Hire />} />
        <Route path='/available-cars' element={<AvailableCars />} />
        <Route path='/available-service-cars' element={<AvailableServiceCars />} />
        <Route path='/available-tourPackage-cars' element={<AvailableTourPackageCars />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/service-booking' element={<ServiceBookingPage />} />
        <Route path='/tour-booking' element={<TourBookingPage />} />
        {/* <Route path='/*' element={<Layout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

