import React from 'react';
import ProcessGraph from './components/ProcessGraph';

const App = (): React.ReactElement => (
  <ProcessGraph nodes={['node1', 'node2', 'node3']} />
);

export default App;
