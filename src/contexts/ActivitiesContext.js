import React from 'react';

const ActivitiesContext = React.createContext({
  organizations: [],
  activities: null,
  filteredActivities: [],
  orgSelected: null,
  admin: 0,
  setActivities: () => {},
  filterActivitiesBy: () => {},
  updateAdminStatus: () => {},
  clearOrg: () => {},
  clearFilters: () => {},
  setError: () => {},
  setOrganizations: () => {},
});

export default ActivitiesContext;