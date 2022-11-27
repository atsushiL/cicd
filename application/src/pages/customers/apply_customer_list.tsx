import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { results, tableHeadForApply } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { RadioLabel } from '../../components/elements/Form/RadioLabel';
import { DateRangePicker } from '../../components/elements/Form/DateRangePicker';
import { useEffect, useState } from 'react';
import { ApiType, ApplyCustomerListValue } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { dateTimeFormatterHyphen } from '../../constants/functions/dateTimeFormat';
import { fetch_GET } from '../../constants/functions/fetch';
import { applyStatus, colorHandler } from '../../constants/functions/handlers';

const CustomerMayApply = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [data, setData] = useState<ApplyCustomerListValue[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  //検索機能ができたら使用する予定です
  // const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Partial<FormValues>>();

  const onClose = () => {
    setOpenDialog(false);
  };

  function isProspectiveCustomerItem(item: ApiType['results']): item is ApplyCustomerListValue[] {
    return (item as ApplyCustomerListValue[]) !== undefined;
  }

  const dataHandler = (data: ApiType) => {
    const newData =
      isProspectiveCustomerItem(data.results) &&
      data.results.map((item: ApplyCustomerListValue) => {
        const status = applyStatus(item.provision_status)
        return {
          id: item.id,
          application_date: item.application_date,
          name: item.name,
          kana: item.kana,
          provision_status: status,
          approval: item.approval ? '承認' : '否決',
          anti_social_check: item.anti_social_check !== 'WAITING_FOR_RESULT' ? '確認済' : '未確認',
          anti_social_result: item.anti_social_result ? 'OK' : 'NG',
          created_by: item.created_by,
          last_conversation_date:
            item.last_conversation_date === '' ? '' : dateTimeFormatterHyphen(item.last_conversation_date),
            customer:item.customer
        };
      });
    newData && setData(newData);
  };

  useEffect(() => {
    fetch_GET({
      url: `provisional_customer/?limit=1&offset=${offset}`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        dataHandler(data);
      },
    });
  }, [offset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setOpenDialog(false);
    reset();
  };

  return (
    <div>
      <PageHeader
        title="仮申込み客一覧"
        searchClick={() => {
          setOpenDialog(true);
        }}
        addClick={() => {
          router.push({ pathname: '/customers/details/[type]', query: { type: 'register' } });
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForApply} />
        <TableBodyAPI tableData={data} detail />
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={1}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[50%]'}>
        <FormDialogHeader title={'条件検索'} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm label={'お客様氏名'} name={'name'} control={control} rules={{}} />
          <RadioLabel
            control={control}
            data={results}
            name="result"
            title="仮申込結果"
            customStyles="flex items-center text-[18px]"
            labelWidth="w-[120px]"
          />
          <DateRangePicker
            control={control}
            dateFrom="applyDateFrom"
            dateTo="applyDateTo"
            label="申込日"
            getValues={getValues}
            error={errors.applyDateTo && true}
            helperText={errors.applyDateTo && '正しい日付けを選んでください'}
          />
          <DateRangePicker
            control={control}
            dateFrom="negotiationDateFrom"
            dateTo="negotiationDateTo"
            label="最終交渉日"
            getValues={getValues}
            error={errors.negotiationDateTo && true}
            helperText={errors.negotiationDateTo && '正しい日付けを選んでください'}
          />
          <Button type={'submit'} text={'検索'} buttonStyles={'Primary'} customStyles="block mx-auto mb-4 mt-6" />
        </form>
      </Dialog>
    </div>
  );
};

export default CustomerMayApply;
