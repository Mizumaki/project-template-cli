import { render, Text, Box } from 'ink';
import { useAwaitEnter } from './components/input/useAwaitEnter';
import { useSelectList } from './components/input/useSelectList';
import { useTextInput } from './components/input/useTextInput';
import { Steps } from './components/Steps';
import { mockProjectTemplates } from './mock';
import { downloadFile } from './utils/downloadFile';

const App = () => {
  const templateList = mockProjectTemplates.map(t => {
    return {
      key: t.name,
      value: t.name,
      url: t.url,
    };
  });
  const selectList = useSelectList(templateList);
  const textInput = useTextInput();
  const awaitEnter = useAwaitEnter();

  return (
    <Steps
      steps={[
        (isActive, goToNext) => (
          <Box flexDirection='column' paddingX={1}>
            <Box marginY={1} paddingX={1} width={40} borderStyle='round' borderColor='green'>
              <Text bold>Select Template</Text>
            </Box>
            {selectList.render({
              onEnter: () => {
                goToNext();
              },
              isActive,
            })}
          </Box>
        ),
        (isActive, goToNext) => (
          <Box flexDirection='column' paddingX={1}>
            <Box marginY={1} paddingX={1} width={40} borderStyle='round' borderColor='blue'>
              <Text bold>Type distribution folder path</Text>
            </Box>
            <Box paddingLeft={2}>
              <Text bold>Enter Path: </Text>
              {textInput.render({
                onEnter: () => {
                  // TODO: Check path validity
                  goToNext();
                },
                isActive,
              })}
            </Box>
          </Box>
        ),
        (isActive, goToNext) => (
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
                <Text>{selectList.selected.value}</Text>
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
            <Box justifyContent='center' marginBottom={1}>
              <Text backgroundColor='white' color='blackBright' bold>
                Press enter to proceed
              </Text>
              {awaitEnter.render({
                isActive,
                onEnter: () => {
                  const url = new URL(selectList.selected.value);
                  // TODO: use async/await
                  void downloadFile(url, textInput.value)
                    .then(() => {
                      goToNext();
                    })
                    .catch((e: string) => {
                      console.log({ e });
                    });
                },
              })}
            </Box>
          </Box>
        ),
        // TODO: Add Loading page with download, unzip, distribute logics
        // TODO: Add Complete
      ]}
    />
  );
};

render(<App />);
