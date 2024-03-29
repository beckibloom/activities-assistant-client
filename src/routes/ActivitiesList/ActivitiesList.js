import React from 'react';
import { Link } from 'react-router-dom';

import './ActivitiesList.css';

import Activity from '../../components/Activity/Activity';
import ActivityFilters from '../../components/ActivityFilters/ActivityFilters';
import ActivitiesContext from '../../contexts/ActivitiesContext';

import TokenService from '../../services/token-service';
import OrgsApiService from '../../services/orgs-api-service';
import UsersApiService from '../../services/users-api-service';

class ActivitiesList extends React.Component {
  static contextType = ActivitiesContext;

  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      currentOrg: {org_name: ''},
      activities: [],
    };
  };

  handleDisplayAdminAddLink = () => {
    const loginStatus = TokenService.hasAuthToken();
    const adminOrg = this.context.admin;
    const currentOrg = parseInt(this.props.match.params.orgId);
    if (loginStatus === true && adminOrg === currentOrg) {
      return (
        <div className='add-activity'>
          <Link to={`/org/${currentOrg}/activity/add`}>
            Add new activity
          </Link>
        </div>
      );
    };
  };

  componentDidMount() {
    if (this.state.currentOrg.org_name === '') {
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
        .catch(this.context.setError);
    };
    if (this.context.admin === 0) {
      if (TokenService.hasAuthToken()) {
        UsersApiService.getUserOrg((resJson) => {
          resJson
            .then(resJson =>
              this.context.updateAdminStatus(resJson)
            )
        });
      };
    };
    if (this.context.activities.length === 0) {
      const currentOrg = this.props.match.params.orgId;
      this.context.setActivities(currentOrg);
    };
  };

  handleDisplayHeader = () => {
    return <h1>Activities at <br/>{this.state.currentOrg.org_name}</h1>
  };

  render() {
    return (
      <ActivitiesContext.Consumer>
        {(context) => (
          <>
            <header role="banner">
              {this.handleDisplayHeader()}
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
                  />
                )}
              </ul>
            </section>
          </>
        )}
        </ActivitiesContext.Consumer>
    );
  };
};

export default ActivitiesList;