import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { dummyTableHeadMortgageInfoA, dummyTableHeadMortgageInfoB } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { editTypes, MortgageInfoAValue, MortgageInfoBValue } from '../../../../Types/TableTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { TableBody } from '../../../elements/Table/TableBody';
import { TableHead } from '../../../elements/Table/TableHead';

type mortgageAValue = {
  id: string;
  info: MortgageInfoAValue;
}[];

type mortgageBValue = {
  id: string;
  info: MortgageInfoBValue;
}[];

export const RegisterMortgageLandInformation = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [kouOtsu, setKouOtsu] = useState<'kou' | 'otsu'>('kou');
  const { control, handleSubmit, reset, setValue } = useForm<Partial<FormValues>>();
  const [mortgageAItem, setMortgageAItem] = useState<mortgageAValue>([]);
  const [mortgageBItem, setMortgageBItem] = useState<mortgageBValue>([]);
  const [mortgageAInfoId, setMortgageAInfoId] = useState<string>('0');
  const [mortgageBInfoId, setMortgageBInfoId] = useState<string>('0');
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

  function isMortgageInfoA(item: editTypes | Partial<FormValues>): item is MortgageInfoAValue {
    return (item as MortgageInfoAValue) !== undefined;
  }

  const onMortgageAInfoEdit = async (id: string, item: editTypes) => {
    setEdit(true);
    await onKouDialogOpen().then(() => {
      if (isMortgageInfoA(item)) {
        setMortgageAInfoId(id);
        setValue('debtorName', item.debtorName);
        setValue('reason', item.reason);
        setValue('purpose', item.purpose);
      }
    });
  };

  function isMortgageInfoB(item: editTypes | Partial<FormValues>): item is MortgageInfoBValue {
    return (item as MortgageInfoBValue) !== undefined;
  }

  const onMortgageBInfoEdit = async (id: string, item: editTypes) => {
    setEdit(true);
    await onOtsuDialogOpen().then(() => {
      if (isMortgageInfoB(item)) {
        setMortgageBInfoId(id);
        setValue('debtorName', item.debtorName);
        setValue('debtNum', item.debtNum);
        setValue('creditorName', item.creditorName);
        setValue('purpose', item.purpose);
      }
    });
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    const registerDate = new Date();
    const year = registerDate.getFullYear().toString();
    const month = (registerDate.getMonth() + 1).toString();
    const day = registerDate.getDay().toString();
    const toDay = year + '-' + month + '-' + day;
    if (kouOtsu === 'kou') {
      if (isMortgageInfoA(data)) {
        setMortgageAItem((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            info: {
              date: toDay,
              debtorName: data.debtorName,
              reason: data.reason,
              purpose: data.purpose,
            },
          },
        ]);
      }
    } else if (kouOtsu === 'otsu') {
      if (isMortgageInfoB(data)) {
        setMortgageBItem((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            info: {
              date: toDay,
              debtorName: data.debtorName,
              debtNum: data.debtNum,
              creditorName: data.creditorName,
              purpose: data.purpose,
            },
          },
        ]);
      }
    }
    resetEdit();
    setOpenDialog(false);
  };

  const resetEdit = () => {
    reset();
    setMortgageAInfoId('0');
    setMortgageBInfoId('0');
    setEdit(false);
  };

  const inputHandler = () => {
    if (kouOtsu === 'kou') {
      return <InputForm label={'??????'} name={'reason'} control={control} rules={{}} width={'w-60'} />;
    } else {
      return (
        <>
          <InputForm label={'?????????'} name={'debtNum'} control={control} rules={{}} width={'w-60'} />
          <InputForm label={'?????????'} name={'creditorName'} control={control} rules={{}} width={'w-60'} />
        </>
      );
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold py-1">??????</p>
        <Button
          type={'button'}
          text={'????????????'}
          buttonStyles={'Thirdly'}
          customStyles="ml-auto block py-1"
          onClick={onKouDialogOpen}
        />
      </div>
      <table>
        <TableHead tableData={dummyTableHeadMortgageInfoA} />
        <TableBody tableData={mortgageAItem} edit onClick={onMortgageAInfoEdit} />
      </table>
      <div className="mb-16"></div>
      <div className="flex justify-between">
        <p className="font-semibold py-1">??????</p>
        <Button
          type={'button'}
          text={'????????????'}
          buttonStyles={'Thirdly'}
          customStyles=" ml-auto block py-1"
          onClick={onOtsuDialogOpen}
        />
      </div>
      <table>
        <TableHead tableData={dummyTableHeadMortgageInfoB} />
        <TableBody tableData={mortgageBItem} edit onClick={onMortgageBInfoEdit} />
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[35%]'}>
        <FormDialogHeader
          title={'???????????????' + (edit ? '??????' : '??????') + (kouOtsu === 'kou' ? '(???)' : '(???)')}
          onClose={onClose}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 ">
          <InputForm label={'?????????'} name={'debtorName'} control={control} rules={{}} width={'w-60'} />
          {inputHandler()}
          <InputForm label={'??????'} name={'purpose'} control={control} rules={{}} width={'w-60'} />
          <DialogFooter cancelText="???????????????" cancelClick={onClose} confirmText={edit ? '??????' : '??????'} />
        </form>
      </Dialog>
    </>
  );
};
