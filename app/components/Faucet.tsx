import { parseEther } from 'ethers/lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useFaucet from '../hooks/useFaucet';
import useWeb3 from '../hooks/useWeb3';
import { waitTx } from '../lib/web3/wait';
import HFSelect from './forms/HFSelect';
import HFTextField from './forms/HFTextField';

interface FaucetFormData {
  action: 'mint' | 'burn';
  account: string;
  amount: string;
}

const Faucet: FC = () => {
  const { account, refresh } = useWeb3();
  const faucet = useFaucet();
  const { control, handleSubmit, getValues, setValue } = useForm<FaucetFormData>({
    defaultValues: {
      action: 'mint',
      amount: '2000',
    },
  });

  const onSubmit: SubmitHandler<FaucetFormData> = async (data) => {
    if (!faucet || !account) return;

    const parsedAmount = parseEther(data.amount);
    const tx = data.action === 'mint' ? faucet.mintDPS(parsedAmount) : faucet.burnDPS(parsedAmount);

    await toast.promise(waitTx(tx), {
      pending: 'Waiting for transaction confirmation',
      success: 'Success!',
    });

    await refresh();
  };

  useEffect(() => {
    const currentAccount = getValues('account');

    if (currentAccount || !account) {
      return;
    }

    setValue('account', account);
  }, [account, getValues, setValue]);

  return (
    <>
      <Typography variant="h4">Faucet</Typography>
      <Typography paragraph>Request testing DPS</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <HFSelect name="action" control={control} label="Action" sx={{ mr: 2 }}>
            <MenuItem value="mint">Mint</MenuItem>
            <MenuItem value="burn">Burn</MenuItem>
          </HFSelect>
          <HFTextField control={control} name="amount" label="Amount" fullWidth={false} sx={{ mr: 2 }} />
          to
          <HFTextField control={control} name="account" label="Account" fullWidth={false} sx={{ ml: 2 }} />
        </Box>
        <Button variant="outlined" type="submit">
          Request
        </Button>
      </form>
    </>
  );
};
export default Faucet;
