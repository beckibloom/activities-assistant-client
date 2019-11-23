import React from 'react';
import './ActivityDetail.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import ActivitiesApiService from '../../services/activities-api-service';

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      details: {
        description: '',
        contact: '',
        preparation: '',
      },
      error: null,
    }
  }

  static contextType = ActivitiesContext

  handleGetActivity() {
    const orgId = this.props.match.params.orgId
    const activityId = this.props.match.params.activityId
    ActivitiesApiService.getActivity(orgId, activityId)
      .then(res => {
        this.setState({ 
          activity: res,
          details: {
            description: res.details.description,
            contact: res.details.contact,
            preparation: res.details.preparation,
          },
          error: null,
        })
      })
      .catch(this.context.setError)
  }

  handleGoBack = (event) => {
    console.log('handleGoBack function ran')
    event.preventDefault()
    this.props.history.goBack()
  }

  componentDidMount = () => {
    this.handleGetActivity()
  }

  render() {
    const activity = this.state.activity

    
    return (
      <ActivitiesContext.Consumer>
      
      {(context) => (
        <>
        <header role="banner">
          <h1>
              {this.state.activity.title}
          </h1>
        </header>

        <section className="activity">
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
          </ul>
        </section>

        <section className="activity-details">
          <p className="main-description">
              {this.state.details.description}
          </p>
          <p className="prepare-info">
              {this.state.details.preparation}
          </p>
          <p className="contact-info">
              {this.state.details.contact}
          </p> 
        </section>

        <section>
          <button onClick={this.handleGoBack}>Go back to activity list</button>
        </section>
      </>

      )}

      </ActivitiesContext.Consumer>
    )
  }
}

export default ActivityDetail;