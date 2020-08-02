import React from 'react'
import { HospitalEntry } from '../types';
import { List, Icon } from 'semantic-ui-react';
import DiagnosisCodeList from './DiagnosisCodeList';

const HospitalDetails: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <List.Content>
      <List.Header>{entry.date} <Icon name='hospital'/></List.Header>
      <List.Description>{entry.description}</List.Description>
      <List.Icon name='doctor'/> {entry.specialist}
      {entry.diagnosisCodes
        ? <DiagnosisCodeList codes={entry.diagnosisCodes} />
        : null
      }
      <List.Header>Discharge:</List.Header>
      <List.Content>Date: {entry.discharge.date}</List.Content>
      <List.Content>Criteria: {entry.discharge.criteria}</List.Content>
    </List.Content>
  )
};

export default HospitalDetails;