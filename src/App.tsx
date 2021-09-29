import React, { useState } from 'react';
import ProcessGraph from './components/ProcessGraph';
import exampleProcesses from './exampleProcesses';

const App: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState(exampleProcesses[0]);

  return (
    <div>
      <select
        defaultValue={exampleProcesses[0].name}
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
      <ProcessGraph nodes={selectedProcess.nodes.map(nodes => nodes.description)} />
    </div>
  );
};
export default App;
