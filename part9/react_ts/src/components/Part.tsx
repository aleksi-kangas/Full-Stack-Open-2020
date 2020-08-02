import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart}> = ({ part }) => {

  /**
   * Helper function for exhaustive type checking
   * Source: the material
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <h4>{part.name}</h4>
          <ul>
            <li>Description: {part.description}</li>
            <li>Exercises: {part.exerciseCount}</li>
          </ul>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <h4>{part.name}</h4>
          <ul>
            <li>Group projects: {part.groupProjectCount}</li>
            <li>Exercises: {part.exerciseCount}</li>
          </ul>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <h4>{part.name}</h4>
          <ul>
            <li>Description: {part.description}</li>
            <li>Exercises: {part.exerciseCount}</li>
            <li>Exercise submission link: {part.exerciseSubmissionLink}</li>
          </ul>
        </div>
      );
    case 'Client-Developer Interaction':
      return (
        <div>
          <h4>{part.name}</h4>
          <ul>
            <li>Description: {part.description}</li>
            <li>Exercises: {part.exerciseCount}</li>
            <li>Presentations: {part.presentations}</li>
          </ul>
        </div>
      );
    default:
      return assertNever(part)
  }
};

export default Part;