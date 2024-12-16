import React, { useState } from "react";


import { Navbar } from './navbar';
import { Base } from './base';
import { StatsDashboard } from './stats-dashboard';
import { TourPackages } from './tour-packages';
import { FooterNew } from './footer-new';
import { ExploreDashboard } from './explore-dashboard';
import { LandingFormNext } from "./landing-form-new";
import { ExploreCars } from "./explore-cars";


function HomePage() {
    // const [showLogin, setShowLogin] = useState(false)
    return(
        <div className="App bg-black">
            <Navbar />
            <Base />
            <ExploreCars />
            {/* <LandingFormNext /> */}
            <ExploreDashboard />
            <StatsDashboard />
            <TourPackages />
            <FooterNew />
        </div>
    )
}

export default HomePage;