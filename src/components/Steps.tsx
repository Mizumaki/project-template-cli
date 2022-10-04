import React, { useCallback, useState } from 'react';

type Props = {
  steps: ((isActive: boolean, goToNextStep: () => void, endSteps: () => void) => JSX.Element)[];
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
  const [isForceEnd, setIsForceEnd] = useState(false)
  const endSteps = useCallback(() => {
    setIsForceEnd(true)
  }, [])

  return (
    <>
      {steps.map((step, i) => {
        if (currentStepIndex < i) {
          return null;
        }
        const isActive = isForceEnd ? false : currentStepIndex === i;
        return <React.Fragment key={i}>{step(isActive, goToNext, endSteps)}</React.Fragment>;
      })}
    </>
  );
};
