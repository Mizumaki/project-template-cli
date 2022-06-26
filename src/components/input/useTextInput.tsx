import { Text, useInput, TextProps } from 'ink';
import { useState } from 'react';

export const useTextInput = (): { render: (_?: { isActive?: boolean } & TextProps) => JSX.Element; value: string } => {
  const [text, setText] = useState('');
  return {
    render: arg => {
      return <TextInput value={text} onChange={setText} isActive={arg?.isActive ?? true} style={arg} />;
    },
    value: text,
  };
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
  style?: TextProps;
};

const TextInput: React.FC<Props> = ({ value, onChange, isActive, style }) => {
  useInput(
    (input, key) => {
      if (input) {
        onChange(`${value}${input}`);
      }
      if (key.delete) {
        onChange(value.slice(0, -1));
      }
    },
    { isActive }
  );

  return <Text {...style}>{value}</Text>;
};
