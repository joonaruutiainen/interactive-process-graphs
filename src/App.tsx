import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';

import ProcessGraph from './lib/components/ProcessGraph';
import { Node, Edge, Graph, DefaultTheme, IconMap } from './lib/types';
import RandomGraphGenerator from './lib/utils/random';
import { GraphTool } from './lib/hooks/graphTools/useGraphTools';
import useMultiselectTool from './lib/hooks/graphTools/useMultiselectTool';
import useWindowDimensions from './lib/hooks/useWindowDimensions';
import defaultIcons from './lib/defaultIcons';

import exampleProcesses from './exampleProcesses';
import defaultParser from './defaultParser';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: silver;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 200px;
  margin: 5px;
`;

const ProcessSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
  margin-left: 5%;
`;

const RggContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 180px;
  height: 110px;
  margin-bottom: 5px;
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
  width: 140px;
  padding: 6px;
  margin-bottom: 5px;
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
  width: 170px;
  margin: 5px;
  padding: 3px;
  text-align: center;
  border-radius: 5px;
  font-family: Helvetica;
`;

const ElomaticTheme: DefaultTheme = {
  borderRadius: 7,
  fontFamily: 'Helvetica',
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#003b72',
      text: '#ffffff',
    },
    secondary: {
      main: '#002e41',
      text: '#ffffff',
    },
    background: {
      main: '#e6f3f8',
      text: '#000000',
    },
  },
};

type ProcessMode = 'examples' | 'random';

// Example: How to load own icons in a Webpack environment
// const ICONS = importIcons(require.context('path/to/icons-folder/here/', false, /\.(svg)$/));

const App: React.FC = () => {
  const [icons, setIcons] = useState<IconMap | undefined>(defaultIcons);
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });

  const [processMode, setProcessMode] = useState<ProcessMode>('examples');
  const otherMode = useMemo(() => (processMode === 'examples' ? 'random' : 'examples'), [processMode]);

  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);
  const [rgg, setRgg] = useState(new RandomGraphGenerator(5, 5));

  const [selectedNodes, setSelectedNodes] = useState<string>('none');

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
    icon: <Icon name='tool' />,
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

  useEffect(() => {
    setClickedNode('none');
    setClickedEdge('none');
  }, [graph]);

  const { width, height } = useWindowDimensions();

  const changeIcons = (value: string) => {
    if (value === 'yes') {
      setIcons(defaultIcons);
    }
    if (value === 'no') {
      setIcons(undefined);
    }
  };

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
          <StyledSelect onChange={event => changeIcons(event.target.value)}>
            <option value='yes'>Icons ON</option>
            <option value='no'>Icons OFF</option>
          </StyledSelect>
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
        nodeDataFormat='yaml'
        width={width * 0.9}
        height={height * 0.7}
        icons={icons}
        theme={ElomaticTheme}
      />
    </AppContainer>
  );
};

export default App;
