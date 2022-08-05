import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import { getExamples, getTest } from './api';
import Test from './Test';

function App() {
  const [count, setCount] = useState(0);

  const { data: testData } = useQuery(['test'], getTest);

  const { data: exampleData } = useQuery(['examples'], getExamples);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{testData}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Test />
      <p className="read-the-docs">
        <ul>
          {exampleData?.map((example) => (
            <li key={example.id}>{`${example.id} --> ${example.name}: ${example.value}`}</li>
          ))}
        </ul>
      </p>
    </div>
  );
}

export default App;
