import React from 'react'
import { OccupationalHealthcareEntry } from '../types';
import { List, Icon } from 'semantic-ui-react';
import DiagnosisCodeList from './DiagnosisCodeList';

const OccupationalDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return (
    <List.Content>
      <List.Header>{entry.date} <Icon name='suitcase'/></List.Header>
      <List.Description>{entry.description}</List.Description>
      <List.Icon name='doctor'/> {entry.specialist}
      {entry.diagnosisCodes
        ? <DiagnosisCodeList codes={entry.diagnosisCodes} />
        : null
      }
      <List.Content>
        Employer: {entry.employerName}
      </List.Content>
    </List.Content>
  )
};

export default OccupationalDetails;