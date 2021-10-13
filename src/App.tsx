import React, { useState } from 'react';
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';
import { DefaultParser } from './parser';

const App: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);

  const parser = new DefaultParser;
  const nodes = parser.parse(selectedProcess.nodes);

  return (
    <div>
      <select
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
      </select>
      <ProcessGraph nodes={nodes} />
    </div>
  );
};

export default App;
