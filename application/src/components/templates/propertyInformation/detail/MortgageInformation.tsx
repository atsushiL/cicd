import { FormValues } from '../../../../Types/FormTypes';
import { TableBody } from '../../../elements/Table/TableBody';
import { TableHead } from '../../../elements/Table/TableHead';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import {
  tableBodyMortgageInfoA,
  tableHeadMortgageInfoA,
  tableBodyMortgageInfoB,
  tableHeadMortgageInfoB,
} from '../../../../constants/constants';
import { editTypes, MortgageInfoAValue, MortgageInfoBValue } from '../../../../Types/TableTypes';
import { InputForm } from '../../../elements/Form/InputForm';
import { useState } from 'react';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { Button } from '../../../elements/Button/MainButtons';

function isMortgageInfoA(item: editTypes): item is MortgageInfoAValue {
  return (item as MortgageInfoAValue).date !== undefined;
}

function isMortgageInfoB(item: editTypes): item is MortgageInfoBValue {
  return (item as MortgageInfoBValue).date !== undefined;
}

export const MortgageInformation = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const { control, handleSubmit, reset, setValue } = useForm<Partial<FormValues>>();
  const [kouOtsu, setKouOtsu] = useState<'kou'|'otsu'>('kou');

  const [mortgageInfoAId, setMortgageInfoAId] = useState<string>('0');
  const [mortgageInfoBId, setMortgageInfoBId] = useState<string>('0');

  const [edit, setEdit] = useState<boolean>(false);

  const onClose = () => {
    setOpenDialog(false);
    resetEdit();
  };

  const onKouDialogOpen = () => {
    setOpenDialog(true);
    return new Promise((resolve) => {
      resolve(setKouOtsu('kou'));
    });
  };

  const onOtsuDialogOpen = () => {
    setOpenDialog(true);
    return new Promise((resolve) => {
      resolve(setKouOtsu('otsu'));
    });
  };

  const onMortgageInfoAEdit = async (id: string, item: editTypes) => {
    setEdit(true);
    await onKouDialogOpen().then(() => {
      if (isMortgageInfoA(item)) {
        setMortgageInfoAId(id);
        setValue('debtorName', item.debtorName);
        setValue('reason', item.reason);
        setValue('purpose', item.purpose);
      }
    });
  };

  const onMortgageInfoBEdit = async (id: string, item: editTypes) => {
    setEdit(true);
    await onOtsuDialogOpen().then(() => {
      if (isMortgageInfoB(item)) {
        setMortgageInfoBId(id);
        setValue('debtorName', item.debtorName);
        setValue('debtNum', item.debtNum);
        setValue('creditorName', item.creditorName);
        setValue('purpose', item.purpose);
      }
    });
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    resetEdit();
    setOpenDialog(false);
  };

  const resetEdit = () => {
    reset();
    setMortgageInfoAId('0');
    setMortgageInfoBId('0');
    setEdit(false);
  };

  const inputHandler = () => {
    if (kouOtsu === 'kou') {
      return <InputForm label={'原因'} name={'reason'} control={control} rules={{}} width={'w-60'} />;
    } else {
      return (
        <>
          <InputForm label={'債務額'} name={'debtNum'} control={control} rules={{}} width={'w-60'} />
          <InputForm label={'債権者'} name={'creditorName'} control={control} rules={{}} width={'w-60'} />
        </>
      );
    }
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="font-semibold py-1">甲区</p>
        <Button type={'button'} text={'登録'} buttonStyles={'Thirdly'} customStyles="mx-2" onClick={onKouDialogOpen} />
      </div>
      <table className="mb-16">
        <TableHead tableData={tableHeadMortgageInfoA} />
        <TableBody tableData={tableBodyMortgageInfoA} edit onClick={onMortgageInfoAEdit} />
      </table>
      <div className="flex justify-between mb-3">
        <p className="font-semibold py-1">乙区</p>
        <Button type={'button'} text={'登録'} buttonStyles={'Thirdly'} customStyles="mx-2" onClick={onOtsuDialogOpen} />
      </div>
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadMortgageInfoB} />
        <TableBody tableData={tableBodyMortgageInfoB} edit onClick={onMortgageInfoBEdit} />
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'抵当権情報の' + (edit ? '編集' : '登録') + (kouOtsu === 'kou' ? '(甲)' : '(乙)') } onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm label={'債務者'} name={'debtorName'} control={control} rules={{}} width={'w-60'} />
          {inputHandler()}
          <InputForm label={'目的'} name={'purpose'} control={control} rules={{}} width={'w-60'} />
          <DialogFooter cancelText="キャンセル" cancelClick={onClose} confirmText={'保存'} />
        </form>
      </Dialog>
    </>
  );
};
