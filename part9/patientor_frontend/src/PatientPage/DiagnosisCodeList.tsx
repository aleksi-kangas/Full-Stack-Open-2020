import React from 'react';
import { List } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';

const DiagnosisCodeList: React.FC<{codes: Array<Diagnosis['code']>}> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnoses) {
    return null;
  }

  return (
    <List celled>
      <List.Header>Diagnoses:</List.Header>
      {codes.map(code => {
        return (
          <List.Item key={code}>
            <List.Content>
              <List.Header>{code}</List.Header>
              <List.Description>
                {diagnoses[code]
                  ? diagnoses[code].name
                : null}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default DiagnosisCodeList;