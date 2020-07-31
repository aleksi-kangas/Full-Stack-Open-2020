import { Gender, NewPatient } from './types';
import moment from 'moment';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
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

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date, format: YYYY-MM-DD');
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation")
  };
};

export default toNewPatient;