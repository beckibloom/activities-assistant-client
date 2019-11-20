import React from 'react'
import {Link} from 'react-router-dom'
import Activity from '../../components/Activity/Activity'
import './ActivitiesList.css'
import ActivityFilters from '../../components/ActivityFilters/ActivityFilters'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import TokenService from '../../services/token-service'
import OrgsApiService from '../../services/orgs-api-service'

class ActivitiesList extends React.Component {
    static contextType = ActivitiesContext

    constructor(props) {
        super(props)
        this.state = {
            organizations: [],
            currentOrg: {org_name: ''},
            activities: [],
        }
    }

    handleDisplayAdminAddLink = () => {
        const loginStatus = TokenService.hasAuthToken()
        const adminOrg = this.context.admin
        const currentOrg = this.props.match.params.orgId
        if (loginStatus === true && adminOrg === currentOrg) {
            return (
                <div className='add-activity'>
                    <Link to='/addactivity'>
                        Add new activity
                    </Link>
                </div>
            )
        }
    }

    componentDidMount() {
        if (this.context.organizations.length === 0) {
            OrgsApiService.getOrgs()
                .then(res => {
                    this.setState({
                        organizations: res
                    })
                    this.context.setOrganizations(res)
                })
                .then(res => {
                    const currentOrg = parseInt(this.props.match.params.orgId)
                    const org = this.state.organizations.find(org => org.id === currentOrg)
                    this.setState({
                        currentOrg: org
                    })
                })
                .catch(this.context.setError)
        }
        if (this.context.admin === 0) {
            console.log('checked for admin status-passing')
            if (TokenService.hasAuthToken()) {
                console.log('checked for auth token')
                this.context.updateAdminStatus(true)
            }
        }
        if (this.context.activities.length === 0) {
            console.log('checked for activities')
            const currentOrg = this.props.match.params.orgId
            this.context.setActivities(currentOrg)
        }
    }

    handleDisplayOrg = () => {
        return `Activities at ${this.state.currentOrg.org_name}`
    }

    render() {
        return (
            <ActivitiesContext.Consumer>

            {(context) => (
                <>
                    <header role="banner">
                    <h1>{this.handleDisplayOrg()}</h1>
                    </header>
        
                    <ActivityFilters />

                    {this.handleDisplayAdminAddLink()}
        
                    <section className="activities">
                        <ul>
                            {context.filteredActivities.map(activity =>
                                <Activity
                                    key={activity.id}
                                    details={activity}
                                    currentOrg={this.props.match.params.orgId}
                                />)}
                        </ul>
                    </section>
                </>
            )}

            </ActivitiesContext.Consumer>
        )
    }
}

export default ActivitiesList