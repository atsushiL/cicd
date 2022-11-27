import { Control, FieldValues, RegisterOptions, UseFormGetValues } from 'react-hook-form';
import { FormValues } from '../../../Types/FormTypes';
import { InputForm } from './InputForm';

type Props = {
  label: string;
  dateFrom: keyof FormValues;
  dateTo: keyof FormValues;
  control: Control<Partial<FormValues>>;
  getValues: UseFormGetValues<Partial<FormValues>>;
  error?: boolean;
  helperText?: string;
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export const DateRangePicker: React.FC<Props> = ({
  label,
  dateFrom,
  dateTo,
  control,
  getValues,
  error,
  helperText,
}) => {
  return (
    <div className="flex items-center">
      <InputForm label={label} type={'date'} name={dateFrom} control={control} />
      <span className="inline-block ml-3">〜</span>
      <InputForm
        type={'date'}
        name={dateTo}
        control={control}
        rules={{
          validate: (val) => {
            //終了日の値はスタート日より前は不可、同じなら大丈夫
            if (getValues(dateFrom)) {
              return Date.parse(val) >= Date.parse(getValues(dateFrom) as string);
            }
          },
        }}
        editMode
        error={error}
        helperText={helperText}
      />
    </div>
  );
};
