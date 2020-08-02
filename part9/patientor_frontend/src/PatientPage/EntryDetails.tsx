import React from 'react';
import { Entry } from '../types';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalDetails from './OccupationalDetails';

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  /**
   * Helper function for exhaustive type checking
   * Source: the material
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalDetails entry={entry} />;
    default:
      return assertNever(entry)
  }
};

export default EntryDetails;