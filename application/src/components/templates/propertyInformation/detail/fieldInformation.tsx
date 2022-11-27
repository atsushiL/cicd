import { useState } from 'react';
import { Control } from 'react-hook-form';
import { fieldInformation } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { InputFile } from '../../../elements/Form/InputFile';
import { InputForm } from '../../../elements/Form/InputForm';
import { DetailTable } from '../../../elements/Table/DetailTable';

type Props = {
  onSubmit?: () => void;
  control: Control<Partial<FormValues>>;
  onClick?: () => void;
};
export const FieldInformation: React.FC<Props> = (props) => {
  const { onSubmit, control } = props;
  const [isEdit, setEdit] = useState<boolean>(false);
  const handleText = () => {
    setEdit(!isEdit);
  };
  return !isEdit ? (
    <>
      <div className="text-right">
        <Button type="button" text="編集" buttonStyles="Thirdly" onClick={handleText} />
      </div>
      <DetailTable dummyData={fieldInformation} onClick={() => {}} picture />
    </>
  ) : (
    <form onSubmit={onSubmit}>
      <Button type={'button'} text="戻る" buttonStyles="Thirdly" customStyles="block ml-auto" onClick={handleText} />
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
                  defaultValue={value.value}
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
      <Button type={'submit'} text="保存" buttonStyles="Primary" customStyles="mt-5 mx-auto block " />
    </form>
  );
};
