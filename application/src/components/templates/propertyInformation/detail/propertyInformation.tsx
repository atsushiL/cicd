import { ResetTv } from '@mui/icons-material';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { petInformation, propertyInformation } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputFile } from '../../../elements/Form/InputFile';
import { InputForm } from '../../../elements/Form/InputForm';
import { DetailTable } from '../../../elements/Table/DetailTable';

type Props = {
  onSubmit?: () => void;
  searchSubmit?: () => void;
  control: Control<Partial<FormValues>>;
  detail?: boolean;
  edit?: boolean;
};

export const PropertyInformation: React.FC<Props> = (props) => {
  const { onSubmit, control } = props;
  const [isEdit, setEdit] = useState<boolean>(false);
  const handleClick = () => {
    setEdit(!isEdit);
  };
  return !isEdit ? (
    <>
      <Button type="button" text="編集" buttonStyles="Thirdly" onClick={handleClick} customStyles="text-right" />
      <DetailTable dummyData={propertyInformation} onClick={() => {}} picture pet />
      <table>
        <tbody>
          {petInformation.map((value, index) => (
            <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
              <th className="border border-slate-300 w-[165px] text-[18px] p-3">{value.title}</th>
              <td className="border border-slate-300 pl-5 w-[658px]">{value.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <form onSubmit={onSubmit} className="grid justify-center">
      <Button type="button" text="戻る" buttonStyles="Thirdly" onClick={handleClick} customStyles="text-right" />
      <table>
        <tbody>
          {propertyInformation.map((value, index) => (
            <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
              <th className="border border-slate-300 w-[480px] text-[18px] pl-3 pr-3">{value.title}</th>
              <td className="flex">
                <InputForm
                  name={value.name as keyof FormValues}
                  control={control}
                  width="w-80 ml-5"
                  editMode
                  defaultValue={value.value}
                  customStyles="m-10"
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
          <tr>
            <th className="p-4 underline">ペット情報</th>
          </tr>
          {petInformation.map((value, index) => (
            <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
              <th className="border border-slate-300 w-[480px] text-[18px] pl-3 pr-3">{value.title}</th>
              <td className="flex">
                <InputForm
                  name={value.name as keyof FormValues}
                  control={control}
                  width="w-80"
                  editMode
                  defaultValue={value.text}
                  customStyles="m-10"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type={'submit'} text="保存" buttonStyles="Primary" customStyles="mx-auto mt-5" />
    </form>
  );
};

export const PropertyRegisterInformation: React.FC<Props> = (props) => {
  const { onSubmit, control, searchSubmit } = props;
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const onClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Button
        type={'button'}
        text={'検索'}
        buttonStyles={'Primary'}
        customStyles="block ml-auto mb-5"
        onClick={() => setOpenDialog(!openDialog)}
      />
      <Dialog isOpen={openDialog} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'条件検索'} onClose={onClose} />
        <form onSubmit={searchSubmit} className="grid justify-center">
          <InputForm
            label="お客様氏名"
            name={'applyName'}
            control={control}
            customStyles={'ml-[10px]'}
            inputStyle={'ml-6'}
          />
          <Button type={'submit'} text={'検索'} buttonStyles={'Primary'} customStyles={'block mx-auto mt-10'} />
        </form>
      </Dialog>

      <form onSubmit={onSubmit} className="grid justify-center">
        <table>
          <tbody>
            {propertyInformation.map((value, index) => (
              <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
                <th className="border border-slate-300 w-[480px] text-[18px] pl-1 pr-1">{value.title}</th>
                <td className="flex">
                  <InputForm
                    name={value.name as keyof FormValues}
                    control={control}
                    width="w-80 ml-5"
                    editMode
                    customStyles="m-10"
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
            <tr>
              <th className="p-4 underline">ペット情報</th>
            </tr>
            {petInformation.map((value, index) => (
              <tr className="odd:bg-[#EEEEEE] border border-slate-300" key={index}>
                <th className="border border-slate-300 w-[480px] text-[18px] pl-3 pr-3">{value.title}</th>
                <td className="flex">
                  <InputForm
                    name={value.name as keyof FormValues}
                    control={control}
                    width="w-80 ml-5"
                    editMode
                    customStyles="m-10"
                    inputStyle="w-[280px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button type={'submit'} text="保存" buttonStyles="Primary" customStyles="mt-5 block mx-auto" />
      </form>
    </>
  );
};
