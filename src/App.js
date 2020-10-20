import React from 'react';
import SearchInput from './components/SearchInput';
import MemeGenerator from './components/MemeGenerator';


class App extends React.Component {

render() {
  return (
    <div className="App">
      <SearchInput/>
      <MemeGenerator/>
    </div>
  );
}
}

export default App;
