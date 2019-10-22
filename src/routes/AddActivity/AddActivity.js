import React from 'react'
import './AddActivity.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import ActivitiesApiService from '../../services/activities-api-service'

class AddActivity extends React.Component {
    static contextType = ActivitiesContext

    constructor(props) {
        super(props)
        this.state = {
            newActivity: {}
        }
    }

    createId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    updateState = e => {
        const value = e.target.value
        const key = e.target.id
        const newActivity = this.state.newActivity
        newActivity[key] = value
        this.setState({
            newActivity
        })
    }

    updateStateDetails = e => {
        const value = e.target.value
        const key = e.target.id
        //should this be a let or a const?
        const newActivity = this.state.newActivity
        if (!this.state.newActivity.details) {
            const detailsObj = {[key]: value}
            newActivity.details = detailsObj
        } else {
            newActivity.details[key] = value
        }
        this.setState({
            newActivity
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const newActivity = this.state.newActivity
        const orgId = this.context.orgSelected
        newActivity.org_id = orgId
        console.log({newActivity})
        ActivitiesApiService.postActivity(orgId, newActivity)
            .then(res => {
                this.setState({
                    newActivity: {}
                })
                this.props.history.push(`/org/${this.context.orgSelected}`)
            })
            .catch(this.context.setError)
    }

    render() {
        return (
            <>
                <header role="banner">
                    <h1>Add New Activity</h1>
                </header>

                <form onSubmit={this.handleSubmit} >
                    <section className="at-a-glance">
                        <p>Title: 
                            <input type="text" id="title" required onChange={this.updateState} />
                        </p>
                        <p>Day:
                            <select id="activity_day" required onChange={this.updateState}>
                                <option value=''>Choose one</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </p>
                        <p>Time: 
                            <input type="text" id="activity_time" required onChange={this.updateState} />
                        </p>
                        <p>Ages:
                            <select id="ages" required onChange={this.updateState}>
                                <option value=''>Choose one</option>
                                <option value="3-5">3-5</option>
                                <option value="6-8">6-8</option>
                                <option value="9-11">9-11</option>
                            </select>
                        </p>
                        <p>Activity Group: 
                        <select id="activity_group" required onChange={this.updateState}>
                            <option value="">Choose one</option>
                            <option value="Athletics">Athletics</option>
                            <option value="STEAM">STEAM</option>
                            <option value="Arts">Creative Arts</option>
                        </select>
                        </p>
                        <p>Location: 
                            <input type="text" id="activity_location" required onChange={this.updateState} />
                        </p>
                        <p>Cost: 
                            <input type="text" id="cost"  required onChange={this.updateState} />
                        </p>
                        <p>Dates: 
                            <input type="text" id="dates" required onChange={this.updateState} />
                        </p>
                        <p>
                            Activity image (provide URL)
                            <input type="text" id="thumbnail" required onChange={this.updateState} />
                        </p>
                    </section>

                    <section className="activity-details">
                        <p className="main-description">
                            Main activity description
                            <textarea id="activity_description" required onChange={this.updateStateDetails} />
                        </p>
                        <p className="prepare-info">
                            What should students prepare for?
                            <textarea id="preparation" required onChange={this.updateStateDetails} />
                        </p>
                        <p className="contact-info">
                            Provide contact for questions
                            <textarea id="contact" required onChange={this.updateStateDetails} />
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

export default AddActivity;