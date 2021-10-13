import React, { useState } from 'react';
import styled from 'styled-components';
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';
import { Edge } from './types/Edge';
import { Node } from './types/Node';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom right, Silver, DimGray);
`;

const getNodes = (input: any[]): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  input.forEach((node: any) => {
    nodes.push({
      id: node.id,
      type: node.type,
    });
    node.nextNodes.forEach((next: number) => {
      edges.push({
        from: node.id,
        to: next,
      });
    });
  });
  return { nodes, edges };
};

const App: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);

  return (
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
      <ProcessGraph nodes={getNodes(selectedProcess.nodes).nodes} edges={getNodes(selectedProcess.nodes).edges} />
    </AppContainer>
  );
};

export default App;
