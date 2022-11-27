import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { TextArea } from '../../components/elements/Form/TextArea';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { tableHeadForCompanyReview } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { useEffect, useState } from 'react';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { patchApi, postApi } from '../../constants/functions/getData';
import { DateRangePicker } from '../../components/elements/Form/DateRangePicker';
import { telRegex } from '../../constants/validationReg';
import { ApiType, ReviewCompanyApiType } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { fetch_GET } from '../../constants/functions/fetch';

const ReviewCompanyList = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm<Partial<FormValues>>();
  const [reviewCompanies, setReviewCompanies] = useState<ReviewCompanyApiType[]>([]);
  const [search, setOpenSearch] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  function fetchData() {
    fetch_GET({
      url: `evaluate_company/?offset=${offset}&limit=15`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        console.log(data);
        if (data.count === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          dataHandler(data);
        }
        console.log(empty);
        console.log(pageItem.count);
      },
    });
  }

  const dataHandler = (data: ApiType) => {
    const newData =
      isReviewCompanies(data.results) &&
      data.results.map((item: ReviewCompanyApiType) => {
        return {
          id: item.id,
          created_at: dateTimeFormatter_noTime(item.created_at),
          name: item.name,
          person_in_charge: item.person_in_charge,
          phone_no: item.phone_no,
          memo: item.memo,
        };
      });
    newData && setReviewCompanies(newData);
  };

  const onClose = () => {
    setOpenDialog(false);
    setOpenSearch(false);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const resetEdit = () => {
    reset();
    setEditId('');
    setEdit(false);
  };

  function isReviewCompanies(item: ApiType['results']): item is ReviewCompanyApiType[] {
    return (item as ReviewCompanyApiType[]) !== undefined;
  }

  const onEdit = (id: string) => {
    const list = reviewCompanies.find((item) => item.id === id);
    setOpenDialog(true);
    setEdit(true);
    setEditId(id);
    setValue('name', list?.name);
    setValue('phone_no', list?.phone_no);
    setValue('person_in_charge', list?.person_in_charge);
    setValue('memo', list?.memo);
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'evaluate_company/';
    if (edit) {
      patchApi(`${url}${editId}/`, dirtyFields, data, fetchData);
    } else {
      postApi(url, data, fetchData);
    }
    setOpenDialog(false);
    resetEdit();
  };

  return (
    <div>
      <PageHeader
        title={'評価会社一覧'}
        searchClick={() => {
          resetEdit();
          setOpenDialog(true);
          setOpenSearch(true);
        }}
        addClick={() => {
          resetEdit();
          setOpenDialog(true);
          setOpenSearch(false);
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForCompanyReview} />
        {empty ? <EmptyTableBody /> : <TableBodyAPI tableData={reviewCompanies} edit onClick={onEdit} />}
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={15}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        {search ? (
          <>
            <FormDialogHeader title={'条件検索'} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <InputForm label={'会社名'} name={'company'} control={control} />
              <InputForm label={'担当者氏名'} name={'person_in_charge'} control={control} />
              <DateRangePicker
                control={control}
                dateFrom="dateFrom"
                dateTo="dateTo"
                label="申込日"
                getValues={getValues}
                error={errors.dateFrom && true}
                helperText={errors.dateTo && '正しい日付けを選んでください'}
              />
              <Button
                type={'submit'}
                text={'検索'}
                buttonStyles={'Primary'}
                customStyles="block mx-auto mb-4 mt-6"
                onClick={onClose}
              />
            </form>
          </>
        ) : (
          <>
            <FormDialogHeader title={'評価会社' + (edit ? '編集' : '登録') + '画面'} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <InputForm label={'評価会社名'} name={'name'} control={control} required />
              <InputForm label={'先方担当者'} name={'person_in_charge'} control={control} required />
              <InputForm
                label={'電話番号'}
                name={'phone_no'}
                control={control}
                required
                rules={{ pattern: telRegex }}
                error={errors.phone_no && true}
                helperText={errors.phone_no && '10か11桁の数字を入力してください'}
              />
              <TextArea
                register={register}
                name={'memo'}
                label={'特記事項'}
                labelStyles="w-[110px]"
                width="w-[202px]"
              ></TextArea>
              <DialogFooter cancelText={'キャンセル'} confirmText={edit ? '編集' : '登録'} cancelClick={onClose} />
            </form>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ReviewCompanyList;
