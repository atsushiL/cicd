import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { tableHeadForPropertyPurchase } from '../../constants/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../../Types/FormTypes';
import { InputForm } from '../../components/elements/Form/InputForm';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { ApiType, EvaluationStandardApiType } from '../../Types/ApiTypes';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { fetch_GET } from '../../constants/functions/fetch';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { postApi, patchApi } from '../../constants/functions/getData';

const PropertyPurchaseList = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [EvaluationStandards, setEvaluationStandards] = useState<EvaluationStandardApiType[]>([]);
  const [edit, setOpenEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('0');
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  function fetchData() {
    fetch_GET({
      url: `evaluation_standard/?offset=${offset}&limit=15`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        if (data.count === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          dataHandler(data);
        }
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const dataHandler = (data: ApiType) => {
    const newData =
      isEvaluationStandardValue(data.results) &&
      data.results.map((item: EvaluationStandardApiType) => {
        return {
          standard: item.standard,
          standard_content: item.standard_content,
          created_by: item.created_by,
          created_at: dateTimeFormatter_noTime(item.created_at),
          memo: item.memo,
          id: item.id,
        };
      });
    newData && setEvaluationStandards(newData);
  };

  const onClose = () => {
    setOpenDialog(false);
    setEditMode(false);
    reset();
  };

  const resetEdit = () => {
    setOpenEdit(false);
    reset();
    setEditId('0');
  };

  function isEvaluationStandardValue(item: ApiType['results']): item is EvaluationStandardApiType[] {
    return (item as EvaluationStandardApiType[]) !== undefined;
  }

  const onEdit = (id: string) => {
    setEditMode(true);
    setOpenDialog(true);
    setOpenEdit(true);
    const list = EvaluationStandards.find((item) => item.id === id)
    setEditId(id);
    setValue('standard', list?.standard);
    setValue('standard_content', list?.standard_content);
    setValue('memo', list?.memo !== null ? list?.memo : '');
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    formState: { dirtyFields },
  } = useForm<Partial<FormValues>>();

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'evaluation_standard/';
    if (edit) {
      patchApi(`${url}${editId}/`, dirtyFields, data, fetchData);
    } else {
      postApi(url, data, fetchData);
    }
    setOpenDialog(false)
    resetEdit();
  };
  console.log(EvaluationStandards);
  return (
    <>
      <PageHeader
        title={'買取基準一覧'}
        addClick={() => {
          setOpenDialog(true);
        }}
        registerOnly
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForPropertyPurchase} />
        {empty ? <EmptyTableBody /> : <TableBodyAPI tableData={EvaluationStandards} edit onClick={onEdit} />}
      </table>
      <PaginationBar count={pageItem.count} next={pageItem.next} previous={pageItem.previous} setOffset={setOffset} limit={15} />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'買取基準' + (editMode ? '編集' : '登録')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm label={'買取基準項目名'} name={'standard'} control={control} rules={{}} required />
          <InputForm label={'買取基準'} name={'standard_content'} control={control} rules={{}} labelStyles="mr-3" required />
          <InputForm label={'特記事項'} name={'memo'} control={control} rules={{}} labelStyles="mr-3" />
          <DialogFooter
            cancelText={'キャンセル'}
            cancelClick={onClose}
            confirmText={editMode ? '保存' : '登録'}
            confirmClick={() => {
              setEditMode(false);
            }}
          />
        </form>
      </Dialog>
    </>
  );
};
export default PropertyPurchaseList;
