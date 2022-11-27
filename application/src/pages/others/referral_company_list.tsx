import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { tableHeadForCompanyReferral } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { telRegex } from '../../constants/validationReg';
import { ApiType, ReferralCompanyApiType } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { fetch_GET } from '../../constants/functions/fetch';
import { postApi, patchApi } from '../../constants/functions/getData';

const ReferralCompanyList = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [search, setOpenSearch] = useState<boolean>(false);
  const [referralCompanies, setReferralCompanies] = useState<ReferralCompanyApiType[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    formState: { dirtyFields },
  } = useForm<Partial<FormValues>>();

  function fetchData() {
    fetch_GET({
      url: `introduction_company/?offset=${offset}&limit=14`,
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
  }

  const dataHandler = (data: ApiType) => {
    const newData =
      isReferralCompanies(data.results) &&
      data.results.map((item: ReferralCompanyApiType) => {
        return {
          id: item.id,
          created_at: dateTimeFormatter_noTime(item.created_at),
          name: item.name,
          person_in_charge: item.person_in_charge,
          phone_no: item.phone_no,
          introduction_count: item.introduction_count,
        };
      });
    newData && setReferralCompanies(newData);
  };

  const onClose = () => {
    setOpenDialog(false);
    resetEdit();
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const resetEdit = () => {
    reset();
    setEditId('');
    setEdit(false);
  };

  function isReferralCompanies(item: ApiType['results']): item is ReferralCompanyApiType[] {
    return (item as ReferralCompanyApiType[]) !== undefined;
  }

  const onEdit = (id: string) => {
    const list = referralCompanies.find((item) => item.id === id);
    setOpenDialog(true);
    setEdit(true);
    if (list) {
      setEditId(id);
      setValue('name', list.name);
      setValue('phone_no', list.phone_no);
      setValue('person_in_charge', list.person_in_charge);
    }
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'introduction_company/';
    if (edit) {
      patchApi(`${url}${editId}/`, dirtyFields, data, fetchData);
      //検索
    } else if (search) {
      fetch_GET({
        url: `introduction_company/?name=${data.name}&phone_no=${data.phone_no}&person_in_charge=${data.person_in_charge}`,
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
    } else {
      postApi(url, data, fetchData);
    }
    setOpenDialog(false);
    resetEdit();
  };

  return (
    <div>
      <PageHeader
        title={'紹介会社一覧'}
        searchClick={() => {
          setOpenDialog(true);
          setOpenSearch(true);
        }}
        addClick={() => {
          setOpenDialog(true);
          setOpenSearch(false);
          setEdit(false);
          reset();
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForCompanyReferral} />
        {empty ? <EmptyTableBody /> : <TableBodyAPI tableData={referralCompanies} edit onClick={onEdit} />}
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={14}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        {search ? (
          <>
            <FormDialogHeader title={'条件検索'} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <InputForm label={'担当者氏名'} name={'person_in_charge'} control={control} />
              <InputForm label={'会社名'} name={'name'} control={control} />
              <InputForm label={'電話番号'} name={'phone_no'} control={control} />
              <Button type={'submit'} text={'検索'} buttonStyles={'Primary'} customStyles="block mx-auto mb-4 mt-6" />
            </form>
          </>
        ) : (
          <>
            <FormDialogHeader title={'紹介会社' + (edit ? '編集' : '登録') + '画面'} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <InputForm label={'紹介会社名'} name={'name'} control={control} required />
              <InputForm
                label={'電話番号'}
                name={'phone_no'}
                control={control}
                required
                rules={{ pattern: telRegex }}
                error={errors.phone_no && true}
                helperText={errors.phone_no && '10か11桁の数字を入力してください'}
              />
              <InputForm label={'先方担当者'} name={'person_in_charge'} control={control} required />
              <DialogFooter cancelText={'キャンセル'} confirmText={'登録'} cancelClick={onClose} />
            </form>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ReferralCompanyList;
