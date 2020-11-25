import React from 'react';
import MemeGenerator from './components/MemeGenerator';
import Instruction from './components/Instruction';

class App extends React.Component {

render() {
  return (
    <div className="App">
      <Instruction title="Instruction"/>
      <MemeGenerator/>
    </div>
  );
}
}

export default App;
