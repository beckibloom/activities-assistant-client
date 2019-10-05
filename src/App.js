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
import EditActivity from './EditActivity'
import ScrollToTop from './ScrollToTop'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      activities: [],
      filteredActivities: [],
      users: [],
      admin: false,
      orgSelected: null,
      error: null
    }
  }

  addActivity = (activityObj) => {
    const activities = this.state.activities
    activities.push(activityObj)
    this.setState({
      activities: activities,
      filteredActivities: activities,
    })
  }

  addOrg = (orgObj) => {
    const organizations = this.state.organizations
    organizations.push(orgObj)
    this.setState({
      organizations
    })
  }

  addUser = (userObj) => {
    const users = this.state.users
    users.push(userObj)
    this.setState({
      users
    })
  }

  editActivity = (activityObj) => {
    const activities = this.state.activities
    const newActivities = activities.filter(activity => activity.id !== activityObj.id)
    newActivities.push(activityObj)
    this.setState({
      activities: newActivities,
      filteredActivities: newActivities,
    })
  }

  deleteActivity = activityId => {
    const activities = this.state.activities
    const newActivities = activities.filter(activity => activity.id !== activityId)
    this.setState({
      activities: newActivities,
      filteredActivities: newActivities,
    })
  }

  clearOrg = () => {
    this.setState({
      orgSelected: null,
    })
  }

  updateAdminStatus = status => {
    this.setState({
      admin: status,
    })
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
    const orgIdToString = orgId.toString()
    const activities = config.activities_endpoint.filter(a => (a.orgId).toString() === orgIdToString)
    this.setState({
      activities,
      filteredActivities: activities,
      orgSelected: orgIdToString
    })
  }

  filterActivitiesBy = (key, value) => {
    console.log('filterActivitiesBy ran.')
    const activities = this.state.filteredActivities
    const filteredActivities = activities.filter(activity => activity[key] === value)
    this.setState({
      filteredActivities: filteredActivities
    })
  }

  clearFilters = () => {
    this.setState({
      filteredActivities: this.state.activities
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
      filteredActivities: this.state.filteredActivities,
      users: this.state.users,
      setActivities: this.setActivities,
      filterActivitiesBy: this.filterActivitiesBy,
      orgSelected: this.state.orgSelected,
      updateAdminStatus: this.updateAdminStatus,
      admin: this.state.admin,
      clearOrg: this.clearOrg,
      clearFilters: this.clearFilters,
      addActivity: this.addActivity,
      editActivity: this.editActivity,
      deleteActivity: this.deleteActivity,
      addOrg: this.addOrg,
      addUser: this.addUser,
    }
    return (
      <ActivitiesContext.Provider value={contextValue}>
        <ScrollToTop /> 

      <main className='App'>
        <Nav />
        <Route
          exact path='/'
          component={LandingPage}
        />
        <Route
          exact path='/org/:orgId'
          component={ActivitiesList}
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