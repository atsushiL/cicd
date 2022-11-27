import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { agreeType, householdType, tableHeadFamilyDetail } from '../../../../constants/constants';
import { fetch_GET, fetch_PATCH, fetch_POST } from '../../../../constants/functions/fetch';
import { numberRegEx } from '../../../../constants/validationReg';
import { ApiType, ApplyCustomerFamilyValue } from '../../../../Types/ApiTypes';
import { FormValues } from '../../../../Types/FormTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { RadioLabel } from '../../../elements/Form/RadioLabel';
import { TableBodyAPI } from '../../../elements/Table/TableBodyAPI';
import { TableHead } from '../../../elements/Table/TableHead';

type Props = {
  provisionalId: string;
};

export const FamilyDetail: React.FC<Props> = ({ provisionalId }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [data, setData] = useState<ApplyCustomerFamilyValue[]>([]);
  const [reload,setReload] = useState<boolean>(false)
  const customerId = router.query.id;
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { dirtyFields,errors, },
  } = useForm<Partial<FormValues>>();
  const onClose = () => {
    setOpenDialog(false);
    setEdit(false);
    clearErrors('age')
  };

  const onOpen = () => {
    resetEdit();
    setOpenDialog(true);
  };

  const resetEdit = () => {
    reset();
    setEditId('');
    setEdit(false);
  };
  function isFamilyList(item: ApiType['results']): item is ApplyCustomerFamilyValue[] {
    return (item as ApplyCustomerFamilyValue[]) !== undefined;
  }

  const onEdit = (id: string) => {
    setOpenDialog(true);
    setEdit(true);
    setEditId(id);
    const editItem = data.find((item) => item.id === id);
    if (editItem) {
      setValue('name', editItem.name);
      setValue('relationship', editItem.relationship);
      setValue('age', editItem.age.toString());
      setValue('job', editItem.job);
      setValue('household_management', editItem.household_management === '同一' ? 'same' : 'different');
      setValue('consensus', editItem.consensus === '有' ? 'yes' : 'no');
    }
  };

  useEffect(() => {
    fetch_GET({
      url: `customers/${customerId}/provisional_customers/${provisionalId}/family/`,
      resFunction: (data: ApiType) => {
        const newData =
          isFamilyList(data.results) &&
          data.results.map((item: ApplyCustomerFamilyValue) => {
            // console.log(item);
            return {
              id: item.id,
              name: item.name,
              relationship: item.relationship,
              age: item.age,
              job: item.job,
              household_management: item.household_management ? '同一' : '不同',
              consensus: item.consensus ? '有' : '無',
            };
          });
        newData && setData(newData);
      },
    });
  }, [reload]);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const postData = {
      ...data,
      household_management: data.household_management === 'same' ? true : false,
      consensus: data.consensus === 'yes' ? true : false,
    };
    if (edit) {
      fetch_PATCH({
        dirty: dirtyFields,
        url: `customers/${customerId}/provisional_customers/${provisionalId}/family/${editId}/`,
        body: JSON.stringify(postData),
        resFunction:(res:Response)=>{
          if(res.ok){
            setReload(!reload)
            setOpenDialog(false);
          }
        }
      });
      setOpenDialog(false);
    } else {
      fetch_POST({
        url: `customers/${customerId}/provisional_customers/${provisionalId}/family/`,
        body: JSON.stringify(postData),
        resFunction:(res:Response)=>{
          if(res.ok){
            setReload(!reload)
            setOpenDialog(false);
          }
        }
      });
    }
    reset();
    resetEdit();
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
        <TableHead tableData={tableHeadFamilyDetail} />
        <TableBodyAPI tableData={data} edit onClick={onEdit} />
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'家族情報' + (edit ? '編集' : '登録')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 ">
          <InputForm control={control} name="name" label="同居家族名" required />
          <InputForm control={control} name="relationship" label="続柄" required />
          <InputForm control={control} name="age" label="年齢" rules={{pattern:numberRegEx}} error={errors.age && true} helperText={errors.age && '数字を入力してください'} required />
          <InputForm control={control} name="job" label="職業" required />
          <RadioLabel
            control={control}
            name="household_management"
            data={householdType}
            title="家計管理"
            customStyles="flex items-center my-3"
            labelWidth="w-[110px]"
            required
          />
          <RadioLabel
            control={control}
            name="consensus"
            data={agreeType}
            title="利用同意有無"
            customStyles="flex items-center my-3"
            labelWidth="w-[110px]"
            required
          />
          <DialogFooter cancelText="キャンセル" cancelClick={onClose} confirmText={edit ? '保存' : '登録'} />
        </form>
      </Dialog>
    </>
  );
};
