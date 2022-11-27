import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { HTMLInputTypeAttribute, useState } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { FormValues } from '../../../Types/FormTypes';

type Props = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  name: keyof FormValues ;
  customStyles?: string;
  labelStyles?: string;
  control: Control<Partial<FormValues>>;
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  width?: string;
  defaultValue?: string | number;
  editMode?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  inputStyle?: string;
};

interface State {
  password: string;
  showPassword: boolean;
}

export const InputForm: React.FC<Props> = ({
  label,
  name,
  control,
  customStyles,
  labelStyles,
  rules,
  type,
  placeholder,
  width,
  defaultValue,
  editMode,
  error,
  helperText,
  required,
  inputStyle,
}) => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={`flex my-4 gap-3 items-center ${customStyles ? customStyles : ''}`}>
      <label htmlFor={name} className={`${editMode ? '' : 'min-w-[100px] text-[16px]'} ${labelStyles}`}>
        {label}
      </label>
      {type !== 'password' ? (
        <Controller
          render={({ field }) => (
            <TextField
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              error={error}
              helperText={helperText}
              required={required}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '5px',
                  width: width ? width : '12rem',
                },
              }}
              {...field}
              className={inputStyle}
            />
          )}
          rules={rules}
          name={name}
          control={control}
          defaultValue={defaultValue ? defaultValue : ''}
        />
      ) : (
        //passwordを確認できるようにiconを設定しました。
        <Controller
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: '205px' }} {...field}>
              <TextField
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                autoComplete="off"
                required={required}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px',
                    width: width ? width : '12rem',
                  },
                }}
                error={error}
                helperText={helperText}
              />
            </FormControl>
          )}
          rules={rules}
          name={name}
          control={control}
          defaultValue={defaultValue ? defaultValue : ''}
        />
      )}
    </div>
  );
};
