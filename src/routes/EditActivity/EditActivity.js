import React from 'react'
import ActivitiesContext from '../../contexts/ActivitiesContext'

class EditActivity extends React.Component {
    static contextType = ActivitiesContext

    getActivityObj(context, props) {
        const activityId = (props.match.params.activityId).toString()
        console.log({activityId})
        const activity = context.activities.find(a => (a.id).toString() === activityId)
        return activity;
    }

    handleSubmit = e => {
        e.preventDefault()

        //use the data from state to create a new object merged with the new activity data
        const activityUpdates = this.state
        console.log({activityUpdates})
        
        //use the Activities Service to do a patch request including the activityUpdates in the body of the request + the orgId

        //redirect user back to activities list
        this.props.history.push(`/org/${this.context.orgSelected}`)
    }

    updateActivityObj = e => {
        const key = e.target.id
        const value = e.target.value
        if (key === ('description' || 'preparation' || 'contact')) {
            const details = this.state.details
            details[key] = value
            this.setState({
                details
            })
        } else { 
            this.setState({
                [key]: value,
            })
        }
    }

    prefillFields = () => {
        const activity = this.getActivityObj(this.context, this.props)

        // target elements by id and populate all fields
        document.getElementById('title').value = activity.title
        document.getElementById('day').value = activity.day
        document.getElementById('time').value = activity.time
        document.getElementById('ages').value = activity.ages
        document.getElementById('group').value = activity.group
        document.getElementById('location').value = activity.location
        document.getElementById('cost').value = activity.cost
        document.getElementById('dates').value = activity.dates
        document.getElementById('thumbnail').value = activity.thumbnail
        document.getElementById('description').value = activity.details.description
        document.getElementById('preparation').value = activity.details.preparation
        document.getElementById('contact').value = activity.details.contact

        // set state to the element ID so that it can be found and updated in the data
        this.setState({
            id: activity.id
        })
    }

    componentDidMount() {
        this.prefillFields()
    }

    render() {
        return (
            <>
                <header role="banner">
                    <h1>Edit Activity</h1>
                </header>

                <form onSubmit={this.handleSubmit}>
                    <section className="at-a-glance">
                        <p>
                        Title: 
                            <input 
                            type="text" 
                            id="title"
                            required
                            onChange={this.updateActivityObj}
                        />
                        </p>
                        <p>
                        Day: 
                            <select id="day" required onChange={this.updateActivityObj}>
                                <option value=''>Choose one</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </p>
                        <p>
                        Time: 
                            <input 
                            type="text" 
                            id="time"
                            required
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p>
                        Ages: 
                            <select id="ages" required onChange={this.updateActivityObj}>
                                <option value=''>Choose one</option>
                                <option value="3-5">3-5</option>
                                <option value="6-8">6-8</option>
                                <option value="9-11">9-11</option>
                            </select>
                        </p>
                        <p>
                        Activity Group: 
                            <select id="group" required onChange={this.updateActivityObj}>
                                <option value="">Choose one</option>
                                <option value="Athletics">Athletics</option>
                                <option value="General Enrichment">General Enrichment</option>
                                <option value="Performing Arts">Performing Arts</option>
                                <option value="STEAM">STEAM</option>
                            </select>
                        </p>
                        <p>
                        Location: 
                            <input 
                            type="text" 
                            id="location" 
                            required
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p>
                        Cost: 
                            <input 
                            type="text" 
                            id="cost" 
                            required
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p>
                        Dates: 
                            <input 
                            type="text" 
                            id="dates"
                            required 
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p className="image">
                            Activity image (provide URL)
                            <input 
                                type="text" 
                                id="thumbnail"
                                required 
                                onChange={this.updateActivityObj}
                                />
                        </p>
                    </section>

                    <section className="activity-details">
                        <p className="main-description">
                            Main activity description
                            <textarea id="description"
                            required
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p className="prepare-info">
                            What should students prepare for?
                            <textarea id="preparation" required 
                            onChange={this.updateActivityObj}
                            />
                        </p>
                        <p className="contact-info">
                            Provide contact for questions
                            <textarea id="contact" required
                            onChange={this.updateActivityObj}
                            />
                        </p>
                    </section>

                    <section>
                        <button type='submit'>Save changes</button>
                    </section>
                </form>
            </>
        )
    }
}

export default EditActivity;