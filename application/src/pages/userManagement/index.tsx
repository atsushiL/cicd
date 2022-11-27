import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { role, tableHeadForUserManagement } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import React, { useEffect, useState } from 'react';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { Select } from '../../components/elements/Form/Select';
import { emailRegex, usernameRegex } from '../../constants/validationReg';
import { createUserInfo, editUserInfo } from '../../constants/functions/getData';
import { fetch_GET } from '../../constants/functions/fetch';
import { ApiType, UserListValue } from '../../Types/ApiTypes';
import { UserTableBodyAPI } from '../../components/elements/Table/UserTableBodyAPI';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';

const UserManagement = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields, errors },
    register,
    clearErrors,
  } = useForm<Partial<FormValues>>();
  const [search, setOpenSearch] = useState<boolean>(false);
  const [edit, setOpenEdit] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [editId, setEditId] = useState<string>('');
  const [userData, setUserData] = useState<UserListValue[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetch_GET({
      url: `user/?limit=2&offset=${offset}`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        const newData =
          isUserInfoValue(data.results) &&
          data.results.map((item) => {
            return {
              id: item.id,
              role: item.role.toString(),
              username: item.username,
              name: item.name,
              email: item.email,
              verified: item.verified,
              is_active: item.is_active,
            };
          });
        newData && setUserData(newData);
      },
    });
  }, [offset, reload]);

  const resetEdit = () => {
    setOpenEdit(false);
    reset();
    setEditId('');
  };

  function isUserInfoValue(item: ApiType['results']): item is UserListValue[] {
    return (item as UserListValue[]) !== undefined;
  }

  const onEdit = (id: string) => {
    setOpenDialog(true);
    setOpenEdit(true);
    const editItem = userData.find((item) => item.id === id);
    if (editItem) {
      setEditId(editItem.id);
      setValue('role', editItem.role);
      setValue('username', editItem.username);
      setValue('email', editItem.email);
      setValue('name', editItem.name);
    }
  };

  const onClose = () => {
    setOpenDialog(false);
    setOpenSearch(false);
    clearErrors('name');
    clearErrors('username');
    clearErrors('email');
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    if (edit) {
      editUserInfo(dirtyFields, data, editId, setReload, reload);
    } else {
      createUserInfo(data, setReload, reload);
    }
    resetEdit();
    setOpenDialog(false);
  };

  const onSubmitSearch: SubmitHandler<Partial<FormValues>> = (data) => {
    fetch_GET({
      url: `user/?name=${data.name}&username=${data.username}&offset=${offset}&limit=2`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        const newData =
          isUserInfoValue(data.results) &&
          data.results.map((item) => {
            return {
              id: item.id,
              role: item.role.toString(),
              username: item.username,
              name: item.name,
              email: item.email,
              verified: item.verified,
              is_active: item.is_active,
            };
          });
        newData && setUserData(newData);
      },
    });
    resetEdit();
    setOpenDialog(false)
  };


  return (
    <div>
      <PageHeader
        title="システム利用者一覧"
        searchClick={() => {
          resetEdit();
          setOpenSearch(true);
          setOpenDialog(true);
        }}
        addClick={() => {
          resetEdit();
          setOpenDialog(true);
          setOpenEdit(false);
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForUserManagement} />
        <UserTableBodyAPI tableData={userData} onClick={onEdit} setReload={setReload} reload={reload} />
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={2}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        {search ? (
          <>
            <FormDialogHeader title={'条件検索'} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmitSearch)} className="px-2">
              <InputForm label={'社員氏名'} name={'name'} control={control} rules={{}} defaultValue={''} />
              <InputForm label={'社員番号'} name={'username'} control={control} rules={{}} defaultValue={''} />
              <Button
                type={'submit'}
                text={'検索'}
                buttonStyles={'Primary'}
                customStyles="block mx-auto mb-4 mt-6"
              />
            </form>
          </>
        ) : (
          <>
            <FormDialogHeader title={'システム利用者の' + (edit ? '編集' : '登録')} onClose={onClose} />
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <InputForm
                label={'社員名'}
                placeholder="社員名"
                name={'name'}
                control={control}
                labelStyles={'w-[130px]'}
                required
              />
              <InputForm
                label={'社員番号'}
                placeholder="社員番号"
                name={'username'}
                control={control}
                rules={{ pattern: usernameRegex }}
                labelStyles={'w-[130px]'}
                error={errors.username && true}
                helperText={errors.username && '8桁の数字で入力してください'}
                required
              />
              <InputForm
                label={'メールアドレス'}
                placeholder="メールアドレス"
                name={'email'}
                control={control}
                labelStyles={'w-[130px]'}
                rules={{ pattern: emailRegex, maxLength: 254 }}
                helperText={errors.email && 'メールアドレスを正しく入力して下さい'}
                error={errors.email && true}
                required
              />
              <Select
                name={'role'}
                label={'権限'}
                selectList={role}
                register={register}
                labelStyles={'w-[130px]'}
                required
              />
              <DialogFooter cancelText={'キャンセル'} confirmText={'OK'} cancelClick={onClose} />
            </form>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default UserManagement;
