import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useQuery } from '@tanstack/react-query';
import { getExamples, getTest } from './api';
import Test from './Test';
import styled, { keyframes } from 'styled-components';

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;

  :hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const logoRotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ReactLogo = styled(Logo)`
  :hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
  animation: ${logoRotateKeyframes} infinite 20s linear;
`;

const Card = styled.div`
  padding: 2em;
`;

const ReadTheDocs = styled.p`
  color: #888;
  text-align: left;
`;

function App() {
  const [count, setCount] = useState(0);

  const { data: testData } = useQuery(['test'], getTest);

  const { data: exampleData } = useQuery(['examples'], getExamples);

  return (
    <Root>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src="/vite.svg" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <ReactLogo src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>{testData}</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <Test />
      <ReadTheDocs>
        <ul>
          {exampleData?.map((example) => (
            <li key={example.id}>{`${example.id} --> ${example.name}: ${example.value}`}</li>
          ))}
        </ul>
      </ReadTheDocs>
    </Root>
  );
}

export default App;
