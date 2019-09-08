import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import gif from '../../assets/member.svg';
// import { container } from 'googleapis/build/src/apis/container';

class Membership extends React.Component {
  render() {
    return (
      <div>
        <Container fluid style={{ padding: '2em' }}>
          <Row>
            <Col>
              <Row>
                <div className="membership">
                  <h1>Membership</h1>
                  <p>
                    CougarCS offers students exclusive access to a variety of
                    events and resources aimed at career preparedness.
                    Throughout every semester, we host dozens of technical
                    workshops, information sessions, and programming challenges.
                    Technical workshops and information sessions, often hosted
                    by Fortune 100 companies, cover a broad spectrum of topics
                    such as resume critiques, career fair preparation, mock
                    interviews and much more. Our programming challenges offer
                    our members a chance to showcase their problem solving
                    skills in a high energy environment, compete with their
                    peers, and earn prizes. In addition to these events, we also
                    provide weekly tutoring and academic support. CougarCS also
                    has a far reaching network of alumni who are industry
                    professionals and are always looking to connect with current
                    members!
                  </p>
                  <p>
                    Memberships are priced at{' '}
                    <strong>$50.00 for a full year </strong> or{' '}
                    <strong>$30.00 a semester</strong>. If you are interested in
                    becoming a member there are a few ways you can let us know.
                    Request to become a member on the get involved page and our
                    Treasurer, Conrad Parker, will be incontact with you
                    shortly. You can also find an Officer on the 5th floor of
                    PGH (Philip Guthrie Hoffman Hall) or email{' '}
                    <a href="mailto:Info@CougarCS.com">Info@cougarcs.com</a>.
                  </p>
                  <p>
                    Whats that? You want to get more envolved with CougarCS?
                    Interesting webdev or helping out at a hackathon or capture
                    the flag event? Lets get you in contact with our ????????
                    What about becoming a tutor or hosting a an event? For that
                    you can contact ???????????????????.
                  </p>
                </div>
              </Row>
              <Row>
                <div>
                  <p></p>
                </div>
              </Row>
            </Col>
            <Col>
              <img src={gif} alt="undraw svg" style={{ width: '100%' }}></img>
            </Col>
          </Row>
          <Row>
            <div>
              <h1>Something we missed?</h1>
              <h2>Email us at Info@cougarcs.com</h2>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Membership;
