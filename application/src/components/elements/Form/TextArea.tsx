import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../../Types/FormTypes';

type Props = {
  placeholder?: string;
  name: keyof FormValues;
  customStyles?: string;
  rows?: number;
  text?: string;
  register: UseFormRegister<Partial<FormValues>>;
  required?: boolean;
  label?: string;
  labelStyles?: string;
  defaultValue?: string;
  width?: string;
};

export const TextArea: React.FC<Props> = ({
  name,
  customStyles,
  placeholder,
  rows,
  register,
  required,
  label,
  labelStyles,
  defaultValue,
  width,
}) => {
  return (
    //Controllerでrenderingするとエラーが出るので、registerに変更しました。
    <div className={`flex my-3 ${customStyles}`}>
      {label && (
        <label htmlFor={name} className={labelStyles}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className={`p-2 border border-slate-300 rounded-sm ${width}`}
        placeholder={placeholder}
        autoComplete="off"
        rows={rows ? rows : 3}
        defaultValue={defaultValue ? defaultValue : ""}
        required={required}
        {...register(name)}
      />
    </div>
  );
};
