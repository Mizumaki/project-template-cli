import { Box, Text, useInput } from 'ink';
import { useMemo, useState } from 'react';

type ListItem = { key: string; value: string };

/**
 * This hook is used to render SelectList.
 * Note that this hook captures `key.upArrow`, `key.downArrow`, `key.return` events.
 */
export const useSelectList = <Item extends ListItem>(
  listItems: Item[]
): {
  render: (_: { onEnter: () => void; isActive?: boolean }) => JSX.Element;
  selected: Item;
} => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedItem = useMemo(() => {
    return listItems[selectedIndex] as Item;
  }, [listItems, selectedIndex]);

  return {
    render: ({ onEnter, isActive }) => (
      <SelectList
        items={listItems}
        selected={selectedItem}
        onKeyUp={() => {
          setSelectedIndex(i => Math.max(0, i - 1));
        }}
        onKeyDown={() => {
          setSelectedIndex(i => Math.min(listItems.length - 1, i + 1));
        }}
        onEnter={onEnter}
        isActive={isActive ?? true}
      />
    ),
    selected: selectedItem,
  };
};

const SelectList = <Item extends ListItem>({
  items,
  selected,
  onKeyUp,
  onKeyDown,
  onEnter,
  isActive,
}: {
  items: Item[];
  selected: Item;
  onKeyUp: () => void;
  onKeyDown: () => void;
  onEnter: () => void;
  isActive: boolean;
}) => {
  useInput(
    (_, key) => {
      if (key.upArrow) {
        onKeyUp();
      }
      if (key.downArrow) {
        onKeyDown();
      }
      if (key.return) {
        onEnter();
      }
    },
    { isActive }
  );

  return (
    <Box flexDirection='column'>
      {items.map(item => {
        const isSelected = item.key === selected.key;
        return (
          <Box key={item.key}>
            <Text color='green'>{isSelected ? '> ' : '  '}</Text>
            <Text bold={isSelected} underline={isSelected}>
              {item.value}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};
