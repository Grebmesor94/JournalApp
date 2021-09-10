import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
  isAunthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route 
      {...rest}
      component={(props) => (
        (!isAunthenticated)?
        (
          <Component {...props} />
        )
        :
        (
          <Redirect to="/" />
        )
          
      )}

    />
  )
}

PublicRoute.propTypes = {
  isAunthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired, 
}