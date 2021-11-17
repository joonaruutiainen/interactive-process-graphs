import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { Graph } from './types/Graph';
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';
import defaultParser from './parser';
import { RandomGraphGenerator } from './random';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

type ProcessMode = 'examples' | 'random';

const App: React.FC = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });

  const [processMode, setProcessMode] = useState<ProcessMode>('examples');
  const otherMode = useMemo(() => (processMode === 'examples' ? 'random' : 'examples'), [processMode]);

  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);
  const [rgg, setRgg] = useState(new RandomGraphGenerator(10, 10));

  useEffect(() => {
    if (processMode === 'examples') {
      setGraph(defaultParser(selectedProcess));
    } else {
      setGraph(rgg.generate());
    }
  }, [processMode, selectedProcess, rgg]);

  return (
    <AppContainer>
      <button onClick={() => setProcessMode(otherMode)} type='button'>
        Switch to {otherMode}
      </button>
      {processMode === 'examples' ? (
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
      ) : (
        <>
          <button onClick={() => setGraph(rgg.generate())} type='button' style={{ marginTop: '20px' }}>
            Regenerate
          </button>
          <div>
            Max depth:
            <input
              type='number'
              value={rgg.maxDepth}
              onChange={e => setRgg(new RandomGraphGenerator(parseInt(e.target.value, 10), rgg.nInputNodes))}
            />
            Input Nodes:
            <input
              type='number'
              value={rgg.nInputNodes}
              onChange={e => setRgg(new RandomGraphGenerator(rgg.maxDepth, parseInt(e.target.value, 10)))}
            />
          </div>
        </>
      )}
      <ProcessGraph nodes={graph.nodes} edges={graph.edges} />
    </AppContainer>
  );
};

export default App;
