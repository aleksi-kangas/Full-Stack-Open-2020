export type Diagnose = {
  code: string,
  name: string,
  latin?: string
};

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  "occupation": string
};

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}
