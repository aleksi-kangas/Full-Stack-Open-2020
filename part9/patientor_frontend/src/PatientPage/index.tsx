import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from '../types';
import { updatePatient, useStateValue } from '../state';
import { Header, Icon, List } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

const PatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{ patients }, dispatch] = useStateValue();

  // Resolve id parameter from the url
  const { id: patientId } = useParams<{ id: string }>();

  useEffect(() => {
    // Determine if patient's full data is already present in the state;
    // Search the current patient with string id key,
    // and check whether the ssn property is present
    if (!patients[patientId] || !patients[patientId].ssn) {
      try {
        // Patient data
        axios
          .get(`${apiBaseUrl}/patients/${patientId}`)
          .then(response => {
            setPatient(response.data);
            dispatch(updatePatient(response.data));
          });
      } catch (e) {
        console.error(e)
      }
    } else {
      // Do not re-fetch data; use data in the state instead
      setPatient(patients[patientId])
    }
  }, [patientId]); // eslint-disable-line

  const getGenderIcon = (gender: Gender) => {
    if (gender === 'female') {
      return 'venus';
    } else if (gender === 'male') {
      return 'mars';
    } else {
      return 'genderless'
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Header as="h1">{patient.name}</Header>
      <p>Gender: <Icon name={getGenderIcon(patient.gender)}/></p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      {patient.entries.length > 0
      ? <div>
          <Header as="h3">Entries</Header>
          <List celled>
            {patient.entries.map(entry =>
              <List.Item key={entry.id}>
                <EntryDetails entry={entry} key={entry.id} />
              </List.Item>
            )}
          </List>
        </div>
      : null}
    </div>
  )
};

export default PatientPage;