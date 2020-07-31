import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

/*
WARNING: Returns ssn fields for all patients
*/
const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsSsnExcluded = (): Omit<Patient, 'ssn'>[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest}) => ({...rest}));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsSsnExcluded,
  addPatient
};