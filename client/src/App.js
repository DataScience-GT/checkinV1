import './App.css';
import { useState } from 'react';

console.log(process.env.REACT_APP_CHECKIN_API_KEY);

function App() {
  const [test, setTest] = useState(null);
  const getTest = () => {
    fetch(`/api/${process.env.REACT_APP_CHECKIN_API_KEY}/event/list`)
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
