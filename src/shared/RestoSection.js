import React from 'react';
import './common-section.css';
import video from '../assets/images/RestoSection.mp4'
import { Container, Row, Col } from 'reactstrap';

export default function RestoSection({ title }) {
  return (
    <section className="common__section lg:mt-24">
      <video autoPlay loop muted className="video-background">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <Container>
          <Row>
            <Col lg={{ size: 6, offset: 3 }} className="text-center">
              <h1 className="cool-title">{title}</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
