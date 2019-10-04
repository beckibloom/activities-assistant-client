import React from 'react'
import ActivitiesContext from './ActivitiesContext'

class EditActivity extends React.Component {
    static contextType = ActivitiesContext

    getActivityObj(context, props) {
        const activityId = parseInt(props.match.params.activityId)
        const activity = context.activities.find(a => parseInt(a.id) === activityId)
        return activity;
    }

    render() {
        const activity = this.getActivityObj(this.context, this.props)

        return (
            <>
                <header role="banner">
                    <h1>Edit Activity</h1>
                </header>

                <form>
                    <section className="at-a-glance">
                        <p>
                        Title: 
                            <input 
                            type="text" 
                            id="title"
                            value={activity.title}
                            />
                        </p>
                        <p>
                        Day: 
                            <input 
                            type="text" 
                            id="day"
                            value={activity.day}
                            />
                        </p>
                        <p>
                        Time: 
                            <input 
                            type="text" 
                            id="time"
                            value={activity.time}
                            />
                        </p>
                        <p>
                        Ages: 
                            <input 
                            type="text" 
                            id="ages" 
                            value={activity.ages}
                            />
                        </p>
                        <p>
                        Activity Group: 
                            <input 
                            type="text" 
                            id="group"
                            value={activity.group}
                            />
                        </p>
                        <p>
                        Location: 
                            <input 
                            type="text" 
                            id="location" 
                            value={activity.location}
                            />
                        </p>
                        <p>
                        Cost: 
                            <input 
                            type="text" 
                            id="cost" 
                            value={activity.cost}
                            />
                        </p>
                        <p>
                        Dates: 
                            <input 
                            type="text" 
                            id="dates"
                            value={activity.dates}
                            />
                        </p>
                        <p className="image">
                            Activity image (provide URL)
                            <input 
                                type="text" 
                                id="thumbnail"
                                value={activity.thumbnail}
                            />
                        </p>
                    </section>

                    <section className="activity-details">
                        <p className="main-description">
                            Main activity description
                            <textarea id="description" value={activity.details.description}></textarea>
                        </p>
                        <p className="prepare-info">
                            What should students prepare for?
                            <textarea id="preparation" value={activity.details.preparation}></textarea>
                        </p>
                        <p className="contact-info">
                            Provide contact for questions
                            <textarea id="contact" value={activity.details.contact}></textarea>
                        </p>
                    </section>

                    <section>
                        <button>Save changes</button>
                    </section>
                </form>
            </>
        )
    }
}

export default EditActivity;