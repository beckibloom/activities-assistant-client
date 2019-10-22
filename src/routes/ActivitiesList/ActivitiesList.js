import React from 'react'
import {Link} from 'react-router-dom'
import Activity from '../../components/Activity/Activity';
import './ActivitiesList.css'
import ActivityFilters from '../../components/ActivityFilters/ActivityFilters';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import TokenService from '../../services/token-service'

class ActivitiesList extends React.Component {
    static contextType = ActivitiesContext

    handleDisplayAdminAddLink = () => {
        const loginStatus = TokenService.hasAuthToken()
        if (loginStatus === true) {
            return (
                <div className='add-activity'>
                    <Link to='/addactivity'>
                        Add new activity
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <ActivitiesContext.Consumer>

            {(context) => (
                <>
                    <header role="banner">
                        <h1>My Activities</h1>
                    </header>
        
                    <ActivityFilters />

                    {this.handleDisplayAdminAddLink()}
        
                    <section className="activities">
                        <ul>
                            {context.filteredActivities.map(activity =>
                                <Activity
                                    key={activity.id}
                                    details={activity}
                                    // history={this.props.history}
                                />)}
                        </ul>
                    </section>
                </>
            )}

            </ActivitiesContext.Consumer>
        )
    }
}

export default ActivitiesList