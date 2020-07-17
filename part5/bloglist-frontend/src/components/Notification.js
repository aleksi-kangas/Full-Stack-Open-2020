import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }
  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Notification