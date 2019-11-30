import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import GuestLogin from '../../components/GuestLogin/GuestLogin';
import TumblingPhoto from '../../images/tumblingphoto.jpg';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>Activities Assistant</h1>
        </header>

        <img src={TumblingPhoto} alt='Child participating in a tumbling club activity' className="banner-img"/>

        <section className="welcome">
          <p>
              Welcome to Activities Assistant! As a guest, you may select your school or community center to view the activities currently available for sign-up.
          </p>
          <p>
              If you organize activities for your organization, <Link to='/register'>sign up for an account</Link> to share your activity details to your community for ease of communication and program advertising.
          </p>
        </section>
        <GuestLogin /> 
      </>
    );
  };
};

export default LandingPage;