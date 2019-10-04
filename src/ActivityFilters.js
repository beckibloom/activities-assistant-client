import React from 'react';
import './ActivityFilters.css';
import ActivitiesContext from './ActivitiesContext'

class ActivityFilters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 'none',
            group:'none',
            day: 'none',
        }
    }

    static contextType = ActivitiesContext

    updateDay = e => {
        const day = e.target.value
        this.setState({
            day
        })
    }

    updateGroup = e => {
        const group = e.target.value
        this.setState({
            group
        })
    }

    updateAge = e => {
        const age = e.target.value
        this.setState({
            age
        })
    }

    handleClearFilters = e => {
        e.preventDefault()
        console.log('handleClearFilters ran.')
        const orgId = this.context.activities[0].orgId
        this.context.setActivities(orgId)
        document.getElementById("age").value = "none"
        document.getElementById("group").value = "none"
        document.getElementById("day").value = "none"
    }

    handleApplyFilters = e => {
        e.preventDefault()
        const filtersToApply = {}
        if(this.state.age !== "none") {
            filtersToApply.age = this.state.age
        } 
        if(this.state.group !== "none") {
            filtersToApply.group = this.state.group
        }
        if(this.state.day !== "none") {
            filtersToApply.day = this.state.day
        }
        const filterKeys = Object.keys(filtersToApply)
        filterKeys.forEach(key => {
            const value = this.state[key]
            this.context.filterActivitiesBy(key, value)
        })
    }

    render() {
        return (
            <section className="filters">
                <p>Optionally, narrow down your search for the perfect activity using the filters below.</p>
                <form onSubmit={this.handleApplyFilters}>
                    <select onChange={this.updateAge} id="age">
                        <option value="none">Age</option>
                        <option value="3-5">3-5</option>
                        <option value="6-8">6-8</option>
                        <option value="9-11">9-11</option>
                    </select>
                    <select onChange={this.updateGroup} id="group">
                        <option value="none">Activity Type</option>
                        <option value="athletics">Athletics</option>
                        <option value="steam">STEAM</option>
                        <option value="arts">Creative Arts</option>
                    </select>
                    <select onChange={this.updateDay} id="day">
                        <option value="none">Day of Week</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                    </select>
                    <button type='submit'>Apply filters</button>
                </form>
                <button onClick={this.handleClearFilters}>
                    Clear Filters
                </button>
            </section>
        )
    }
}

export default ActivityFilters;