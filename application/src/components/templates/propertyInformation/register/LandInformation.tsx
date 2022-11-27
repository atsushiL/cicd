import { Control } from 'react-hook-form';
import { fieldInformation } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { InputFile } from '../../../elements/Form/InputFile';
import { InputForm } from '../../../elements/Form/InputForm';

type Props = {
  onSubmit: () => void;
  control: Control<Partial<FormValues>>;
};

export const LandInformation: React.FC<Props> = ({ onSubmit, control }) => {
  return (
    <form onSubmit={onSubmit}>
      <table className="w-full">
        <tbody>
          {fieldInformation.map((value, index) => (
            <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
              <th className="border border-slate-300 w-[20%] text-[18px] p-0">{value.title}</th>
              <td>
                <InputForm
                  name={value.name as keyof FormValues}
                  control={control}
                  width="w-80 ml-5"
                  customStyles="m-10"
                  editMode
                />
              </td>
            </tr>
          ))}
          <tr className="odd:bg-[#EEEEEE] border border-slate-300">
            <th className="border border-slate-300 w-[20%] text-[18px] p-0">登記簿謄本画像</th>
            <td className="ml-10 my-4 gap-3">
              <InputFile name="image" control={control} accept="image/*" />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type={'submit'} text="保存" buttonStyles="Primary" customStyles="mt-5 block mx-auto" />
    </form>
  );
};
