import React, { useState } from 'react';
import axios from 'axios';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/emails', { email });
      setSubscribed(true);
    } catch (error) {
      console.error('Error subscribing:', error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setEmailError(error.response.data.message);
      } else {
        setEmailError('Error subscribing. Please try again later.');
      }
    }
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row className='align-items-center flex-column-reverse flex-lg-row'>
          <Col lg='6'>
            <div className='newsletter__content'>
              {subscribed ? (
                <h4 className="text-lg md:text-sm lg:text-xs xl:text-5xl">Thank you for subscribing!</h4>
              ) : (
                <>
                  <h4 className="text-lg md:text-sm lg:text-xs xl:text-5xl">Subscribe now to get useful traveling information.</h4>
                  <div className='newsletter__input'>
                    <input type='text' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='btn newsletter__btn lg:text-xs xl:text-5xl' onClick={handleSubscribe}>Subscribe</button>
                  </div>
                  {emailError && <p className="text-red-800">{emailError}</p>}
                </>
              )}
            </div>
          </Col>
          <Col lg='6'>
            <div className='newsletter__img'>
              <img src={maleTourist} alt='male-tourist' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
