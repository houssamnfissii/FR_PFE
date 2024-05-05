import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Weather Forecast",
    desc: "",
  },
  {
    imgUrl: guideImg,
    title: "best Tour Guide",
    desc: "",
  },
  {
    imgUrl: customizationImg,
    title: "customization",
    desc: "",
  },
]
export default function ServiceList() {
  return (
    <>
    {
        servicesData.map((service, index) => {
          return (
            <Col xs="12" sm="6" lg='3' key={index}>
              <ServiceCard
                item={service}
              />
            </Col>
          )
        })
    }
    </>
  )
}
