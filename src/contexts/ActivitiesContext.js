import React from 'react'

const ActivitiesContext = React.createContext({
    organizations: [],
    activities: [],
    filteredActivities: [],
    orgSelected: null,
    admin: null,
    setActivities: () => {},
    filterActivitiesBy: () => {},
    updateAdminStatus: () => {},
    clearOrg: () => {},
    clearFilters: () => {},
    addActivity: () => {},
    editActivity: () => {},
    deleteActivity: () => {},
    addOrg: () => {},
    addUser: () => {},
    setError: () => {},
    setOrganizations: () => {},
})

export default ActivitiesContext