import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Home } from './components/Home';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );

}

export default App;
