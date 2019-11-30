import React from 'react';
import { Link } from 'react-router-dom';
import './Activity.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import TokenService from '../../services/token-service';
import ActivitiesApiService from '../../services/activities-api-service';
import UsersApiService from '../../services/users-api-service';

class Activity extends React.Component {
  static contextType = ActivitiesContext;

  deleteActivity = e => {
    e.preventDefault();
    const orgId = this.props.details.orgId;
    const activityId = this.props.details.id;
    ActivitiesApiService.deleteActivity(orgId, activityId)
      .then(res =>
        this.context.setActivities(orgId)
      )
      .catch(this.context.setError);
  };

  handleDisplayAdminControls = () => {
    const loginStatus = TokenService.hasAuthToken();
    const adminOrg = this.context.admin;
    const currentOrg = this.props.details.orgId;
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
    };
  };

  handleRenderActivityDetails = () => {
    if (this.props.details) {
      const activity = this.props.details;
      return (
      <>
        <img src={activity.thumbnail} alt={activity.title} className="thumbnail" />
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
      </>
      );
  } else {
      return (
          <p className="error">Error: Activity details could not be found. Please try again later.</p>
        );
    };
  };

  componentDidMount() {
    if (this.context.admin === 0) {
      if (TokenService.hasAuthToken()) {
        UsersApiService.getUserOrg((resJson) => {
          resJson
            .then(resJson =>
              this.context.updateAdminStatus(resJson)
            )
            .catch(err => this.context.setError(err));
        })
      }
    };
  }

  render() {
      return (
          <div className="activity">
              {this.handleRenderActivityDetails()}
          </div>
      );
  };
};

export default Activity;