import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import ActivitiesContext from '../../contexts/ActivitiesContext';

import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import LandingPage from '../../routes/LandingPage/LandingPage';
import ActivitiesList from '../../routes/ActivitiesList/ActivitiesList';
import ActivityDetail from '../../routes/ActivityDetail/ActivityDetail';
import Register from '../../routes/Register/Register';
import AddActivity from '../../routes/AddActivity/AddActivity';
import AdminLogin from '../../routes/AdminLogin/AdminLogin';
import EditActivity from '../../routes/EditActivity/EditActivity';
import AuthError from '../../routes/AuthError/AuthError';

import ActivitiesApiService from '../../services/activities-api-service';
import OrgsApiService from '../../services/orgs-api-service';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      activities: [],
      filteredActivities: [],
      admin: 0,
      orgSelected: null,
      error: null
    };
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearOrg = () => {
    this.setState({
      orgSelected: null,
    });
  };

  updateAdminStatus = orgId => {
    const orgIdToInt = parseInt(orgId);
    this.setState({
      admin: orgIdToInt,
    });
  };

  setOrganizations = orgs => {
    this.setState({
      organizations: orgs
    });
  };

  setActivities = orgId => {
    ActivitiesApiService.getActivities(orgId)
      .then(res => {
        this.setState({
          activities: res,
          filteredActivities: res,
          orgSelected: parseInt(orgId),
        })}
      )
      .catch(this.setError);
  };

  filterActivitiesBy = (key, value) => {
    const activities = this.state.filteredActivities;
    const filteredActivities = activities.filter(activity => activity[key] === value);
    this.setState({
      filteredActivities: filteredActivities
    });
  };

  clearFilters = () => {
    this.setState({
      filteredActivities: this.state.activities
    });
  };

  componentDidMount() {
    OrgsApiService.getOrgs()
      .then(this.setOrganizations)
      .catch(this.setError);
  };

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
      setError: this.setError,
      setOrganizations: this.setOrganizations,
    };

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
                exact
                path='/org/:orgId/activity/view/:activityId'
                component={ActivityDetail}
              />
              <PublicOnlyRoute
                path='/register'
                component={Register}
              />
              <PrivateRoute
                exact
                path='/org/:orgId/activity/add'
                component={AddActivity} 
              />
              <PrivateRoute
                path='/org/:orgId/activity/edit/:activityId'
                component={EditActivity} 
              />
              <PublicOnlyRoute
                exact 
                path='/signin'
                component={AdminLogin} 
              />
              <Route
                exact
                path='/error'
                component={AuthError}
              />
            </Switch>
          <Footer />
        </main>
      </ActivitiesContext.Provider>
    );
  };
};

export default App;