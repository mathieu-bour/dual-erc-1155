import { useController } from 'react-hook-form';
import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { HFProps } from '../../lib/utils/types';

interface HFTextFieldProps extends HFProps<TextFieldProps> {}

function shouldShrink(v: unknown) {
  return !(v === null || v === undefined || (typeof v === 'string' && v.length === 0));
}

const HFTextField: FC<HFTextFieldProps> = ({ control, ...props }) => {
  const { field } = useController({
    name: props.name,
    control,
  });

  return <TextField {...props} {...field} InputLabelProps={{ shrink: shouldShrink(field.value) }} />;
};

export default HFTextField;
