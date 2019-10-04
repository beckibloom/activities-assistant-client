import React from 'react'

const ActivitiesContext = React.createContext({
    organizations: [],
    activities: [],
    users: [],
    setActivities: () => {},
    filterActivitiesBy: () => {},
})

export default ActivitiesContext