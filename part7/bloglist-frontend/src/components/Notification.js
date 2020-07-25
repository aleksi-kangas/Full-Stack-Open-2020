import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }
  if (notification.isError) {
    return (
      <Alert variant="warning">
        {notification.message}
      </Alert>
    )
  } else {
    return (
      <Alert variant="success">
        {notification.message}
      </Alert>
    )
  }
}

export default Notification