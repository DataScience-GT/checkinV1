import './App.css';
import { useState } from 'react';

function App() {
  const [test, setTest] = useState(null);
  const getTest = () => {
    fetch('/api/eventcheckin/test1/test2')
      .then(result => result.json())
      .then(body => setTest(body));
  };
  return (
    <div className="app">
      <h1>Word Associations Map</h1>
      <button onClick={getTest}>Find Associations</button>
      {test ? <span>{test.toString()}</span> : <p>no results</p>}
    </div>
  );
}

export default App;
