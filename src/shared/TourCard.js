import React from 'react'
import {Card,CardBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating';
import { FaMapMarkerAlt } from 'react-icons/fa';
import TimeAgo from '../components/format-date/TimeAgo';
import { Flip, Zoom } from 'react-awesome-reveal';
export default function TourCard({id,create_at,price_per_person,nbr_people,end_date,start_date,desc,tour_title,cities,activities,transports,offer,staffs}) {
  const {type,host,reviews,images}=offer;
  const {client,rating}=reviews
  const tourImage = images.length > 0 && images[0].url? images[0].url : '';

  const { avgRating ,totalRating} = calculateAvgRating(reviews);

  
  return (
    <Zoom>
       <div className='tour__card'>
      <Card>
         <div className='tour__img'>
            <img src={tourImage} alt='tour' className='transition duration-300 transform hover:scale-105' />
            {<span> <TimeAgo timestamp={create_at} /></span>}
         </div>
         <CardBody>
         <div className='card__top d-flex align-align-items-center justify-content-between'>
              <span className='tour__location d-flex align-align-items-center gap-1'>
              <i class="ri-map-pin-fill"></i> {Object.values(cities)[0]}

              </span>
              <span className='tour__rating d-flex align-align-items-center gap-1'>
              <i class="ri-star-fill"></i> {avgRating===0 ? null : avgRating} 
              {totalRating===0 ? 'Not rated' : 
                      <span>({reviews.length})</span>}
                
              </span>
         </div>
         <h5 className='tour__title'>
         <Link to={`/tours/${id}`}>{tour_title.length > 25 ? `${tour_title.substring(0, 25)}...` : tour_title}</Link>
         </h5>
         <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
            <h5>{price_per_person}DH<span>/per person</span> </h5>
            <button className='btn booking__btn'>
              <Link to={`/tours/${id}`}> Book Now</Link>

            </button>
         </div>
      </CardBody>
      </Card>
    

    </div>
    </Zoom>
  )
}
