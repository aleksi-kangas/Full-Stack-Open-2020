import React from 'react'
import { Icon } from 'semantic-ui-react';

const HealthSymbol: React.FC<{rating: number}> = ({ rating }) => {
  const resolveHeartColor = () => {
    switch(rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
    }
  };

  return (
    <Icon name="heart" color={resolveHeartColor()} />
  )
};

export default HealthSymbol;