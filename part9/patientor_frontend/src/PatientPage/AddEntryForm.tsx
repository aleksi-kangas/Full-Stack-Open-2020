import React from 'react';
import { useStateValue } from '../state';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, RatingField, RatingOption, TextField } from '../AddPatientModal/FormField';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Button, Grid } from 'semantic-ui-react';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const validateHealthCheck = (values: any) => {
  if (!values.healthCheckRating) {
    return {field: 'healthCheckRating', error: 'Field is required'};
  } else if (!['0', '1', '2', '3'].includes(values.healthCheckRating)) {
    return {field: 'healthCheckRating', error: 'Value out of bounds [0, 3]'};
  }
  return null;
};

// Using AddPatientForm as a base

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const ratingOptions: RatingOption[] = [
    { value: HealthCheckRating.Healthy, label: 'Healthy' },
    { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
    { value: HealthCheckRating.HighRisk, label: 'High Risk' },
    { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' }
  ];

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        // From the material
        const requiredError = 'Field is required';
        const errors: { [field: string]: string} = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'HealthCheck') {
          const healthCheckErrors = validateHealthCheck(values);
          console.log(healthCheckErrors);
          if (healthCheckErrors) {
            errors[healthCheckErrors.field] = healthCheckErrors.error;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <RatingField
              label="Health Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;