import React from 'react'
import './AddActivity.css'
import ActivitiesContext from './ActivitiesContext'

class AddActivity extends React.Component {
    static contextType = ActivitiesContext

    constructor(props) {
        super(props)
        this.state = {
            title: null,
            day: null,
            time: null,
            ages: null,
            group: null,
            location: null,
            cost: null,
            dates: null,
            thumbnail: null,
            details: {
                description: null,
                preparation: null,
                contact: null,
            }
        }
    }

    updateState = e => {
        const value = e.target.value
        const key = e.target.id
        this.setState({
            [key]: value
        })
    }

    updateStateDetails = e => {
        const value = e.target.value
        const key = e.target.id
        const details = this.state.details
        details[key] = value
        this.setState({
            details
        })
    }

    createId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    handleSubmit = e => {
        e.preventDefault()
        const activityObj = this.state
        activityObj.orgId = this.context.orgSelected
        activityObj.id = this.createId()
        this.context.addActivity(activityObj)
        this.props.history.push(`/org/${this.context.orgSelected}`)
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
                            <select id="day" required onChange={this.updateState}>
                                <option value=''>Choose one</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </p>
                        <p>Time: 
                            <input type="text" id="time" required onChange={this.updateState} />
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
                        <select id="group" required onChange={this.updateState}>
                            <option value="">Choose one</option>
                            <option value="Athletics">Athletics</option>
                            <option value="STEAM">STEAM</option>
                            <option value="Arts">Creative Arts</option>
                        </select>
                        </p>
                        <p>Location: 
                            <input type="text" id="location" required onChange={this.updateState} />
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
                            <textarea id="description" required onChange={this.updateStateDetails} />
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