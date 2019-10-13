import ACTIVITIES from './store'

export default {
    CI: process.env.REACT_APP_CI,
    orgs_endpoint: 'http://localhost:8000/api/orgs',
    users_endpoint: ACTIVITIES.users,
    activities_endpoint: 'http://localhost:8000/api/activities',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
    TOKEN_KEY: 'activities-assistant-auth-token',
}