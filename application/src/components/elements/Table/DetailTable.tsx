import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { defaultValueHandler, optionHandler, textHandler } from '../../../constants/functions/handlers';
import { numberRegEx } from '../../../constants/validationReg';
import { FormValues } from '../../../Types/FormTypes';
import { DummyDetail, FormDetailValue, SelectListValue } from '../../../Types/TableTypes';
import { StatusButton } from '../../templates/apply_customer/detail/StatusButton';
import { Button } from '../Button/MainButtons';
import { InputForm } from '../Form/InputForm';
import { RadioLabel } from '../Form/RadioLabel';
import { Select } from '../Form/Select';
import { TextArea } from '../Form/TextArea';
import { fetch_PATCH } from '../../../constants/functions/fetch';
import { patchDataForApplyCustomer } from '../../../constants/functions/patchData';

interface Props {
  dummyData: DummyDetail;
  note?: boolean;
  onClick?: () => void;
  picture?: boolean;
  pet?: boolean;
  customStyles?: string;
}

interface FormTableProps {
  detailData: FormDetailValue;
  title?: string;
  url?: string;
  setReload?: Dispatch<SetStateAction<boolean>>;
  dynamicList?: SelectListValue;
  reform?: boolean;
}

export const DetailTable: React.FC<Props> = ({ dummyData, note, onClick, picture, pet, customStyles }) => {
  return (
    <>
      <table className={'w-full rounded-sm ' + (customStyles ? customStyles : '')}>
        <tbody>
          {dummyData.map((item) => {
            return (
              <tr key={item.title} className="odd:bg-[#EEEEEE] h-12 text-[18px]">
                <th className="border border-slate-300 w-[20%] ">{item.title}</th>
                <td className="border border-slate-300 pl-5">{item.value}</td>
              </tr>
            );
          })}
          {/* noteがtrueの時に特記事項が表示します*/}
          {note && (
            <tr className="odd:bg-[#EEEEEE] h-12 border border-slate-300">
              <th className="border border-slate-300 w-[20%] text-[18px]">特記事項</th>
              <td className="p-5 flex">
                <p>ここに特記事項が表示されます。</p>
                <Button
                  type={'button'}
                  text={'編集する'}
                  buttonStyles={'Thirdly'}
                  customStyles={'text-[16px] ml-auto'}
                  onClick={onClick}
                />
              </td>
            </tr>
          )}
          {picture && (
            <tr className="odd:bg-[#EEEEEE] h-12 border border-slate-300">
              <th className="border border-slate-300 w-[20%] text-[18px]">登記簿謄本画像</th>
              <td className="p-5 flex">
                <Link href="/others/property_purchase_list" passHref>
                  <a target="_blank" className="text-sky-400">
                    建物全部事項20220422.pdf, 土地全部事項20220422.pdf
                  </a>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pet && <p className="w-[165px] pl-10 text-[18px] p-3 underline font-semibold">ペット情報</p>}
    </>
  );
};

export const DetailFormTable: React.FC<FormTableProps> = ({
  detailData,
  title,
  url,
  setReload,
  dynamicList,
  reform,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { dirtyFields, errors },
  } = useForm<Partial<FormValues>>();
  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    reform ? patchDataForApplyCustomer(data,url!,setReload!) :
      fetch_PATCH({
        dirty: dirtyFields,
        url: url ? url : '',
        body: JSON.stringify(data),
        resFunction: (res: Response) => {
          if (res.ok) {
            setReload && setReload(true);
          } else {
            //エラーの時にエラーメッセージを出すように
            res.json().then((data) => {
              alert(Object.values(data).map((item) => item));
            });
          }
        },
      });
    setReload && setReload(false);
    setEdit(false);
    reset();
  };
  return (
    <div className="my-3">
      <div className="flex">
        {title && <h3 className="text-h3 mb-3">{title}</h3>}
        {edit ? (
          <Button
            type={'button'}
            text={'戻る'}
            buttonStyles={'Thirdly'}
            customStyles="mb-3 w-[10%] ml-auto block"
            onClick={() => {
              setEdit(false);
            }}
          />
        ) : (
          <Button
            type={'button'}
            text={'編集する'}
            buttonStyles={'Thirdly'}
            customStyles="mb-3 w-[10%] ml-auto block"
            onClick={() => {
              setEdit(true);
            }}
          />
        )}
      </div>

      {!edit ? (
        <table className="w-full rounded-sm">
          <tbody>
            {detailData.map((item) => {
              const text = textHandler(item.title, true);
              return (
                <tr key={item.title} className="odd:bg-[#F5F5F5] text-[1.2rem]">
                  <th className="border border-slate-100 w-[200px] text-left p-3 font-normal">{item.title}</th>
                  <td className="border border-slate-100 pl-5">{item.value + text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {detailData.map((item) => {
            const text = textHandler(item.title);
            const option = optionHandler(item.name as keyof FormValues);
            const numberHandler = item.type === 'amount' ? parseInt(item.value.replace(/,/g, '')) : item.value;
            if (item.type === 'radio') {
              return (
                <RadioLabel
                  control={control}
                  //radio label漢字を入れたら、英語の値に変更できるように
                  defaultValue={item.value && defaultValueHandler(item.value, option)}
                  name={item.name as keyof FormValues}
                  // radioのnameと選択肢の名前が同じに設定して、正しいArrayを返すことができる
                  data={optionHandler(item.name as keyof FormValues)}
                  key={item.name}
                  title={item.title}
                  customStyles="odd:bg-[#F5F5F5] text-[1.2rem] px-3 py-2 border-slate-100 border my-0 flex items-center"
                  labelWidth="min-w-[220px]"
                />
              );
            } else if (item.type === 'button') {
              return <StatusButton key={item.name} title={item.title} control={control} name={item.name} />;
            } else if (item.type === 'select') {
              const list = dynamicList ? dynamicList : option;
              return (
                <Select
                  key={item.name}
                  register={register}
                  name={item.name as keyof FormValues}
                  label={item.title}
                  selectList={dynamicList ? dynamicList : option}
                  customStyles="odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0"
                  labelStyles="w-[200px]"
                  width="w-[200px]"
                  defaultValue={item.value && defaultValueHandler(item.value, list)}
                />
              );
            } else if (item.type === 'memo') {
              return (
                <TextArea
                  key={item.name}
                  register={register}
                  name={'memo'}
                  defaultValue={item.value}
                  label={item.title}
                  customStyles="odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0"
                  labelStyles="w-[210px]"
                  width="w-[400px]"
                />
              );
            } else {
              const key = item.name as keyof FormValues;
              return (
                <InputForm
                  key={item.name}
                  label={item.title}
                  name={item.name as keyof FormValues}
                  control={control}
                  type={item.type}
                  customStyles={'odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0 ' + text}
                  labelStyles="w-[200px]"
                  rules={
                    item.type === 'amount'
                      ? {
                          pattern: numberRegEx,
                        }
                      : undefined
                  }
                  defaultValue={numberHandler}
                  error={errors[key]?.type && true}
                  helperText={errors[key]?.type ? '数字を入力してください' : ''}
                />
              );
            }
          })}
          <Button type={'submit'} text={'変更する'} buttonStyles={'Primary'} customStyles="mt-3 mx-auto block" />
        </form>
      )}
    </div>
  );
};
