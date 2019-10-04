import React from 'react'
import {Link} from 'react-router-dom'
import './Activity.css'
import ActivitiesContext from './ActivitiesContext'

class Activity extends React.Component {
    static contextType = ActivitiesContext

    handleDisplayAdminControls = () => {
        if (this.context.admin === true) {
            return (
                <>
                <li>
                    <Link to={`/edit/${this.props.details.id}`}>Edit this activity</Link>
                </li>
                <li>
                    <Link to=''>Delete this activity</Link>
                </li>
                </>
            )
        }
    }

    render() {
        const activity = this.props.details
        return (
            <div className="activity">
                <img src={activity.thumbnail} alt={activity.name} className="thumbnail" />
                <ul>
                    <li>Activity name: {activity.title}</li>
                    <li>Day of week: {activity.day}</li>
                    <li>Time of day: {activity.time}</li>
                    <li>Ages: {activity.ages}</li>
                    <li>Activity Group: {activity.group}</li>
                    <li>Location: {activity.location}</li>
                    <li>Cost: ${activity.cost}</li>
                    <li>Dates: {activity.dates}</li>
                    <li>
                        <Link to={`/${activity.orgId}/${activity.id}`}>
                            See More
                        </Link>
                    </li>
                    {this.handleDisplayAdminControls()}
                </ul>
            </div>
        )
    }
}

export default Activity;