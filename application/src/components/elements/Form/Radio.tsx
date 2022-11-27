import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RadioType, FormValues } from '../../../Types/FormTypes';

type Props = {
  name: keyof FormValues;
  control: Control<Partial<FormValues>>;
  data: RadioType;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?:boolean
};

export const RadioInput: React.FC<Props> = ({ name, control, data, defaultValue, onChange,required }) => {
  return (
    <Controller
      render={({ field }) => (
          <RadioGroup row {...field}>
            {data.map((item) => {
              return (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio onChange={onChange} required={required}/>}
                  label={item.title}
                />
              );
            })}
          </RadioGroup>
      )}
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : ''}
    />
  );
};
