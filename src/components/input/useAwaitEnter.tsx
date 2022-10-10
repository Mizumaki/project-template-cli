import { useInput } from 'ink';

export const useAwaitEnter = (): {
  render: (_: { isActive: boolean; onEnter: () => void }) => JSX.Element;
} => {
  return {
    render: ({ isActive, onEnter }) => <AwaitEnter isActive={isActive} onEnter={onEnter} />,
  };
};

type Props = {
  isActive: boolean;
  onEnter: () => void;
};

const AwaitEnter: React.FC<Props> = ({ isActive, onEnter }) => {
  useInput(
    (_, key) => {
      if (key.return) {
        onEnter();
      }
    },
    { isActive }
  );

  return null;
};
