import React, { useState, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from './theme'
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';
import defaultParser from './parser';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom right, Silver, DimGray);
`;

const App: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);

  const { nodes, edges } = useMemo(() => defaultParser(selectedProcess), [defaultParser, selectedProcess]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer>
        <select
          value={selectedProcess.name}
          onChange={e => {
            e.preventDefault();
            const process = exampleProcesses.find(p => p.name === e.target.value);
            if (process) setSelectedProcess(process);
          }}
          style={{ marginTop: '20px' }}
        >
          {exampleProcesses.map(process => (
            <option value={process.name} key={process.name}>
              {process.name}
            </option>
          ))}
        </select>
        <ProcessGraph nodes={nodes} edges={edges} />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
