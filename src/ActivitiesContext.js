import React from 'react'

const ActivitiesContext = React.createContext({
    organizations: [],
    activities: [],
    filteredActivities: [],
    users: [],
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
})

export default ActivitiesContext