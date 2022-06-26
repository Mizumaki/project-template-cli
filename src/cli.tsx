import { render, Text, Box } from 'ink';
import { useSelectList } from './components/input/useSelectList';
import { useTextInput } from './components/input/useTextInput';
import { mockProjectTemplates } from './mock';

const App = () => {
  const selectList = useSelectList();
  const textInput = useTextInput();

  const projectTemplates = mockProjectTemplates;
  const templateList = projectTemplates.map(t => {
    return {
      key: t.name,
      value: t.name,
    };
  });

  return (
    <>
      <Box flexDirection='column' paddingX={1}>
        <Box marginY={1} paddingX={1} width={40} borderStyle='round' borderColor='green'>
          <Text bold>Select Template</Text>
        </Box>
        {selectList.render({
          items: templateList,
          onSelect: ({ index, key, value }) => {
            // console.log({
            //   index,
            //   key,
            //   value,
            // });
          },
          // TODO: handle isActive
          isActive: false,
        })}
      </Box>
      <Box flexDirection='column' paddingX={1}>
        <Box marginY={1} paddingX={1} width={40} borderStyle='round' borderColor='blue'>
          <Text bold>Type distribution folder path</Text>
        </Box>
        <Box paddingLeft={2}>
          <Text bold>Enter Path: </Text>
          {textInput.render({
            // TODO: handle isActive
            isActive: true,
          })}
        </Box>
      </Box>
    </>
  );
};

render(<App />);
