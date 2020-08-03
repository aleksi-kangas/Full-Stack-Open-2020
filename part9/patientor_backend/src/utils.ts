import {BaseEntry, Diagnosis, Gender, NewEntry, NewPatient} from './types';
import moment from 'moment';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (param: any): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (param: string): boolean => {
  // Using moment.js library
  return moment(param, 'YYYY-MM-DD', true).isValid();
};

const parseString = (param: any, name: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${name}`);
  }
  return param;
};

const parseArrayOfDiagnosisCodes = (param: any): Array<Diagnosis['code']> => {
  if (!param) {
    return [];
  }
  if (!Array.isArray(param)) {
    throw new Error('param must be an array containing objects of type Diagnosis.code')
  }
  return param.map((code) => parseString(code, 'code'));
};

const parseDate = (date: any, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${name}, format: YYYY-MM-DD`);
  }
  // Using moment.js library
  const parsedDate = moment(date, 'YYYY-MM-DD');
  return moment(parsedDate).format('YYYY-MM-DD');
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender`);
  }
  return gender;
};

const parseHealthRating = (rating: any): number => {
  if (!rating || !isNumber(rating)) {
    throw new Error('Missing or malformed rating');
  }
  if (rating === 0 || rating === 1 || rating === 2 || rating === 3) {
    return rating
  } else {
    throw new Error('Incorrect rating')
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation")
  };
};

export const toNewEntry = (obj: any): NewEntry => {
  // Create a base entry before figuring out which type of entry to create
  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(obj.description, 'description'),
    date: parseDate(obj.date, 'date'),
    specialist: parseString(obj.specialist, 'specialist')
  };

  if (obj.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseArrayOfDiagnosisCodes(obj.diagnosisCodes)
  }

  const type = parseString(obj.type, 'type');

  // Figure out which type of entry should be created
  switch (type) {
    case 'HealthCheck':
      return {
        type: type,
        healthCheckRating: parseHealthRating(obj.healthCheckRating),
        ...baseEntry
      };
    case 'Hospital':
      return {
        type: type,
        discharge: {
          date: parseDate(obj.discharge.date, 'dischargeDate'),
          criteria: parseString(obj.discharge.criteria, 'criteria')
        },
        ...baseEntry
      };
    case 'OccupationalHealthcare':
      return {
        type: type,
        employerName: parseString(obj.employerName, 'employerName'),
        sickLeave: {
          startDate: parseDate(obj.sickLeave.startDate, 'sickLeaveStartDate'),
          endDate: parseDate(obj.sickLeave.endDate, 'sickLeaveEndDate')
        },
        ...baseEntry
      };
    default:
      throw new Error('Entry type could not be parsed')
  }
};