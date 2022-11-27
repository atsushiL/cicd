import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { purchaseResult, tableHeadPropertyList } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { Select } from '../../components/elements/Form/Select';
import { ApiType, PropertyListApiType } from '../../Types/ApiTypes';
import { fetch_GET } from '../../constants/functions/fetch';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';

const PropertyList = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const { control, handleSubmit, reset, register } = useForm<Partial<FormValues>>();
  const [PropertyList, setPropertyList] = useState<PropertyListApiType[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  function fetchData() {
    fetch_GET({
      url: `estates/?offset=${offset}&limit=15`,
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
      isPropertyList(data.results) &&
      data.results.map((item: PropertyListApiType) => {
        return {
          id: item.id,
          application_date: item.application_date,
          provisional_customers_name: item.provisional_customers_name,
          status: item.status,
          evaluation_result: item.evaluation_result,
        };
      });
    newData && setPropertyList(newData);
  };

  function isPropertyList(item: ApiType['results']): item is PropertyListApiType[] {
    return (item as PropertyListApiType[]) !== undefined;
  }

  const onClose = () => {
    setOpenDialog(false);
    reset();
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <PageHeader
        title={'物件情報一覧'}
        searchClick={() => {
          setOpenDialog(true);
        }}
        addClick={() => {
          router.push({
            pathname: '/property/register',
          });
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadPropertyList} />
        {empty ? <EmptyTableBody /> : <TableBodyAPI tableData={PropertyList} detail />}
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={15}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'条件検索'} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid justify-center">
            <InputForm name={'name'} label={'申込者'} control={control} rules={{}} labelStyles={'mr-3'} />
            <Select
              name={'result'}
              label={'買取調査結果'}
              selectList={purchaseResult}
              register={register}
              rules={{}}
              labelStyles={'mr-3'}
            />
            <InputForm
              label={'取り込み日指定'}
              type={'date'}
              name={'dataFrom' as keyof FormValues}
              control={control}
              rules={{}}
            />
            <InputForm
              type={'date'}
              name={'dataTo' as keyof FormValues}
              control={control}
              rules={{}}
              labelStyles={'mr-3'}
            />
            <Button
              type={'submit'}
              text={'検索'}
              buttonStyles={'Primary'}
              customStyles="block mx-auto mb-4 mt-6"
              onClick={() => {
                setOpenDialog(false);
              }}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default PropertyList;
