import React, { useState } from 'react';

type Props = {
  steps: ((isActive: boolean, goToNextStep: () => void) => JSX.Element)[];
};

export const Steps: React.FC<Props> = ({ steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const goToNext = () => {
    setCurrentStepIndex(prev => {
      let newIndex = prev;
      newIndex++;
      return newIndex;
    });
  };

  return (
    <>
      {steps.map((step, i) => {
        if (currentStepIndex < i) {
          return null;
        }
        const isActive = currentStepIndex === i;
        return <React.Fragment key={i}>{step(isActive, goToNext)}</React.Fragment>;
      })}
    </>
  );
};
