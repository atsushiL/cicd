import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { Select } from '../../components/elements/Form/Select';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { prefectures, tableHeadForProspective } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { DateRangePicker } from '../../components/elements/Form/DateRangePicker';
import { ApiType, ProspectiveCustomerApiType } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { dateTimeFormatter_noTime, dateTimeFormatter_simple } from '../../constants/functions/dateTimeFormat';
import { valueToTitleHandler } from '../../constants/functions/handlers';
import { fetch_GET } from '../../constants/functions/fetch';

export type ProspectiveValues = {
  name: string;
  area: string;
  prefectures: string;
  staff: string;
  applyDate: string;
};

const ProspectiveCustomerList = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const inputRef = useRef<HTMLInputElement>(null);
  //APIと接続したら削除予定です。
  // const [fileReader, setFileReader] = useState<FileReader>();
  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm<Partial<FormValues>>();
  const [data, setData] = useState<ProspectiveCustomerApiType[]>([]);
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  function isProspectiveCustomerItem(item: ApiType['results']): item is ProspectiveCustomerApiType[] {
    return (item as ProspectiveCustomerApiType[]) !== undefined;
  }

  const onClose = () => {
    setOpenDialog(false);
  };

  //データを整形して、tableBodyに入れる
  //データの型を確認して、trueの場合はマップでデータを入れる
  const dataHandler = (data: ApiType) => {
    const newData =
      isProspectiveCustomerItem(data.results) &&
      data.results.map((item: ProspectiveCustomerApiType) => {
        return {
          id: item.id,
          customer_name: item.customer_name,
          customer_kana: item.customer_kana,
          prefecture: item.prefecture,
          created_by: item.created_by,
          created_at: dateTimeFormatter_noTime(item.created_at),
          updated_at: dateTimeFormatter_simple(item.updated_at),
        };
      });
    newData && setData(newData);
  };

  //ページを変わる時にもfetchするように
  useEffect(() => {
    fetch_GET({
      url: `prospect_customers/?offset=${offset}&limit=1`,
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

  
  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    //select boxの値は英語になっているので、漢字に変換してから検索の欄に入れる
    const prefecture = data.prefectures && valueToTitleHandler(data.prefectures, prefectures);
    fetch_GET({
      url: `prospect_customers/?name=${data.name}&prefecture=${prefecture}&created_at_after=${data.applyDateFrom}&created_at_before=${data.applyDateTo}&updated_at_after=${data.negotiationDateFrom}&updated_at_before=${data.negotiationDateTo}`,
      resFunction: (data) => {
        //見つからない場合は、見つからないというメッセージを表示するために、emptyをtrueにする
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
    setOpenDialog(false);
    reset();
  };
  //APIと接続したら削除予定です。
  // useEffect(()=>{
  //   setFileReader(new window.FileReader());
  // },[])

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log(fileObj);
    //APIと接続したら削除予定です。
    // if (fileReader) {
    //   fileReader.onload = function (event) {
    //     const csvOutput = event.target?.result;
    //     console.log(csvOutput);
    //   };
    //   fileReader.readAsText(fileObj);
    // }
    // reset file input
    // event.target.value = '';
  };

  return (
    <div>
      <PageHeader
        title={'見込み客一覧'}
        searchClick={() => {
          setOpenDialog(true);
        }}
        addClick={() => {
          const inputFile = inputRef.current;
          if (!inputFile) return;
          inputFile.click();
        }}
      />
      <input className="hidden" type="file" accept={'.csv'} ref={inputRef} onChange={handleFileChange} />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForProspective} />
        {empty ? <EmptyTableBody /> : <TableBodyAPI tableData={data} detail />}
      </table>
      <PaginationBar
        count={pageItem.count}
        next={pageItem.next}
        previous={pageItem.previous}
        setOffset={setOffset}
        limit={1}
      />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[45%]'}>
        <FormDialogHeader title={'条件検索'} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm label={'お客様氏名'} name={'name'} control={control} />
          <Select
            name={'prefectures'}
            label={'都道府県'}
            selectList={prefectures}
            register={register}
            customStyles="text-[18px] flex items-center"
          />
          <DateRangePicker
            control={control}
            dateFrom="applyDateFrom"
            dateTo="applyDateTo"
            label="登録日"
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

export default ProspectiveCustomerList;
