import React from 'react'

interface Part {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ parts: Array<Part>}> = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;