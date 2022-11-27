import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { tableHeadForInterview } from '../../../../constants/constants';
import { fetch_GET, fetch_PATCH, fetch_POST } from '../../../../constants/functions/fetch';
import { ApiType, ApplyCustomerInterviewValue, InterviewItemApiType } from '../../../../Types/ApiTypes';
import { FormValues } from '../../../../Types/FormTypes';
import { SelectListValue } from '../../../../Types/TableTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { Select } from '../../../elements/Form/Select';
import { TextArea } from '../../../elements/Form/TextArea';
import { TableBodyAPI } from '../../../elements/Table/TableBodyAPI';
import { TableHead } from '../../../elements/Table/TableHead';

export const InterviewTable = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [interviewItem, setInterviewItem] = useState<ApplyCustomerInterviewValue[]>([]);
  const [selectList, setSelectList] = useState<SelectListValue>([]);
  const [reload, setReload] = useState<boolean>(false);
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { dirtyFields },
  } = useForm<Partial<FormValues>>();

  const router = useRouter();
  const customerId = router.query.id;
  const provisionalId = router.query.provisional_id;

  function isInterviewList(item: ApiType['results']): item is ApplyCustomerInterviewValue[] {
    return (item as ApplyCustomerInterviewValue[]) !== undefined;
  }

  function isInterviewItemList(item: ApiType['results']): item is InterviewItemApiType[] {
    return (item as InterviewItemApiType[]) !== undefined;
  }

  useEffect(() => {
    fetch_GET({
      url: `interview_item/`,
      resFunction: (data: ApiType) => {
        const newData =
          isInterviewItemList(data.results) &&
          data.results.map((item) => {
            return {
              title: item.item,
              value: item.id,
            };
          });
        newData && setSelectList(newData);
      },
    });

    fetch_GET({
      url: `customers/${customerId}/provisional_customers/${provisionalId}/interview/`,
      resFunction: (data: ApiType) => {
        const newData =
          isInterviewList(data.results) &&
          data.results.map((item) => {
            return {
              id: item.id,
              interview_item: item.interview_item,
              interview_item_name: item.interview_item_name,
              interview_content: item.interview_content,
            };
          });
        newData && setInterviewItem(newData);
      },
    });
  }, [reload]);

  const onClose = () => {
    setOpenDialog(false);
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

  const onEdit = (id: string) => {
    setOpenDialog(true);
    setEdit(true);
    const editItem = interviewItem.find((item) => item.id === id);
    if (editItem) {
      setEditId(editItem.id);
      setValue('interview_item', editItem.interview_item);
      setValue('interview_content', editItem.interview_content);
    }
  };
  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    if (edit) {
      fetch_PATCH({
        dirty: dirtyFields,
        url: `customers/${customerId}/provisional_customers/${provisionalId}/interview/${editId}/`,
        body: JSON.stringify(data),
        resFunction: (res: Response) => {
          if (res.ok) {
            setReload(!reload);
          }
        },
      });
    } else {
      fetch_POST({
        url: `customers/${customerId}/provisional_customers/${provisionalId}/interview/`,
        body: JSON.stringify(data),
        resFunction: (res: Response) => {
          if (res.ok) {
            setReload(!reload);
          }
        },
      });
    }
    resetEdit();
    setOpenDialog(false)
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
      <table>
        <TableHead tableData={tableHeadForInterview} />
        <TableBodyAPI tableData={interviewItem} edit onClick={onEdit} />
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[35%]'}>
        <FormDialogHeader title={'ヒアリング項目' + (edit ? '編集' : '登録')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 ">
          <Select
            register={register}
            name={'interview_item'}
            label={'ヒアリング項目'}
            selectList={selectList}
            required
          />
          <TextArea
            register={register}
            name={'interview_content'}
            label="回答内容"
            labelStyles="w-[123px]"
            width="w-[270px]"
            required
          />
          <DialogFooter
            cancelText="キャンセル"
            cancelClick={onClose}
            confirmText={edit ? '保存' : '登録'}
          />
        </form>
      </Dialog>
    </>
  );
};
