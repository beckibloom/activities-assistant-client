import React from 'react';
import './ActivityDetail.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';

class ActivityDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: null,
            error: null,
        }
    }

    static contextType = ActivitiesContext

    getActivityObj(context, props) {
        const activityId = props.match.params.activityId
        const activity = context.activities.find(a => a.id === activityId)
        return activity;
    }

    handleGoBack = (event) => {
			console.log('handleGoBack function ran')
			event.preventDefault()
			this.props.history.goBack()
		}

    render() {
        return (
            <ActivitiesContext.Consumer>
            
            {(context) => (
                <>
                <header role="banner">
                    <h1>
                        {this.getActivityObj(context, this.props).title}
                    </h1>
                </header>

                <section className="at-a-glance">
                    <img className="thumbnail" src={this.getActivityObj(context, this.props).thumbnail} alt={this.getActivityObj(context, this.props).title} />
                    <p>Day: {this.getActivityObj(context, this.props).day}</p>
                    <p>Time: {this.getActivityObj(context, this.props).time}</p>
                    <p>Ages: {this.getActivityObj(context, this.props).ages}</p>
                    <p>Activity Group: {this.getActivityObj(context, this.props).group}</p>
                    <p>Location: {this.getActivityObj(context, this.props).location}</p>
                    <p>Cost: {this.getActivityObj(context, this.props).cost}</p>
                    <p>Dates: {this.getActivityObj(context, this.props).dates}</p>
                </section>

                <section className="activity-details">
                    <p className="main-description">
                        {this.getActivityObj(context, this.props).details.description}
                    </p>
                    <p className="prepare-info">
                        {this.getActivityObj(context, this.props).details.preparation}
                    </p>
                    <p className="contact-info">
                        {this.getActivityObj(context, this.props).details.contact}
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