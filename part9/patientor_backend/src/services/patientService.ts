import patients from '../../data/patients';
import {Patient, NewPatient, PublicPatient, Entry, NewEntry} from '../types';
import { v4 as uuidv4 } from 'uuid';

/*
WARNING: Returns ssn fields for all patients
*/
const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, entries, ...rest}) => ({...rest}));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    entries: [] as Entry[],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patient: Patient): Entry => {
  const newEntry: Entry = {
    id: uuidv4(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};
const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  addEntry,
  getPatientById
};