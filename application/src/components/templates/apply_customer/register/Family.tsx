import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { agreeType, householdType, tableHeadFamilyDetail } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { editTypes, familyValue } from '../../../../Types/TableTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { RadioLabel } from '../../../elements/Form/RadioLabel';
import { TableBody } from '../../../elements/Table/TableBody';
import { TableHead } from '../../../elements/Table/TableHead';

type Props = {
  setTabValue: Dispatch<SetStateAction<number>>;
};

export const FamilyRegister: React.FC<Props> = ({ setTabValue }) => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const { control, handleSubmit, reset } = useForm<Partial<FormValues>>();
  const onClose = () => {
    setOpenDialog(false);
  };

  const onOpen = () => {
    setOpenDialog(true);
  };

  function isFamilyList(item: editTypes | Partial<FormValues>): item is familyValue {
    return (item as familyValue) !== undefined;
  }

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    // if (isFamilyList(data)) {
    //   dummyFamilyList.push({
    //     id: Math.random().toString(),
    //     info: {
    //       ...data,
    //       household: data.household === 'same' ? '同一' : '不同',
    //       agree: data.agree === 'yes' ? '有' : '無',
    //     },
    //   });
    // }
    reset();
  };
  return (
    <>
      <Button
        type={'button'}
        text={'追加する'}
        buttonStyles={'Thirdly'}
        customStyles="mb-3 w-[10%] ml-auto block"
        onClick={onOpen}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadFamilyDetail.filter((item) => item !== '編集')} />
        {/* 最初は何も無いので、表示しません。もしバックエンドと接続できたら修正する */}
        {/* {dummyFamilyList.length > 3 && <TableBody tableData={dummyFamilyList} />} */}
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'家族情報登録'} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 ">
          <InputForm control={control} name="name" label="同居家族名" />
          <InputForm control={control} name="relationship" label="続柄" />
          <InputForm control={control} name="age" label="年齢" />
          <InputForm control={control} name="job" label="職業" />
          <RadioLabel
            control={control}
            name="household_management"
            data={householdType}
            title="家計管理"
            customStyles="flex items-center my-3"
            labelWidth="w-[110px]"
          />
          <RadioLabel
            control={control}
            name="consensus"
            data={agreeType}
            title="利用同意有無"
            customStyles="flex items-center my-3"
            labelWidth="w-[110px]"
          />
          <DialogFooter cancelText="キャンセル" cancelClick={onClose} confirmText={'登録'} confirmClick={onClose} />
        </form>
      </Dialog>
      {/* submitではないので、buttonを作りました */}
      <Button
        type={'button'}
        text={'次へ'}
        buttonStyles={'Primary'}
        customStyles="block my-4 mx-auto"
        onClick={() => {
          setTabValue((currVal) => currVal + 1);
        }}
      />
    </>
  );
};
