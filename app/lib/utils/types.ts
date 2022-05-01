import { Control } from 'react-hook-form';

export type HFProps<T extends { name?: string; value?: unknown }> = Omit<T, 'name' | 'value'> &
  Required<Pick<T, 'name'>> & {
    control: Control<any>;
  };
