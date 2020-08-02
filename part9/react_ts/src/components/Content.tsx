import React from 'react'

interface Part {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ parts: Array<Part>}> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) =>
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      )}
    </div>
  )
};

export default Content