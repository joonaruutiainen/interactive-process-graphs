import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import requireContext from 'require-context.macro';

import { Node } from './types/Node';
import { Edge } from './types/Edge';
import { Graph } from './types/Graph';
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';
import defaultParser from './parser';
import { RandomGraphGenerator } from './random';
import { GraphTool } from './hooks/graphTools/useGraphTools';
import useMultiselectTool from './hooks/graphTools/useMultiselectTool';
import useWindowDimensions from './hooks/useWindowDimensions';
import importIcons from './utils/iconImporter';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 150px;
  margin: 5px;
`;

const ProcessSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 25%;
  margin-left: 5%;
`;

const RggContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 110px;
  font-family: Helvetica;
`;

const OnClickContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
  font-family: Helvetica;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  width: 55%;
  margin: 5%;
  font-family: Helvetica;
`;

const StyledButton = styled.button`
  padding: 6px;
  background-color: #2b2c3d;
  color: white;
  font-family: Helvetica;
`;

const StyledInput = styled.input`
  padding: 3px;
  text-align: center;
  border-radius: 5px;
  font-family: Helvetica;
`;

const StyledSelect = styled.select`
  padding: 3px;
  text-align: center;
  border-radius: 5px;
  font-family: Helvetica;
`;

type ProcessMode = 'examples' | 'random';

const icons = importIcons(requireContext('./icons', false, /\.(svg)$/));

const App: React.FC = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });

  const [processMode, setProcessMode] = useState<ProcessMode>('examples');
  const otherMode = useMemo(() => (processMode === 'examples' ? 'random' : 'examples'), [processMode]);

  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);
  const [rgg, setRgg] = useState(new RandomGraphGenerator(5, 5));

  const [selectedNodes, setSelectedNodes] = useState<string>('');

  const multiselectTool = useMultiselectTool((nodes: Node[]) => {
    if (nodes.length > 0) {
      setSelectedNodes(nodes.map(n => n.id.toString()).join(', '));
    } else {
      setSelectedNodes('none');
    }
  });

  const [clickedNode, setClickedNode] = useState<string>('none');
  const [clickedEdge, setClickedEdge] = useState<string>('none');

  const useCustomClickTool = (): GraphTool => ({
    name: 'Custom Click Tool',
    onNodeClick: (node: Node) => setClickedNode(node.id.toString()),
    onEdgeClick: (edge: Edge) => setClickedEdge(`${edge.from}-${edge.to}`),
  });

  const customClickTool = useCustomClickTool();

  useEffect(() => {
    if (processMode === 'examples') {
      setGraph(defaultParser(selectedProcess));
    } else {
      setGraph(rgg.generate());
    }
  }, [processMode, selectedProcess, rgg]);

  const { width, height } = useWindowDimensions();

  return (
    <AppContainer>
      <RowContainer>
        <ProcessSelectionContainer>
          <StyledButton onClick={() => setProcessMode(otherMode)} type='button'>
            Switch to {otherMode}
          </StyledButton>
          {processMode === 'examples' ? (
            <StyledSelect
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
            </StyledSelect>
          ) : (
            <RggContainer>
              <StyledButton onClick={() => setGraph(rgg.generate())} type='button' style={{ marginTop: '20px' }}>
                Regenerate graph
              </StyledButton>

              <RowContainer>
                Max depth:
                <StyledInput
                  type='number'
                  value={rgg.maxDepth}
                  onChange={e => setRgg(new RandomGraphGenerator(parseInt(e.target.value, 10), rgg.nInputNodes))}
                  style={{ width: '70px' }}
                />
              </RowContainer>
              <RowContainer>
                Input Nodes:
                <StyledInput
                  type='number'
                  value={rgg.nInputNodes}
                  onChange={e => setRgg(new RandomGraphGenerator(rgg.maxDepth, parseInt(e.target.value, 10)))}
                  style={{ width: '70px' }}
                />
              </RowContainer>
            </RggContainer>
          )}
        </ProcessSelectionContainer>
        <OnClickContainer>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Custom onClicks</div>
          <div>{`node clicked: ${clickedNode}`}</div>
          <div>{`edge clicked: ${clickedEdge}`}</div>
        </OnClickContainer>
        <SelectionContainer>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Multiselection</div>
          <div>{`Selected nodes: ${selectedNodes}`}</div>
        </SelectionContainer>
      </RowContainer>
      <ProcessGraph
        nodes={graph.nodes}
        edges={graph.edges}
        customGraphTools={[multiselectTool, customClickTool]}
        width={width * 0.9}
        height={height * 0.7}
        icons={icons}
      />
    </AppContainer>
  );
};

export default App;
