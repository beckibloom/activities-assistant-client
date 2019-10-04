import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ActivitiesContext from './ActivitiesContext'
import config from './config'

import Nav from './Nav.js'
import Footer from './Footer.js'
import LandingPage from './LandingPage'
import ActivitiesList from './ActivitiesList'
import ActivityDetail from './ActivityDetail'
import Register from './Register'
import AddActivity from './AddActivity'
import AdminLogin from './AdminLogin'
import AdminActivitiesList from './AdminActivitiesList'
import EditActivity from './EditActivity'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      activities: [],
      users: [],
      orgSelected: null,
      error: null
    }
  }

  setOrganizations = orgs => {
    this.setState({
      organizations: orgs
    })
  }

  setUsers = users => {
    this.setState({
      users: users
    })
  }

  setActivities = orgId => {
    const orgIdToInt = parseInt(orgId)
    const activities = config.activities_endpoint.filter(a => a.orgId === orgIdToInt)
    this.setState({
      activities,
      orgSelected: orgIdToInt
    })
  }

  filterActivitiesBy = (key, value) => {
    console.log('filterActivitiesBy ran.')
    const activities = this.state.activities
    const filteredActivities = activities.filter(activity => activity[key].toLowerCase() === value.toLowerCase())
    this.setState({
      activities: filteredActivities
    })
  }

  componentDidMount() {
    const orgs = config.orgs_endpoint
    this.setOrganizations(orgs)

    const users = config.users_endpoint
    this.setUsers(users)
  }

  render() {
    const contextValue = {
      organizations: this.state.organizations,
      activities: this.state.activities,
      users: this.state.users,
      setActivities: this.setActivities,
      filterActivitiesBy: this.filterActivitiesBy,
    }
    return (
      <ActivitiesContext.Provider value={contextValue}>

      <main className='App'>
        <Nav org={this.state.orgSelected} />
        <Route
          exact path='/'
          component={LandingPage}
        />
        <Route
          exact path='/org/:orgId'
          component={ActivitiesList}
        />
        <Route
          exact path='/:username/org/:orgId'
          component={AdminActivitiesList}
        />
        <Route 
          path='/org/:orgId/:activityId'
          component={ActivityDetail}
        />
        <Route
          path='/register'
          component={Register}
        />
        <Route
          path='/addactivity'
          component={AddActivity} 
        />
        <Route
          path='/edit/:activityId'
          component={EditActivity} 
        />
        <Route
          exact path='/signin'
          component={AdminLogin} 
        />
        <Footer />
      </main>

      </ActivitiesContext.Provider>
    );
  }
}

export default App;