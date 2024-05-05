import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from '../../shared/HotelCard';
import { Col } from 'reactstrap';

export default function FeaturedHotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hotels/hotel_offers');
        setHotels(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort hotels by creation date in descending order
  const sortedHotels = hotels.slice().sort((a, b) => new Date(b.hotel.created_at) - new Date(a.hotel.created_at));
  // Select top 4 hotels
  const featuredHotels = sortedHotels.slice(0, 4);

  return (
    <>
      {featuredHotels.map((hotel) => (
        <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={hotel.hotel.id}>
          <HotelCard offer={hotel.offer} hotel={hotel.hotel} />
        </Col>
      ))}
    </>
  );
}
