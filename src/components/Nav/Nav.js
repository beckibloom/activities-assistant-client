import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';
import ActivitiesContext from '../../contexts/ActivitiesContext'
import TokenService from '../../services/token-service'
import BannerImage from '../../images/logos/activities-assistant-headline.PNG';

class Nav extends React.Component {
    static contextType = ActivitiesContext

    handleDisplayOrg = () => {
        if (this.context.orgSelected == null) {
            return (<p>Select or sign in to your organization</p>)
        } else {
            const org = this.context.organizations.find(org => org.id === this.context.orgSelected)
            return (
            <>
                <p>Now viewing activities for</p>
                <p>{org.org_name}</p>
            </>
            )
        }
    }

    handleSignIn = (e) => {
        e.preventDefault()
        this.props.history.push('/signin')
    }

    handleSignOut = (e) => {
        e.preventDefault()
        TokenService.clearAuthToken()
        this.context.updateAdminStatus(null)
        this.context.clearOrg()
        this.props.history.push('/')
    }

    handleLeaveOrg = (e) => {
        e.preventDefault()
        this.context.clearOrg()
        this.props.history.push('/')
    }

    handleDisplaySignInOut = () => {
        if (TokenService.hasAuthToken() === false) {
            return (
                <button onClick={this.handleSignIn}>
                    Organizer Sign In
                </button>
            )
        } else {
            return (
                <button onClick={this.handleSignOut}>
                    Organizer Sign Out
                </button>
            )
        }
    }

    handleDisplayLeaveOrg = () => {
        if (this.context.admin === false && this.context.orgSelected !== null) {
            return (
                <button onClick={this.handleLeaveOrg}>
                    Leave this organization
                </button>
            )
        }
    }

    render() {
        return (
            <nav role="navigation">
                <ul>
                    <li>
                        <Link to='/'>
                            <img src={BannerImage} alt="Activities Assistant Logo" class="banner-image" />
                        </Link>
                    </li>
                    <li>
                        {this.handleDisplaySignInOut()}
                        {this.handleDisplayLeaveOrg()}
                    </li>
                </ul>
                {this.handleDisplayOrg()}
            </nav>
        )
    }
}

export default withRouter(Nav);

