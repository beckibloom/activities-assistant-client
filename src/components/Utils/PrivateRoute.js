import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
// import ActivitiesContext from '../../contexts/ActivitiesContext'

export default function PrivateRoute({ component, ...props }) {
  const Component = component

  //include validation for user has matching orgId

  return (
      <Route
        {...props}
        render={componentProps => (
          (TokenService.hasAuthToken())
            ? <Component {...componentProps} />
            : <Redirect
                to={{
                  pathname: '/error',
                  state: { from: componentProps.location }
                }}
                />
        )}
      />
  )
}