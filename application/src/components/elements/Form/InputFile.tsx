import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../../Types/FormTypes';

type Props = {
  name: keyof FormValues;
  control: Control<Partial<FormValues>>;
  accept: string;
};

export const InputFile: React.FC<Props> = ({ control, name, accept }) => {
  const { field } = useController({ control, name });
  const [value, setValue] = useState<string>('');
  return (
    <input
      className="m-5 pl-8"
      name={field.name}
      accept={accept}
      type="file"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        field.onChange(e.target.files);
        console.log(e.target.value);
      }}
    // ToDo:アップロード対象を決めてから拡張子の制限を行う
    // accept=".pdf"
    />
  );
};
