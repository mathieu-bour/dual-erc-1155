import { useController } from 'react-hook-form';
import { FC } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import { HFProps } from '../../lib/utils/types';

interface HFSelectProps extends HFProps<SelectProps> {}

const HFSelect: FC<HFSelectProps> = ({ control, ...props }) => {
  const { field, fieldState } = useController({
    name: props.name,
    rules: { required: props.required },
    defaultValue: props.defaultValue,
    control,
  });

  return <Select {...props} {...field} />;
};

export default HFSelect;
