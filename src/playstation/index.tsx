import { Button, colors, LinearProgress, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { getPs4Games } from '../apis/playstation';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 24px;
  background-color: ${colors.deepPurple[800]};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
`;

const PlaystationView = () => {
  const [value, setValue] = useState('');
  const { data, isLoading } = useQuery(['playstation', 'wishlist'], () => getPs4Games());
  return (
    <Root>
      <TopBar>🤍 PlayStation Wishlist</TopBar>
      <Content>
        <Form>
          <TextField variant="outlined" size="small" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button style={{ marginLeft: 16 }} variant="contained" color="primary">
            Get!
          </Button>
        </Form>
        {isLoading && <LinearProgress />}
        <pre>{JSON.stringify(data?.data, null, 4)}</pre>
      </Content>
    </Root>
  );
};

export default PlaystationView;
