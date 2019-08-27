import React from 'react';
import { Carousel } from 'react-bootstrap';
import bgImg from './assets/cougarcs_background1.jpg';
import './Home.css';
function Main() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="ani">
          <img className="firstImg" src={bgImg} alt="First slide" />
          <div className="firstD">
            <p className="firstP">Welcome to CougarCS</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Main;
