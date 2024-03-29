import React from 'react';
import {Redirect} from 'react-router-dom';
import './AddActivity.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import ActivitiesApiService from '../../services/activities-api-service';
import OrgsApiService from '../../services/orgs-api-service';
import TokenService from '../../services/token-service';
import UsersApiService from '../../services/users-api-service';

class AddActivity extends React.Component {
  static contextType = ActivitiesContext;

  constructor(props) {
    super(props);
    this.state = {
      newActivity: {},
      numError: '',
      currentOrg: {
        org_name: ''
      },
    };
  };

  validateCost = e => {
    if (isNaN(e.target.value) === true) {
      this.setState({
        numError: 'Cost must be a number'
      });
    } else {
      this.setState({
        numError: ''
      });
    };
  };

  updateState = e => {
    const value = e.target.value;
    const key = e.target.id;
    const newActivity = this.state.newActivity;
    newActivity[key] = value;
    this.setState({
        newActivity
    });
    return;
  }

  handleSubmit = e => {
    e.preventDefault();
    const newActivity = this.state.newActivity;
    const orgId = parseInt(this.props.match.params.orgId);
    newActivity.org_id = orgId;
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
      .catch(this.context.setError);
  };

  componentDidMount() {
    if (this.context.orgSelected === null) {
      OrgsApiService.getOrgs()
        .then(res => {
          this.setState({
            organizations: res
          });
          this.context.setOrganizations(res);
        })
        .then(res => {
          const currentOrg = parseInt(this.props.match.params.orgId);
          const org = this.state.organizations.find(org => org.id === currentOrg);
          this.setState({
            currentOrg: org
          });
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

  render() {
    const userOrg = parseInt(this.context.admin);
    const currentOrg = parseInt(this.props.match.params.orgId);

    if (userOrg !== currentOrg && (this.context.admin !== 0 || !TokenService.hasAuthToken())) {
      return <Redirect to="/error" />
    };

    return (
      <>
        <header role="banner">
          <h1>Add New Activity</h1>
        </header>

        <form onSubmit={this.handleSubmit} >
          <section className="at-a-glance">
            <ul className="add-form">
              <li>
                Activity Title: 
                <input type="text" id="title" required onChange={this.updateState} />
              </li>
              <li>
                Day:
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
              </li>
              <li>
                Time: 
                <input type="text" id="activity_time" required onChange={this.updateState} />
              </li>
              <li>
                Ages:
                <div className="select-container">
                  <select id="ages" required onChange={this.updateState}>
                    <option value=''>Choose one</option>
                    <option value="3-5">3-5</option>
                    <option value="6-8">6-8</option>
                    <option value="9-11">9-11</option>
                  </select>
                </div>
              </li>
              <li>
                Activity Group: 
                <div className="select-container">
                  <select id="activity_group" required onChange={this.updateState}>
                    <option value="">Choose one</option>
                    <option value="Athletics">Athletics</option>
                    <option value="General Enrichment">General Enrichment</option>
                    <option value="Performing Arts">Performing Arts</option>
                    <option value="STEAM">STEAM</option>
                  </select>
                </div>
              </li>
              <li>
                Location: 
                <input type="text" id="activity_location" required onChange={this.updateState} />
              </li>
              <li>
                Cost: $
                <input type="text" id="cost"  required onChange={this.updateState} onBlur={this.validateCost} />
              </li>
              <li>
                <span className="error">{this.state.numError}</span>
              </li>
              <li>
                Dates: 
                <input type="text" id="dates" required onChange={this.updateState} />
              </li>
              <li>
                Activity image (provide URL):
              </li>
              <li>
                <input type="text" id="thumbnail" required onChange={this.updateState} />
              </li>
            </ul>
          </section>

          <section className="activity-details">
            <ul className="add-form">
              <li className="add-form-label">
                Main activity description 
              </li>
              <li>
                <textarea id="activity_description" required onChange={this.updateState} />
              </li>
              <li className="add-form-label">
                What should students prepare for? 
              </li>
              <li>
                <textarea id="preparation" required onChange={this.updateState} />
              </li>
              <li className="add-form-label">
                Provide contact for questions 
              </li>
              <li>
                <textarea id="contact" required onChange={this.updateState} />
              </li>
            </ul>
          </section>

          <section>
            <button type='submit'>Save changes</button>
          </section>
        </form>
      </>
    );
  };
};

export default AddActivity;