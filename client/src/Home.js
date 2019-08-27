import React from 'react';
import { Carousel } from 'react-bootstrap';
import bgImg from './assets/cougarcs_background1.jpg';
function Main() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={bgImg} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Main;
