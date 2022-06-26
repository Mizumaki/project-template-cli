import { Box, Text, useInput } from 'ink';
import { useState } from 'react';

type ListItem = { key: string; value: string };

/**
 * This hook is used to render SelectList.
 * Note that this hook captures `key.upArrow`, `key.downArrow`, `key.return` events.
 */
export const useSelectList = (): {
  render: <Item extends ListItem>(_: {
    items: Item[];
    onSelect: (selected: { index: number } & Item) => void;
    isActive?: boolean;
  }) => JSX.Element;
} => {
  return {
    render: ({ items, onSelect, isActive }) => (
      <SelectList items={items} onSelect={onSelect} isActive={isActive ?? true} />
    ),
  };
};

const SelectList = <Item extends ListItem>({
  items,
  onSelect,
}: {
  items: Item[];
  onSelect: (selected: { index: number } & Item) => void;
  isActive: boolean;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(i => Math.max(0, i - 1));
    }
    if (key.downArrow) {
      setSelectedIndex(i => Math.min(items.length - 1, i + 1));
    }
    if (key.return) {
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        onSelect({ index: selectedIndex, ...selectedItem });
      }
    }
  });

  return (
    <Box flexDirection='column'>
      {items.map((item, i) => {
        const isSelected = i === selectedIndex;
        return (
          <Box key={item.key}>
            <Text color='green'>{isSelected ? '> ' : '  '}</Text>
            <Text bold={isSelected}>{item.value}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
