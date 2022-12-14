import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { promotionDetailHeader } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { useEffect, useState } from 'react';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { InputForm } from '../../components/elements/Form/InputForm';
import { ApiType, PromotionDetailApiType } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { fetch_GET } from '../../constants/functions/fetch';
import { postApi, patchApi } from '../../constants/functions/getData';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';

const PromotionMethodTable = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields },
  } = useForm<Partial<FormValues>>();
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [PromotionDetail, setPromotionDetail] = useState<PromotionDetailApiType[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [offset, setOffset] = useState<number>(0);

  function fetchData() {
    fetch_GET({
      url: `promotion_result/?offset=${offset}&limit=15`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      },
    });

  }

  useEffect(() => {
    fetchData();
  }, [offset]);

  const onClose = () => {
    setOpenDialog(false);
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'promotion_result/';
    if (edit) {
      patchApi(`${url}${editId}/`, dirtyFields, data, fetchData);
    } else {
      postApi(url, data, fetchData);
    }
    resetEdit();
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

  function isPromotionDetail(item: ApiType['results']): item is PromotionDetailApiType[] {
    return (item as PromotionDetailApiType[]) !== undefined;
  }

  const onEdit = (id: string) => {
    const list = PromotionDetail.find((item) => item.id === id)
    setOpenDialog(true);
    setEdit(true);
    setEditId(id);
    setValue('result', list?.result);
  };

  const dataHandler = (data: ApiType) => {
    const newData =
      isPromotionDetail(data.results) &&
      data.results.map((item: PromotionDetailApiType) => {
        return {
          id: item.id,
          result: item.result,
          created_at: dateTimeFormatter_noTime(item.created_at),
          created_by: item.created_by,
        };
      });
    newData && setPromotionDetail(newData);
  };

  return (
    <div>
      <PageHeader title="??????????????????" addClick={onOpen} />
      <table className="w-full h-auto">
        <TableHead tableData={promotionDetailHeader} />
        <TableBodyAPI tableData={PromotionDetail} edit onClick={onEdit} />
      </table>
      <PaginationBar count={pageItem.count} next={pageItem.next} previous={pageItem.previous} setOffset={setOffset} limit={1} />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[45%]'}>
        <FormDialogHeader title={'????????????' + (edit ? '??????' : '??????')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm
            label={'????????????'}
            name={'result' as keyof FormValues}
            placeholder={'?????????????????????????????????????????????????????????'}
            width={'w-80'}
            control={control}
            rules={{}}
          />
          <DialogFooter
            cancelText="???????????????"
            cancelClick={onClose}
            confirmText={edit ? '??????' : '??????'}
            confirmClick={onClose}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default PromotionMethodTable;
