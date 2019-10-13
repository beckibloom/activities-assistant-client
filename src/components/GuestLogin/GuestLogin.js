import React from 'react'
import './GuestLogin.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import { withRouter } from 'react-router-dom'

class GuestLogin extends React.Component {
    static contextType = ActivitiesContext;

    state = {
        organization: {
            value: 'none',
            touched: false,
        },
        error: null,
    }

    handleDisplayOrgs = () => {
        return (
            this.context.organizations.map(org => 
                <option key={org.id} value={org.id}>
                    {org.name}
                </option>
            )
        )
    }

    updateOrganization(orgId) {
        this.setState({
            organization: {
                value: orgId,
                touched: true,
            }
        })
    }

    handleDisplayButton = () => {
        if (this.state.organization.value === 'none') {
            return (
                <button type="submit" disabled>
                    Get activities
                </button>
            )
        } else {
            return (
                <button type="submit">
                    Get activities
                </button>
            )
        }
    }

    handleSubmit = e => {
        console.log('handleSubmit ran.')
        e.preventDefault()
        const orgId = this.state.organization.value
        this.context.setActivities(orgId)
        this.props.history.push(`/org/${orgId}`)
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <h2>Guests</h2>
                    <p>
                        Choose your organization from the dropdown below to view your activities listings.
                    </p>
                    <select id="org-select" onChange={e => this.updateOrganization(e.target.value)}>
                        <option value="None">Select an organization</option>
                        {this.handleDisplayOrgs()}
                    </select>
                    {this.handleDisplayButton()}
                </form>
            </section>
        )
    }
}

export default withRouter(GuestLogin);