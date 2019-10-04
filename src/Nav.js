import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import ActivitiesContext from './ActivitiesContext'

class Nav extends React.Component {
    static contextType = ActivitiesContext

    handleDisplayOrg = () => {
        if (this.props.org == null) {
            return (<p>Select or sign in to your organization</p>)
        } else {
            const org = this.context.organizations.find(org => org.id === this.props.org)
            return (
            <>
                <p>Now viewing activities for</p>
                <p>{org.name}</p>
            </>
            )
        }
    }

    render() {
        return (
            <nav role="navigation">
                <ul>
                    <li>
                        <Link to='/'>
                            Activities Assistant
                        </Link>
                    </li>
                    <li>
                        <Link to='/signin'>
                            Organizer Sign-in
                        </Link>
                    </li>
                </ul>
                {this.handleDisplayOrg()}
            </nav>
        )
    }
}

export default Nav;

