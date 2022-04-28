import type { NextPage } from 'next';
import { useEffect, useId, useState } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import useWeb3 from '../hooks/useWeb3';

const Home: NextPage = () => {
  const { account, connect, provider } = useWeb3();
  const [result, setResult] = useState<string>();
  const challenge = useId();

  const sign = () => {
    provider?.getSigner().signMessage(`Hello ${challenge}`).then(setResult);
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <Layout>
      <Typography variant="h3" component="h1">
        DeepSquare Dual token ERC-1155 bridge
      </Typography>

      <Typography paragraph>This small experiment is attempt to:</Typography>

      <ul>
        <li>create a basic web3 ethers.js based library</li>
        <li>learn how to use pnpm workspaces</li>
        <li>use the ERC1155 standard to a create a replica of the DeepSquare token ecosystem</li>
      </ul>

      <Button onClick={connect}>Connect wallet</Button>

      <Button onClick={sign} variant="outlined">
        Sign
      </Button>

      <Typography paragraph>{account}</Typography>
      <Typography paragraph>{result}</Typography>
    </Layout>
  );
};

export default Home;
