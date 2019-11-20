import React from 'react'
import {Link} from 'react-router-dom'
import './Activity.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import TokenService from '../../services/token-service'
import ActivitiesApiService from '../../services/activities-api-service'

class Activity extends React.Component {
    static contextType = ActivitiesContext

    deleteActivity = e => {
        e.preventDefault()
        const orgId = this.props.details.orgId
        const activityId = this.props.details.id
        ActivitiesApiService.deleteActivity(orgId, activityId)
            .then(res =>
                this.context.setActivities(orgId)
            )
            .catch(this.context.setError)
    }

    handleDisplayAdminControls = () => {
        const loginStatus = TokenService.hasAuthToken()
        const adminOrg = this.context.admin
        const currentOrg = this.props.currentOrg
        if (loginStatus === true && adminOrg === currentOrg) {
            return (
                <>
                <li>
                    <Link to={`/org/${this.props.details.orgId}/activity/edit/${this.props.details.id}`}>
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
                    <li><span className="label">Activity name:</span> {activity.title}</li>
                    <li><span className="label">Day of week:</span> {activity.day}</li>
                    <li><span className="label">Time of day:</span> {activity.time}</li>
                    <li><span className="label">Ages:</span> {activity.ages}</li>
                    <li><span className="label">Activity Group:</span> {activity.group}</li>
                    <li><span className="label">Location:</span> {activity.location}</li>
                    <li><span className="label">Cost:</span> ${activity.cost}</li>
                    <li><span className="label">Dates:</span> {activity.dates}</li>
                    <li>
                        <Link to={`/org/${activity.orgId}/activity/view/${activity.id}`}>
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