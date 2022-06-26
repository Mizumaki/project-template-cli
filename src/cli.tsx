import { render, Text, Box, Newline } from 'ink';
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
      <Box flexDirection='column' paddingX={1} marginY={1} borderStyle='classic' width={100}>
        <Box justifyContent='center'>
          <Text bold>Summary</Text>
        </Box>
        <Box flexDirection='column' paddingY={1}>
          <Box flexDirection='row'>
            <Box width={20} justifyContent='flex-end' marginRight={1}>
              <Text bold color='green'>
                Template:
              </Text>
            </Box>
            <Text>{textInput.value}</Text>
          </Box>
          <Box flexDirection='row'>
            <Box width={20} justifyContent='flex-end' marginRight={1}>
              <Text bold color='blueBright'>
                Distribution Path:
              </Text>
            </Box>
            <Text>{textInput.value}</Text>
          </Box>
        </Box>
        <Box justifyContent='center'>
          <Text>Press enter to proceed</Text>
        </Box>
      </Box>
    </>
  );
};

render(<App />);
