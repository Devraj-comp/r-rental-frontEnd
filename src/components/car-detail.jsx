import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/cars/${carId}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.error('Error fetching car details:', error));
  }, [carId]);

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div>
      <img src={car.image} alt={car.make} />
      <h1>{car.make}</h1>
      <p>{car.description}</p>
      <button>
        Rent Now
      </button>
    </div>
  );
};

export default CarDetail;
