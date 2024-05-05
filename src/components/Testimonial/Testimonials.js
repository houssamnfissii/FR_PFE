import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await axios.get('http://localhost:8000/api/getReviewsTopRat');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    }

    fetchTestimonials();
  }, []);
  const settings={
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlices: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Slider {...settings}>
    {testimonials.map((testimonial, index) => (
      <div key={index} className='testimonial py-4 '>
        <p>{testimonial.body}</p>
        <div className='d-flex align-items-center gap-4 mt-3'>
          <img src={testimonial.client.image} className='w-16 h-16 rounded-2' alt='' />
          <div>
            <h6 className='mb-0 mt-3'>{testimonial.client.first_name} {testimonial.client.last_name}</h6>
            <p>Client</p>
          </div>
        </div>
      </div>
    ))}
  </Slider>
  )
}
