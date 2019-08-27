import React from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import bgImg from './assets/cougarcs_background1.jpg';
import pl from './assets/placeholder.jpg';

class About extends React.Component {
  render() {
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
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
            <div
              style={{
                marginLeft: '1%',
                marginRight: '1%',
                height: '20vh',
                width: '120px'
              }}
            >
              <img className="d-block w-100" src={pl} />
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Position
              </div>
              <div
                style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}
              >
                Name
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
