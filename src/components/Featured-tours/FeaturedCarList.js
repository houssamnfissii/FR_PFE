import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../../shared/CarCard';
import { Col } from 'reactstrap';

export default function FeaturedCarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars/car_offers');
        setCars(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort cars by creation date in descending order
  const sortedCars = cars.slice().sort((a, b) => new Date(b.car.created_at) - new Date(a.car.created_at));
  // Select top 4 cars
  const featuredCars = sortedCars.slice(0, 4);

  return (
    <>
      {featuredCars.map((ccar) => (
        <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={ccar.car.id}>
          <CarCard offer={ccar.offer} car={ccar.car} />
        </Col>
      ))}
    </>
  );
}
