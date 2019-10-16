import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import PrivateRoute from '../Utils/PrivateRoute'
import Nav from '../Nav/Nav.js'
import Footer from '../Footer/Footer.js'
import LandingPage from '../../routes/LandingPage/LandingPage'
import ActivitiesList from '../../routes/ActivitiesList/ActivitiesList'
import ActivityDetail from '../../routes/ActivityDetail/ActivityDetail'
import Register from '../../routes/Register/Register'
import AddActivity from '../../routes/AddActivity/AddActivity'
import AdminLogin from '../../routes/AdminLogin/AdminLogin'
import EditActivity from '../../routes/EditActivity/EditActivity'
import ActivitiesApiService from '../../services/activities-api-service'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      activities: [],
      filteredActivities: [],
      admin: false,
      orgSelected: null,
      error: null
    }
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  addActivity = (activityObj) => {
    //create an addActivity() function in activities-service and use it here to add the new activity to the database
    // use setActivities() again to reset the activities list in the context with the new activity included
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
    // use a PATCH request - review how to do a PATCH
    // use setActivities() again to update the context with the new activity details
  }

  deleteActivity = activityId => {
    // use a DELETE request - review how to do a DELETE
    // use setActivities() again to update the context with the new activity details
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

  setActivities = orgId => {
    console.log('setActivities ran.', {orgId})
    ActivitiesApiService.getActivities(orgId)
      .then(res => {
        this.setState({
          activities: res,
          filteredActivities: res,
          orgSelected: parseInt(orgId),
        })
        }
      )
      .catch(this.setError)
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
    ActivitiesApiService.getOrgs()
      .then(this.setOrganizations)
      .catch(this.setError)
  }

  render() {
    const contextValue = {
      organizations: this.state.organizations,
      activities: this.state.activities,
      filteredActivities: this.state.filteredActivities,
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
      setError: this.setError,
    }
    return (
      <ActivitiesContext.Provider value={contextValue}>
         

      <main className='App'>
        <Nav />
          <Switch>
            <Route
              exact 
              path='/'
              component={LandingPage}
            />
            <Route
              exact 
              path='/org/:orgId'
              component={ActivitiesList}
            />
            <Route 
              path='/org/:orgId/:activityId'
              component={ActivityDetail}
            />
            <PublicOnlyRoute
              path='/register'
              component={Register}
            />
            <PrivateRoute
              path='/addactivity'
              component={AddActivity} 
            />
            <PrivateRoute
              path='/edit/:activityId'
              component={EditActivity} 
            />
            <PublicOnlyRoute
              exact 
              path='/signin'
              component={AdminLogin} 
            />
          </Switch>
        <Footer />
      </main>

      </ActivitiesContext.Provider>
    );
  }
}

export default App;