import { NextPage } from 'next';
import Faucet from '../components/Faucet';
import Layout from '../components/Layout';

const FaucetPage: NextPage = () => {
  return (
    <Layout>
      <Faucet />
    </Layout>
  );
};

export default FaucetPage;
