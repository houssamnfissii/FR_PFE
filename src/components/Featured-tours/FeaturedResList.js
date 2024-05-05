import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestoCard from '../../shared/RestoCard'; // Assuming you have a RestaurantCard component
import { Col } from 'reactstrap';

export default function FeaturedRestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/restaurants/restaurant_offers');
        setRestaurants(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort restaurants by creation date in descending order
  const sortedRestaurants = restaurants.slice().sort((a, b) => new Date(b.restaurant.created_at) - new Date(a.restaurant.created_at));
  // Select top 4 restaurants
  const featuredRestaurants = sortedRestaurants.slice(0, 4);

  return (
    <>
      {featuredRestaurants.map((restaurant) => (
        <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={restaurant.restaurant.id}>
          <RestoCard offer={restaurant.offer} restaurant={restaurant.restaurant} />
        </Col>
      ))}
    </>
  );
}
