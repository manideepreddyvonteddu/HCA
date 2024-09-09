import React from 'react';
import TreatmentServiceList from './TreatmentServiceList';
import './App.css';

function App() {
  console.log('in App')
  return (
    <div className="App">
      <header className="App-header">
        <h1>Find Care</h1>
      </header>
      <TreatmentServiceList />
    </div>
  );
}

export default App;
