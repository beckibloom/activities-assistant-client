import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import TokenService from '../../services/token-service';
import BannerImage from '../../images/favicons/android-chrome-512x512.png';

class Nav extends React.Component {
  static contextType = ActivitiesContext;

  handleSignIn = (e) => {
    e.preventDefault();
    this.props.history.push('/signin');
  };

  handleSignOut = (e) => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.context.updateAdminStatus(null);
    this.context.clearOrg();
    this.props.history.push('/');
  };

  handleLeaveOrg = (e) => {
    e.preventDefault();
    this.context.clearOrg();
    this.props.history.push('/');
  };

  handleDisplaySignInOut = () => {
    if (TokenService.hasAuthToken() === false) {
      return (
        <button className="nav-button" onClick={this.handleSignIn}>
          Organizer Sign In
        </button>
      );
    } else {
      return (
        <button className="nav-button" onClick={this.handleSignOut}>
          Organizer Sign Out
        </button>
      );
    };
  };

  render() {
    return (
        <nav role="navigation">
            <ul>
                <li>
                    <Link to='/'>
                        <img src={BannerImage} alt="Activities Assistant Logo" className="banner-image" />
                    </Link>
                </li>
                <li>
                    {this.handleDisplaySignInOut()}
                </li>
            </ul>
        </nav>
    );
  };
};

export default withRouter(Nav);