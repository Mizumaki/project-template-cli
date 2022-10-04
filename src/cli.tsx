import { render, Text, Box } from 'ink';
import { useState } from 'react';
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
  const projectList = useSelectList(templateList);
  const distributedPathText = useTextInput();
  const awaitEnter = useAwaitEnter();

  const [error, setError] = useState<{ message: string }>()

  return (
    <>
    <Steps
      steps={[
        (isActive, goToNext) => (
          <Box flexDirection='column' paddingX={1}>
            <Box marginY={1} paddingX={1} width={40} borderStyle='round' borderColor='green'>
              <Text bold>Select Template</Text>
            </Box>
            {projectList.render({
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
              {distributedPathText.render({
                onEnter: () => {
                  // TODO: Check path validity
                  goToNext();
                },
                isActive,
              })}
            </Box>
          </Box>
        ),
        (isActive, goToNext, endSteps) => (
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
                <Text>{projectList.selected.value}</Text>
              </Box>
              <Box flexDirection='row'>
                <Box width={20} justifyContent='flex-end' marginRight={1}>
                  <Text bold color='blueBright'>
                    Distribution Path:
                  </Text>
                </Box>
                <Text>{distributedPathText.value}</Text>
              </Box>
            </Box>
            <Box justifyContent='center' marginBottom={1}>
              <Text backgroundColor='white' color='blackBright' bold>
                Press enter to proceed
              </Text>
              {awaitEnter.render({
                isActive,
                onEnter: () => {
                  const url = new URL(projectList.selected.url);
                  // TODO: use async/await
                  // TODO: zip ファイルを DL して解凍、の２手順が必要. その時、distributedPathText は .zip ではないので何かしらの option を downloadFile に追加する. 例えば、folder 配下に同名で作る option とか
                  void downloadFile(url, distributedPathText.value)
                    .then(() => {
                      goToNext();
                    })
                    .catch((e: string) => {
                      setError({ message: e.toString() })
                      endSteps();
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
    {/* TODO: Rich Error UI */}
    <Text>{error?.message}</Text>
    </>
  );
};

render(<App />);
