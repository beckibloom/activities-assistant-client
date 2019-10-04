import React from 'react'
import {Link} from 'react-router-dom'
import Activity from './Activity';
import './ActivitiesList.css'
import ActivityFilters from './ActivityFilters';
import ActivitiesContext from './ActivitiesContext';


class ActivitiesList extends React.Component {
    static contextType = ActivitiesContext

    handleDisplayAdminAddLink = () => {
        if (this.context.admin === true) {
            return (
                <div className='add-activity'>
                    <Link to='/addactivity'>
                        Add new activity
                    </Link>
                </div>
            )
        }
    }

    getUserObj(context, props) {
        const username = props.match.params.username
        const user = context.users.find(user => user.username === username)
        return user
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
                                    user={this.getUserObj(context, this.props)}
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