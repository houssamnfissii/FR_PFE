import React from 'react'
import {Card,CardBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating';
import TimeAgo from '../components/format-date/TimeAgo';
import { Zoom } from 'react-awesome-reveal';
export default function RestoCard({restaurant,offer}) {
//   const tourImage = offer.images.length > 0 && offer.images.length[0].url? offer.images.length[0].url : '';

const {description,id,nbr_tables,latitude,longitude,created_at,cuisine_name,city_name,name}=restaurant

const {images,host,reviews}=offer
  const { avgRating ,totalRating} = calculateAvgRating(reviews);

  const tourImage = images.length > 0 && images[0].url? images[0].url : '';

  
  
  return (
    <Zoom>
        <div className='tour__card'>
      <Card>
         <div className='tour__img'>
            <img src={tourImage} alt='tour'  className='transition duration-300 transform hover:scale-105'/>
            {<span> <TimeAgo timestamp={created_at} /></span>}
         </div>
         <CardBody>
         <div className='card__top d-flex align-align-items-center justify-content-between'>
              <span className='tour__location d-flex align-align-items-center gap-1'>
              <i class="ri-map-pin-fill"></i> {city_name}

              </span>
              <span className='tour__rating d-flex align-align-items-center gap-1'>
              <i class="ri-star-fill"></i> {avgRating===0 ? null : avgRating} 
              {totalRating===0 ? 'Not rated' : 
                      <span>({reviews.length})</span>}
                
              </span>
         </div>
         <h5 className='tour__title'>
         <Link to={`/restaurants/${id}`}>{name}</Link>
         </h5>
         <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
             <h5>{cuisine_name}<span></span></h5>
            <button className='btn booking__btn'>
              <Link to={`/restaurants/${id}`}> Book Now</Link>

            </button>
         </div>
      </CardBody>
      </Card>
    

    </div>
    </Zoom>
  

  )
}
