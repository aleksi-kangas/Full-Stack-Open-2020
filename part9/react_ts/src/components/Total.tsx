import React from 'react'

interface Part {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ parts: Array<Part>}> = ({ parts }) => {
  return (
    <p>
      <strong> Total number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  )
};

export default Total;