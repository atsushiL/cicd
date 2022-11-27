import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { promotionMethodHeader } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { useEffect, useState } from 'react';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { InputForm } from '../../components/elements/Form/InputForm';
import { ApiType, PromotionMethodApiType } from '../../Types/ApiTypes';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { fetch_GET } from '../../constants/functions/fetch';
import { patchApi, postApi } from '../../constants/functions/getData';

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
  const [promotionMethod, setPromotionMethod] = useState<PromotionMethodApiType[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [offset, setOffset] = useState<number>(0);

  const dataHandler = (data: ApiType) => {
    const newData =
      isPromotionMethod(data.results) &&
      data.results.map((item: PromotionMethodApiType) => {
        return {
          id: item.id,
          method: item.method,
          created_at: dateTimeFormatter_noTime(item.created_at),
          created_by: item.created_by,
        };
      });
    newData && setPromotionMethod(newData);
  };

  const fetchData = () => {
    fetch_GET({
      url: `promotion_method/?offset=${offset}&limit=15`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      },
    });
  };

  function isPromotionMethod(item: ApiType['results']): item is PromotionMethodApiType[] {
    return (item as PromotionMethodApiType[]) !== undefined;
  }

  useEffect(() => {
    fetchData();
  }, [offset]);

  const onClose = () => {
    setOpenDialog(false);
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'promotion_method/';
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

  const onEdit = (id: string) => {
    setOpenDialog(true);
    setEdit(true);
    const list = promotionMethod.find((item) => item.id === id)
    setEditId(id);
    setValue('method', list?.method);
  };

  return (
    <div>
      <PageHeader title="販促方法一覧" addClick={() => onOpen()} />
      <table className="w-full h-auto">
        <TableHead tableData={promotionMethodHeader} />
        <TableBodyAPI tableData={promotionMethod} edit onClick={onEdit} />
      </table>
      <PaginationBar count={pageItem.count} next={pageItem.next} previous={pageItem.previous} setOffset={setOffset} limit={1} />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[45%]'}>
        <FormDialogHeader title={'販促方法' + (edit ? '編集' : '登録')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm
            label={'販促方法'}
            name={'method' as keyof FormValues}
            placeholder={'登録したい販促方法名を入力してください'}
            width={'w-80'}
            control={control}
            rules={{}}
          />
          <DialogFooter
            cancelText="キャンセル"
            cancelClick={onClose}
            confirmText={edit ? '保存' : '登録'}
            confirmClick={onClose}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default PromotionMethodTable;
