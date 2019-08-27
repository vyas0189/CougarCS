import React from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import bgImg from './assets/cougarcs_background1.jpg';
import officers from './images';

class About extends React.Component {
  render() {
    console.log(officers);

    return (
      <div>
        <Carousel style={{ marginLeft: '25%', height: '60vh', width: '50vw' }}>
          <Carousel.Item>
            <img
              style={{ height: '60vh', width: '20vw' }}
              className="d-block w-100"
              src={bgImg}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Container fluid>
          <Row
            style={{ marginTop: '2%', marginLeft: '1.5%', marginRight: '2%' }}
          >
            <div className="officerImages">
              {officers.map(officer => (
                <div>
                  <img className="d-block w-100" src={officer.image} />
                  <div
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Times New Roman'
                    }}
                  >
                    {officer.title}
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Times New Roman'
                    }}
                  >
                    {officer.name}
                  </div>
                </div>
              ))}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
