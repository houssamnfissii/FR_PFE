import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import {Container,Row,Col} from 'reactstrap'
import experienceImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle';
import { useInView } from 'react-intersection-observer';

import ServiceList from '../services/ServiceList';

import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';
import FeaturedCarList from '../components/Featured-tours/FeaturedCarList';
import CommonSection from '../shared/CommonSection';
import video from '../assets/images/hero-video.mp4';
import FeaturedHotelList from '../components/Featured-tours/FeaturedHotelList';
import FeaturedRestaurantList from '../components/Featured-tours/FeaturedResList';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeaderV1 from '../components/Header/HeaderV1';
import Footer from '../components/Footer/Footer';
function AnimatedCounter({ start, end, duration, text }) {
    const [count, setCount] = useState(start);
  
    useEffect(() => {
      if (start === 0) {
        const increment = end / duration;
        let currentValue = start;
        const interval = setInterval(() => {
          if (currentValue >= end) {
            clearInterval(interval);
            currentValue = end;
          }
          setCount(currentValue);
          currentValue += increment;
        }, 1); // Decreased from 1000ms to 500ms for faster animation
        return () => clearInterval(interval);
      }
    }, [start, end, duration]);
  
    return (
      <div className='counter__box'>
        <span className='counter__number'>{Math.floor(count)}</span>
        <h6 className='counter__text'>{text}</h6>
      </div>
    );
}

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  return (
    <>
    <HeaderV1/>

    {/* hero section start */}
    <section className="relative bg-center bg-no-repeat bg-gray-700 lg:mt-24">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0 p-0"
      >
        <source src={video} type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        MoroccanExplorer: Your Gateway to Seamless Travel
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
        Unlock Morocco's Wonders with Effortless Booking of Cars, Hotels, Tours, and Food Experiences.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#id"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
         
        </div>
      </div>
    </section>
         {/* hero section end */}

         <section >
            <Container>
                <Row>
                    <Col lg='3'>
                        <h5 className='services__subtitle'>What we serve</h5>
                        <h2 className='services__title'>We offer our best services</h2>
                    </Col>
                    <ServiceList/>
                </Row>
            </Container>
         </section>

          {/* featured  tour section start */}

          <section id='id'>
              <Container>
                 <Row>
                    <Col lg='6' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Tours
                         </h2>
                    </Col>
                    <Col lg='6' className=' d-flex justify-end align-items-center'>
                    <div className='SeeMore'><Link to='/tours'>See More</Link></div>
                      <FaArrowRight className='text-3xl text-blue-800' />
                      
                    </Col>
                    <FeaturedTourList/>
                 </Row>
              </Container>
          </section>
          <section>
              <Container>
                 <Row>
                    <Col lg='6' className='mb-5 '>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Cars
                         </h2>
                    </Col>
                    <Col lg='6' className=' d-flex justify-end align-items-center'>
                    <div className='SeeMore'><Link to='/cars'>See More</Link></div>
                      <FaArrowRight className='text-3xl text-blue-800' />
                      
                    </Col>
                    <FeaturedCarList/>
                 </Row>
              </Container>
          </section>
          <section>
              <Container>
                 <Row>
                    <Col lg='6' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Hotels
                         </h2>
                    </Col>
                    <Col lg='6' className=' d-flex justify-end align-items-center'>
                    <div className='SeeMore'><Link to='/hotels'>See More</Link></div>
                      <FaArrowRight className='text-3xl text-blue-800' />
                      
                    </Col>
                    <FeaturedHotelList/>
                 </Row>
              </Container>
          </section>
      
          <section>
              <Container>
                 <Row>
                    <Col lg='6' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Restaurant
                         </h2>
                    </Col>
                    <Col lg='6' className=' d-flex justify-end align-items-center'>
                    <div className='SeeMore'><Link to='/restaurants'>See More</Link></div>
                      <FaArrowRight className='text-3xl text-blue-800' />
                      
                    </Col>
                    <FeaturedRestaurantList/>
                 </Row>
              </Container>
          </section>
          {/* featured  tour section end */}

          {/* Experience section start */}

          <section>
              <Container>
                 <Row>
                 <Col lg='6'>
      <div className='experience__content' ref={ref}>
        <Subtitle subtitle={'Experience'} />
        <h2 className=''>
          with our all experience <br /> we will serve You
        </h2>
        <p>
          lorem ipsum dolor sit amet, <br />
          consecteturlorem ipsum dolor
        </p>
      </div>
      <div className='counter__wrapper d-flex align-items-center gap-5'>
        <AnimatedCounter start={isVisible ? 0 : 100} end={1200} duration={2000} text="Successfull Offers" />
        <AnimatedCounter start={isVisible ? 0 : 100} end={200} duration={2000} text="Regular clients" />
        <AnimatedCounter start={isVisible ? 0 : 100} end={20} duration={2000} text="Years experience" />
      </div>
    </Col>
                    <Col lg='6'>
                        <div className='exprience__img'>
                            <img src={experienceImg} alt='hero-img' />
                        </div>
                    </Col>
                    
                 </Row>
              </Container>
          </section>
          {/* Experience section end */}

          {/* Gallery section start */}
          <section>
          <Container>
                 <Row>
                    <Col lg='12' >
                         <Subtitle subtitle={'Gallery'}/>
                         <h2 className='gallery-title'>
                                Visit our customers tour gallery
                         </h2>
                    </Col>
                    <Col lg='12' >
                       <MasonryImagesGallery/>
                    </Col>
                    
                 </Row>
              </Container>
          </section>

          {/* Gallery section end */}

          {/* testimonial section start */}

          <section>
          <Container>
                 <Row>
                    <Col lg='12'  >
                         <Subtitle subtitle={'Fans Love'}/>
                         <h2 className='testimonial-title'>
                                What our fans say about us
                         </h2>
                         {/* <Testimonials/> */}
                    </Col>
                 </Row>
              </Container>
          </section> 
          <section>
          <Container>
                 <Row>
                    <Col lg='12'  >
                    <Newsletter/>
                    </Col>
                    <ScrollToTopButton />
                 </Row>
              </Container>
          </section> 

          {/*  testimonial section end */}
          <Footer/>
    </>
  )
}



