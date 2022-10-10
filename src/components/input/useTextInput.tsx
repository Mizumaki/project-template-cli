import { Text, useInput, TextProps } from 'ink';
import { useState } from 'react';

export const useTextInput = (): {
  render: (_: { onEnter: (value: string) => void; isActive?: boolean } & TextProps) => JSX.Element;
  value: string;
} => {
  const [text, setText] = useState('');
  return {
    render: ({ onEnter, isActive, ...style }) => {
      return <TextInput value={text} onChange={setText} onEnter={onEnter} isActive={isActive ?? true} style={style} />;
    },
    value: text,
  };
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  onEnter: (value: string) => void;
  isActive: boolean;
  style?: TextProps;
};

const TextInput: React.FC<Props> = ({ value, onChange, onEnter, isActive, style }) => {
  useInput(
    (input, key) => {
      if (key.return) {
        onEnter(value);
        return;
      }
      if (key.delete) {
        onChange(value.slice(0, -1));
        return;
      }
      if (input) {
        onChange(`${value}${input}`);
      }
    },
    { isActive }
  );

  return <Text {...style}>{value}</Text>;
};
