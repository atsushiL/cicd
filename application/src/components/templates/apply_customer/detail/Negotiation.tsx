import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { tableHeadForNegotiationHistory } from '../../../../constants/constants';
import { dateTimeFormatter_simple } from '../../../../constants/functions/dateTimeFormat';
import { fetch_GET, fetch_POST } from '../../../../constants/functions/fetch';
import {
  ApiType,
  ApplyCustomerNegotiationValue,
  PromotionDetailApiType,
  PromotionMethodApiType,
} from '../../../../Types/ApiTypes';
import { FormValues } from '../../../../Types/FormTypes';
import { SelectListValue } from '../../../../Types/TableTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { Select } from '../../../elements/Form/Select';
import { TextArea } from '../../../elements/Form/TextArea';
import { TableBodyAPI } from '../../../elements/Table/TableBodyAPI';
import { TableHead } from '../../../elements/Table/TableHead';

export const Negotiation = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [data, setData] = useState<ApplyCustomerNegotiationValue[]>([]);
  const [promotionMethodList, setPromotionMethodList] = useState<SelectListValue>([]);
  const [promotionResultList, setPromotionResultList] = useState<SelectListValue>([]);
  const [reload, setReload] = useState<boolean>(false);
  const { control, handleSubmit, reset, register } = useForm<Partial<FormValues>>();
  const router = useRouter();
  const customerId = router.query.customer_id;

  function isNegotiationList(item: ApiType['results']): item is ApplyCustomerNegotiationValue[] {
    return (item as ApplyCustomerNegotiationValue[]) !== undefined;
  }

  function isMethodList(item: ApiType['results']): item is PromotionMethodApiType[] {
    return (item as PromotionMethodApiType[]) !== undefined;
  }
  function isResultList(item: ApiType['results']): item is PromotionDetailApiType[] {
    return (item as PromotionDetailApiType[]) !== undefined;
  }
  useEffect(() => {
    fetch_GET({
      url: `promotion_method/`,
      resFunction: (data: ApiType) => {
        const method =
          isMethodList(data.results) &&
          data.results.map((item) => {
            return {
              title: item.method,
              value: item.id,
            };
          });
        method && setPromotionMethodList(method);
      },
    });
    fetch_GET({
      url: `promotion_result/`,
      resFunction: (data: ApiType) => {
        const method =
          isResultList(data.results) &&
          data.results.map((item) => {
            return {
              title: item.result,
              value: item.id,
            };
          });
        method && setPromotionResultList(method);
      },
    });
    fetch_GET({
      url: `customers/${customerId}/customer_negotiation_history/`,
      resFunction: (data: ApiType) => {
        console.log(data);
        const newData =
          isNegotiationList(data.results) &&
          data.results.map((item) => {
            return {
              id: item.id,
              created_at: dateTimeFormatter_simple(item.created_at),
              promotion_method: item.promotion_method,
              result: item.result,
              conversation: item.conversation,
              created_by: item.created_by,
            };
          });
        newData && setData(newData);
      },
    });
  }, [reload]);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const postData = {
      ...data,
      //バックエンドの修正を待っている
      customer: '00000000-0000-0000-0000-000000000001',
    };
    fetch_POST({
      url: `customers/${customerId}/customer_negotiation_history/`,
      body: JSON.stringify(postData),
      resFunction: (res: Response) => {
        if (res.ok) {
          setReload(!reload);
        } else {
          setReload(false);
        }
      },
    });
    setOpenDialog(false);
    reset();
  };

  const onClose = () => {
    setOpenDialog(false);
    reset();
  };
  return (
    <>
      <Button
        type="button"
        buttonStyles="Thirdly"
        customStyles="block mb-3 mr-2 ml-auto"
        text="交渉履歴追加"
        onClick={() => {
          setOpenDialog(true);
        }}
      />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForNegotiationHistory} />
        <TableBodyAPI tableData={data} />
      </table>
      {/* <PaginationBar count={10} /> */}
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[35vw]'}>
        <FormDialogHeader title={'交渉履歴入力'} subTitle="担当者は自動で入力されます" onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select name={'promotion_method'} label={'販促方法'} selectList={promotionMethodList} register={register} />
          <Select
            name={'result'}
            label={'販促結果'}
            selectList={promotionResultList}
            register={register}
            rules={{ required: true }}
          />
          <InputForm type={'datetime-local'} control={control} name="created_at" label="交渉日時" />
          <TextArea
            name={'conversation'}
            width="min-h-[180px] w-[300px]"
            register={register}
            label="交渉内容"
            labelStyles="w-[110px]"
          />
          <DialogFooter cancelText={'キャンセル'} confirmText={'保存'} cancelClick={onClose} />
        </form>
      </Dialog>
    </>
  );
};
