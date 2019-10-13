import React from 'react'
import {Link} from 'react-router-dom'
import './Activity.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'

class Activity extends React.Component {
    static contextType = ActivitiesContext

    deleteActivity = e => {
        e.preventDefault()
        this.context.deleteActivity(this.props.details.id)
    }

    handleDisplayAdminControls = () => {
        if (this.context.admin === true) {
            return (
                <>
                <li>
                    <Link to={`/edit/${this.props.details.id}`}>
                        <button>
                        Edit this activity
                        </button>
                    </Link>
                </li>
                <li>
                    <button onClick={this.deleteActivity}>
                        Delete this activity
                    </button>
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
                        <Link to={`/org/${activity.orgId}/${activity.id}`}>
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