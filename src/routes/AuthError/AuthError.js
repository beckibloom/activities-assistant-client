import React from 'react';
import {Link} from 'react-router-dom';
import KidBuildingPhoto from '../../images/kid-buildingg.jpg';

class AuthError extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>Uh oh!</h1>
        </header>

        <img src={KidBuildingPhoto} alt='Child hammering a nail' className="banner-img"/>

        <section className="error-section">
          <p className="error">It looks like you don't have access to the page you're trying to view.</p>
          <p><Link to="/">Return to Activities Assistant Home</Link></p>
          <p><Link to="/signin">Log in as an activity organizer</Link></p>
        </section>                    
      </>
    )
  }
};

export default AuthError;