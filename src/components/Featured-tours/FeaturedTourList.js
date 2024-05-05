import React, { useEffect } from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTours } from '../../reducers/TourSlice';

export default function FeaturedTourList() {
  const dispatch = useDispatch();
  const { tours, status, error } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Sort tours by creation date in descending order
  const sortedTours = tours.slice().sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
  // Select top 4 tours
  const featuredTours = sortedTours.slice(0, 4);

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={tour.id}>
          <TourCard {...tour} />
        </Col>
      ))}
    </>
  );
}
