import React from 'react'
import './AddActivity.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import ActivitiesApiService from '../../services/activities-api-service'
// import TokenService from '../../services/token-service'

class AddActivity extends React.Component {
    static contextType = ActivitiesContext

    constructor(props) {
        super(props)
        this.state = {
            newActivity: {},
            numError: '',
        }
    }

    createId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    validateCost = e => {
        if (isNaN(e.target.value) === true) {
            this.setState({
                numError: 'Cost must be a number'
            })
        } else {
            this.setState({
                numError: ''
            })
        }
    }

    updateState = e => {
        const value = e.target.value
        const key = e.target.id
        const newActivity = this.state.newActivity
        newActivity[key] = value
        this.setState({
            newActivity
        })
        return
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
            })
            .then(res => {
                this.context.setActivities(orgId)
            })
            .then(res => {
                this.props.history.push(`/org/${this.context.orgSelected}`)
            })
            .catch(this.context.setError)
    }

    // componentDidMount() {
    //     const loginStatus = TokenService.hasAuthToken()
    //     const adminOrg = this.context.admin
    //     const currentOrg = this.context.orgSelected
    //     console.log({adminOrg}, {currentOrg})
    //     if (loginStatus !== true || parseInt(adminOrg) !== currentOrg) {
    //         throw new Error(`Uh oh! You don't have access to this page. Sign in as a user for this organization and try again.`)
    //     }
    // }

    render() {
        return (
            <>
                <header role="banner">
                    <h1>Add New Activity</h1>
                </header>

                <form onSubmit={this.handleSubmit} >
                    <section className="at-a-glance">
                        <ul className="add-form">
                            <li>
                            <p>Title: 
                                <input type="text" id="title" required onChange={this.updateState} />
                            </p>
                            </li>
                            <li>
                            <p>Day:<br />
                            <div className="select-container">
                                <select id="activity_day" required onChange={this.updateState}>
                                    <option value=''>Choose one</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                </select>
                            </div>
                            </p>
                            </li>
                            <li>
                            <p>Time: 
                                <input type="text" id="activity_time" required onChange={this.updateState} />
                            </p>
                            </li>
                            <li>
                            <p>Ages:<br />
                            <div className="select-container">
                                <select id="ages" required onChange={this.updateState}>
                                    <option value=''>Choose one</option>
                                    <option value="3-5">3-5</option>
                                    <option value="6-8">6-8</option>
                                    <option value="9-11">9-11</option>
                                </select>
                            </div>
                            </p>
                            </li>
                            <li>
                            <p>Activity Group: <br />
                            <div className="select-container">
                            <select id="activity_group" required onChange={this.updateState}>
                                <option value="">Choose one</option>
                                <option value="Athletics">Athletics</option>
                                <option value="STEAM">STEAM</option>
                                <option value="Arts">Creative Arts</option>
                            </select>
                            </div>
                            </p>
                            </li>
                            <li>
                            <p>Location: 
                                <input type="text" id="activity_location" required onChange={this.updateState} />
                            </p>
                            </li>
                            <li>
                            <p>Cost: $
                                <input type="text" id="cost"  required onChange={this.updateState} onBlur={this.validateCost} />
                                <span className="error">{this.state.numError}</span>
                            </p>
                            </li>
                            <li>
                            <p>Dates: 
                                <input type="text" id="dates" required onChange={this.updateState} />
                            </p>
                            </li>
                            <li>
                            <p>
                                Activity image (provide URL)
                                <input type="text" id="thumbnail" required onChange={this.updateState} />
                            </p>
                            </li>
                        </ul>
                    </section>

                    <section className="activity-details">
                        <p className="main-description">
                            Main activity description <br/>
                            <textarea id="activity_description" required onChange={this.updateState} />
                        </p>
                        <p className="prepare-info">
                            What should students prepare for? <br/>
                            <textarea id="preparation" required onChange={this.updateState} />
                        </p>
                        <p className="contact-info">
                            Provide contact for questions <br/>
                            <textarea id="contact" required onChange={this.updateState} />
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