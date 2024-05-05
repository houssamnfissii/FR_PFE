import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';
import TimeAgo from '../components/format-date/TimeAgo';
import { Zoom } from 'react-awesome-reveal';

export default function CarCard({ car, offer }) {
    console.log(offer);
    console.log(car);
    const { price_per_day, id, description, created_at, nbr_places, city_name, brand_name, model_name } = car;
    const { images, host, reviews } = offer;
    const { avgRating, totalRating } = calculateAvgRating(reviews);
    const tourImage = images.length > 0 && images[0].url ? images[0].url : '';

    return (
        <Zoom damping={0.1}>
                   <div className='tour__card'>
            <Card>
                <div className='tour__img'>
                    <Link to={`/cars/${id}`}>
                        <img src={tourImage} alt='tour' className='transition duration-300 transform hover:scale-105' />
                    </Link>
                    <span> <TimeAgo timestamp={created_at} /></span>
                </div>
                <CardBody>
                    <div className='card__top d-flex align-align-items-center justify-content-between'>
                        <span className='tour__location d-flex align-align-items-center gap-1'>
                            <i className="ri-map-pin-fill"></i> {city_name}
                        </span>
                        <span className='tour__rating d-flex align-align-items-center gap-1'>
                            <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
                            {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
                        </span>
                    </div>
                    <h5 className='tour__title'>
                        <Link to={`/cars/${id}`}>{model_name}</Link>
                    </h5>
                    <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
                        <h5>{price_per_day}DH<span>/per person</span> </h5>
                        <button className='btn booking__btn'>
                            <Link to={`/cars/${id}`}> Book Now</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
        </Zoom>
     
    );
}
