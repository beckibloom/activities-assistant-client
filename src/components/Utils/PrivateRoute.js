import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function PrivateRoute({ component, ...props }) {
  const Component = component

  //include validation for user has matching orgId

  return (
    <Route
      {...props}
      render={componentProps => (
        (TokenService.hasAuthToken() && TokenService.hasAuthToken())
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/signin',
                state: { from: componentProps.location }
              }}
              />
      )}
    />
  )
}