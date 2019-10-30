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
    console.log(this.state.details.description)
    return (
      <ActivitiesContext.Consumer>
      
      {(context) => (
        <>
        <header role="banner">
          <h1>
              {this.state.activity.title}
          </h1>
        </header>

        <section className="at-a-glance">
          <img className="thumbnail" src={this.state.activity.thumbnail} alt={this.state.activity.title} />
          <p>Day: {this.state.activity.day}</p>
          <p>Time: {this.state.activity.time}</p>
          <p>Ages: {this.state.activity.ages}</p>
          <p>Activity Group: {this.state.activity.group}</p>
          <p>Location: {this.state.activity.location}</p>
          <p>Cost: {this.state.activity.cost}</p>
          <p>Dates: {this.state.activity.dates}</p>
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