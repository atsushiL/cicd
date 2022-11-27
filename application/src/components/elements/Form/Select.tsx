import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../../Types/FormTypes';
import { SelectListValue } from '../../../Types/TableTypes';

type Props = {
  name: keyof FormValues;
  label: string;
  labelStyles?: string;
  customStyles?: string;
  width?: string;
  defaultValue?: string | number;
  selectList: SelectListValue;
  register: UseFormRegister<Partial<FormValues>>;
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  required?: boolean;
};

export const Select: React.FC<Props> = ({
  name,
  label,
  customStyles,
  selectList,
  register,
  rules,
  labelStyles,
  width,
  defaultValue,
  required,
}) => {
  return (
    <div className={`flex my-4 gap-3 ${customStyles}`}>
      <label htmlFor={name} className={`min-w-[100px] text-[16px] ${labelStyles}`}>
        {label}
      </label>
      <select
        {...register(name, rules)}
        className={'p-1 border border-slate-300 rounded-sm ' + (width ? width : 'w-44')}
        defaultValue={defaultValue}
        required={required}
      >
        <option value="" hidden>
          選択してください
        </option>
        {selectList.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
