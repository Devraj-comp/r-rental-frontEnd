import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import BgImage from "../assets/car21.jpg";
import CartCar from "../assets/cart-car-1.jpg";
import { useNavigate } from "react-router-dom";

const bgImage = {
  backgroundImage: `url(${BgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const Base = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputStructure, setInputStructure] = useState({ rows: 2, cols: 2 });
  const [currentLabels, setCurrentLabels] = useState([]);
  const [buttonText, setButtonText] = useState("Find Vehicle");
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [selectedImage, setSelectedImage] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);  // Add state for booking details
  const navigate = useNavigate();
//   const history = useHistory();

  const updateInputStructure = (rows, cols) => {
    const key = `${rows}*${cols}`;
    setInputStructure({ rows, cols });
    setCurrentLabels(labels[key]);

    const newInputValues = Array(rows * cols).fill("");
    setInputValues(newInputValues);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleFindVehicle = async (e) => {
    const pickUpLoc = inputValues[0];
    const dropOffLoc = inputValues[1];
    const startDate = inputValues[2];
    const endDate = inputValues[3];

    console.log("pickup location: ", pickUpLoc);
  
    if (!startDate || !endDate) {
      alert("Please select both Pick Up Date and Drop Date.");
      return;
    }
  
    try {
      const response = await fetch(
        // `http://localhost:8000/api/available-cars/?start_date=${startDate}&end_date=${endDate}`
        `https://r-rental-backend.onrender.com/api/available-cars/?start_date=${startDate}&end_date=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch available vehicles.");
      }
      const data = await response.json();

      const bookingDetails = {
        pickUpLocation: pickUpLoc,
        dropOffLocation: dropOffLoc,
        startDate: startDate,
        endDate: endDate
        };
      
      console.log({
        cars: data,
        bookingDetails: bookingDetails
    });
      // Pass both the car data and booking details to the available-cars page
      navigate("/available-cars", {
        state: {
          cars: data,
          bookingDetails: bookingDetails
        },
      });
    // history.push({pathname: "/available-cars", state: {}})
      setAvailableVehicles(data);
    } catch (error) {
      console.error("Error fetching available vehicles:", error);
      alert("An error occurred while fetching vehicles.");
    }
  };

  const labels = {
    "2*2": ["Pick Up Location", "Drop Off Location", "Pick Up Date", "Drop Date"],
    "3*2": ["Pick Up Location", "Drop Off Location", "Pick Up Date", "Drop Date", "Vehicle Type"],
    "2*3": ["From", "To", "Start Date", "From Date", "To Date"],
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < inputStructure.rows; i++) {
      for (let j = 0; j < inputStructure.cols; j++) {
        const labelIndex = i * inputStructure.cols + j;
        const isDateInput = i === 1;
        if (i === 2 && j === 0){
          inputs.push(
            <div className="flex flex-col mb-0" key={`${i}-${j}`}>
              <label className="mb-1 text-sm font-medium text-black">
                {currentLabels[labelIndex]}
              </label>
              <input
                type={isDateInput ? "date" : "text"}
                className="border p-2 w-full h-8 text-lg text-black rounded-md"
                placeholder={isDateInput ? "date" : "Enter the location"}
                value={inputValues[labelIndex] || ""}
                onChange={(e) => handleInputChange(labelIndex, e.target.value)}
              />
            </div>
          );
          break;
        }
        inputs.push(
          <div className="flex flex-col mb-0" key={`${i}-${j}`}>
              <label className="mb-1 text-sm font-medium text-black">
                  {currentLabels[labelIndex]}
              </label>
              <input 
                  type={isDateInput ? "date" : "text"}
                  className="border p-2 w-full h-8 text-lg text-black rounded-md " 
                  placeholder={isDateInput ? "date" : "Enter the location"}
                  value={inputValues[labelIndex] || ""}
                  onChange={(e) => handleInputChange(labelIndex, e.target.value)}
              />
          </div>
        );
      }
    }
    return inputs;
  };

  const renderAvailableVehicles = () => {
    if (availableVehicles.length === 0) {
      return  <p className="text-black">
                {/* No vehicles available for the selected dates. */}
              </p>;
    }
    return availableVehicles.map((vehicle) => (
      <div key={vehicle.id} className="border p-2 rounded-md shadow-md text-black">
        <h3 className="font-bold">{vehicle.name}</h3>
        <p>{vehicle.description}</p>
      </div>
    ));
  };

  const renderBookingDetails = () => {
    if (!bookingDetails) return null;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold">Booking Details</h2>
        <p><strong>Pick Up Location:</strong> {bookingDetails.pickUpLoc}</p>
        <p><strong>Drop Off Location:</strong> {bookingDetails.dropOffLoc}</p>
        <p><strong>Pick Up Date:</strong> {bookingDetails.startDate}</p>
        <p><strong>Drop Off Date:</strong> {bookingDetails.endDate}</p>
      </div>
    );
  };

  return (
    <main style={bgImage}>
      <div className="bg-image text-white">
        <div className="max-w-[1240px] mt-[-96px] w-full h-[60vh] mx-auto text-center flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold p-2">COME RIDE WITH US</p>
          <h1 className="md:text-5xl sm:text-6xl text-4xl font-bold md:py-6">
            WELCOME TO RIGHT-RENTAL
          </h1>
          <div className="flex justify-center items-center">
            <p className="md:text-4xl sm:text-4xl text-xl font-bold py-4">We Are</p>
            <ReactTyped
              className="md:text-4xl sm:text-4xl text-xl font-bold pl-2"
              strings={["Fast", "Flexible", "Reliable"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          <p className="md:text-2xl text-xl font-bold text-gray-500">Live Young Live Free</p>
          <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Get Started
          </button>
        </div>
        <div className="bg-white max-w-[1240px] mx-auto mb-80 p-4 grid grid-cols-4 gap-6 rounded-md">
          <div className="grid grid-cols-3 gap-4 col-span-1">
            <div className="col-span-3 mb-1 flex justify-center">
              <h1 className="text-lg font-bold text-black">Select a Service</h1>
            </div>
            <div
              className={`bg-gray-100 p-2 cursor-pointer w-24 ${
                selectedImage === 1 ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => {
                updateInputStructure(2, 2);
                setButtonText("Find Vehicle");
                setSelectedImage(1);
              }}
            >
              <img src={CartCar} alt="" className="w-20 h-20 rounded-md mt-5 mb-2" />
              <h1 className="text-black text-sm font-bold whitespace-nowrap">Rent a Car</h1>
            </div>
            <div className={`bg-gray-100 p-2 cursor-pointer w-24 ${selectedImage === 2 ? 'border-2 border-blue-500' : ''}`} onClick={() => {
                      updateInputStructure(3, 2);
                      setButtonText('Find Driver');
                      setSelectedImage(2);
                  }}
                >
                <img src={CartCar}
                alt="" className="w-20 h-20 rounded-md mt-5 mb-2" />
                <h1 className="text-black text-sm font-bold whitespace-nowrap">Hire a Driver</h1>
            </div>
            <div className={`bg-gray-100 p-2 cursor-pointer w-24 ${selectedImage === 3 ? 'border-2 border-blue-500' : ''}`} onClick={() => {
                      updateInputStructure(2, 2);
                      setButtonText('Find Vehicle');
                      setSelectedImage(3);
                  }}
                >
                <img src={CartCar}
                alt="" className="w-20 h-20 rounded-md mt-5 mb-2" />
                <h1 className="text-black text-sm font-bold whitespace-nowrap">Self-Drive</h1>
              </div>
          </div>
          <div className="bg-white p-4 grid grid-cols-2 gap-4 col-span-3 h-72 overflow-auto">
            {renderInputs()}
            <div className="col-span-2 mt-0">
              <button
                className="bg-[#00df9a] text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleFindVehicle}
              >
                {buttonText}
              </button>
            </div>
            <div className="col-span-2 mt-4">{renderAvailableVehicles()}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
