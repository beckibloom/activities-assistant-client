import ACTIVITIES from './store'

export default {
    CI: process.env.REACT_APP_CI,
    orgs_endpoint: ACTIVITIES.organizations,
    users_endpoint: ACTIVITIES.users,
    activities_endpoint: ACTIVITIES.activities,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
    TOKEN_KEY: 'activities-assistant-auth-token',
}