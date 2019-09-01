import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import './About.css';
import gif from './assets/about.svg';
import officers from './images';

class About extends React.Component {
  render() {
    console.log(officers);

    return (
      <div>
        <Container fluid className="about-us">
          <div>
            <h1>About Us</h1>
            <p>
              CougarCS is the largest student run Computer Science organization
              at the University of Houston. At CougarCS, our mission is to
              smoothly transition our inexperienced members into young
              professionals by the end of their degree, and to provide support
              and assistance to members who struggle academically or who need
              career guidance.
            </p>
          </div>
          <img src={gif} alt="undraw svg"></img>
        </Container>

        <Container fluid className="officerCard">
          <h1>Meet the Officers</h1>
          <Row>
            <div className="officerImages">
              {officers.map(officer => (
                <Card key={officer.id}>
                  <Card.Img variant="top" src={officer.image} />
                  <br></br>
                  <Card.Body>
                    <Card.Title id="officerName">{officer.name}</Card.Title>
                    <h5 style={{ textAlign: 'center' }}>{officer.title}</h5>
                    <p style={{ textAlign: 'center' }}>@cougarcs.com</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
