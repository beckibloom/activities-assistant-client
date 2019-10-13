import React from 'react';
import './ActivityFilters.css';
import ActivitiesContext from '../../contexts/ActivitiesContext'

class ActivityFilters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ages: 'none',
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

    updateAges = e => {
        const ages = e.target.value
        this.setState({
            ages
        })
    }

    handleClearFilters = e => {
        e.preventDefault()
        console.log('handleClearFilters ran.')
        this.context.clearFilters()
        document.getElementById("ages").value = "none"
        document.getElementById("group").value = "none"
        document.getElementById("day").value = "none"
    }

    handleApplyFilters = e => {
        e.preventDefault()
        const filtersToApply = {}
        if(this.state.ages !== "none") {
            filtersToApply.ages = this.state.ages
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
                    <select onChange={this.updateAges} id="ages">
                        <option value="none">Ages</option>
                        <option value="3-5">3-5</option>
                        <option value="6-8">6-8</option>
                        <option value="9-11">9-11</option>
                    </select>
                    <select onChange={this.updateGroup} id="group">
                        <option value="none">Activity Type</option>
                        <option value="Athletics">Athletics</option>
                        <option value="STEAM">STEAM</option>
                        <option value="Arts">Creative Arts</option>
                    </select>
                    <select onChange={this.updateDay} id="day">
                        <option value="none">Day of Week</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
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