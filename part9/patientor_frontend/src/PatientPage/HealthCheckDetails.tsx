import React from 'react';
import { HealthCheckEntry } from '../types';
import { List, Icon } from 'semantic-ui-react';
import HealthSymbol from './HealthSymbol';
import DiagnosisCodeList from './DiagnosisCodeList';

const HealthCheckDetails: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  return (
    <List.Content>
      <List.Header>{entry.date} <Icon name='hospital symbol'/></List.Header>
      <List.Description>{entry.description}</List.Description>
      <List.Icon name='doctor'/> {entry.specialist}
      {entry.diagnosisCodes
        ? <DiagnosisCodeList codes={entry.diagnosisCodes} />
        : null
      }
      <List.Content>
        <HealthSymbol rating={entry.healthCheckRating}/>
      </List.Content>
    </List.Content>
  );
};

export default HealthCheckDetails;