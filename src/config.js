import ACTIVITIES from './store'

export default {
    CI: process.env.REACT_APP_CI,
    orgs_endpoint: ACTIVITIES.organizations,
    users_endpoint: ACTIVITIES.users,
    activities_endpoint: ACTIVITIES.activities,
}