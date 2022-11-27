import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { FormValues, RadioType } from '../../../Types/FormTypes';
import { RadioInput } from './Radio';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

type Props = {
  data: RadioType;
  control: Control<Partial<FormValues>>;
  defaultValue?: string;
  name: keyof FormValues;
  title: string;
  customStyles?: string;
  labelWidth?: string;
  required?:boolean;
};

export const RadioLabel: React.FC<Props> = ({ data, control, defaultValue, name, title, customStyles, labelWidth,required }) => {
  const [showMail, setShowMail] = useState<boolean>(false);
  return (
    <div className={customStyles}>
      <h3 className={'text-[16px] ' + (labelWidth ? labelWidth : '')}>{title}</h3>
      <RadioInput
        data={data}
        control={control}
        name={name}
        defaultValue={defaultValue}
        onChange={(event) => {
          if (event.target.name === 'applyResult' && event.target.value === 'disapprove') {
            setShowMail(true);
          } else {
            setShowMail(false);
          }
        }}
        required={required}
      />
      {showMail && (
        <IconButton aria-label="mail" color="primary">
          <ForwardToInboxOutlinedIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};
