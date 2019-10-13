import React from 'react'

const ActivitiesContext = React.createContext({
    organizations: [],
    activities: [],
    filteredActivities: [],
    orgSelected: null,
    admin: false,
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
})

export default ActivitiesContext