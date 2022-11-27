import { Control, UseFormRegister } from 'react-hook-form';
import { InputForm } from '../../components/elements/Form/InputForm';
import { RadioLabel } from '../../components/elements/Form/RadioLabel';
import { Select } from '../../components/elements/Form/Select';
import { TextArea } from '../../components/elements/Form/TextArea';
import {
  account_type,
  applyResult,
  applyType,
  approveList,
  area,
  disapproveList,
  prefectures,
  resultType,
  saleResult,
  unconfirmedList,
  yenList,
} from '../constants';
import { FormValues } from '../../Types/FormTypes';
import { FormRegisterValue } from '../../Types/TableTypes';

export const colorHandler = (text: string) => {
  if (approveList.includes(text)) {
    return 'text-green-600';
  } else if (unconfirmedList.includes(text)) {
    return 'text-[#CCB800]';
  } else if (disapproveList.includes(text)) {
    return 'text-red-600';
  } else if (text === '社内承認') {
    return 'text-indigo-500';
  } else if (text === '再交渉') {
    return 'text-blue-500';
  } else if (text === '取り下げ') {
    return 'text-slate-500';
  } else {
    return '';
  }
};

export const registerFormHandler = (
  data: FormRegisterValue,
  control: Control<Partial<FormValues>>,
  register?: UseFormRegister<Partial<FormValues>>,
  title?: string,
) => {
  return (
    <div className="mb-5">
      {title && <h3 className="text-h3 mb-3">{title}</h3>}
      {data.map((item) => {
        const text = textHandler(item.title);
        if (item.type === 'radio') {
          return (
            <RadioLabel
              control={control}
              //radio label漢字を入れたら、英語の値に変更できるように
              name={item.name as keyof FormValues}
              // radioのnameと選択肢の名前が同じに設定して、正しいArrayを返すことができる
              data={optionHandler(item.name as keyof FormValues)}
              key={item.name}
              title={item.title}
              customStyles="odd:bg-[#F5F5F5] text-[1.2rem] px-3 py-2 border-slate-100 border my-0 flex items-center"
              labelWidth="min-w-[220px]"
            />
          );
        } else if (item.type === 'select') {
          return (
            <Select
              key={item.name}
              register={register!}
              name={item.name as keyof FormValues}
              label={item.title}
              selectList={optionHandler(item.name as keyof FormValues)}
              customStyles="odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0"
              labelStyles="w-[200px]"
              width="w-[200px]"
            />
          );
        } else if (item.type === 'memo' && register) {
          return (
            <TextArea
              key={item.name}
              register={register}
              name={'memo'}
              label={item.title}
              customStyles="odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0"
              labelStyles="w-[210px]"
              width="w-[400px]"
            />
          );
        } else {
          return (
            <InputForm
              key={item.name}
              label={item.title}
              name={item.name as keyof FormValues}
              control={control}
              type={item.type}
              customStyles={'odd:bg-[#F5F5F5] text-[1.2rem] p-3 border-slate-100 border !my-0 ' + text}
              labelStyles="w-[200px]"
              defaultValue=""
            />
          );
        }
      })}
    </div>
  );
};

export const textHandler = (text: string, detail?: boolean) => {
  if (yenList.includes(text) && detail === true) {
    return ' 円';
  } else if (yenList.includes(text)) {
    return "after:content-['円']";
  } else if (text === '想定居住期間' && detail === true) {
    return ' 年';
  } else if (text === '想定居住期間') {
    return "after:content-['年']";
  } else {
    return '';
  }
};

export const defaultValueHandler = (
  text: string,
  option: {
    title: string;
    value: string;
  }[],
) => {
  //listの中に合ってるものを探します。
  //合っていれば、valueを返します。
  const result = option.find((item) => item.title === text);
  return result!.value;
};

export const valueToTitleHandler = (
  value: string,
  option: {
    title: string;
    value: string;
  }[],
) => {
  const result = option.find((item) => item.value === value);
  return result!.title;
};

export const optionHandler = (text: keyof FormValues) => {
  switch (text) {
    case 'account_type':
      return account_type;
    case 'applyResult':
      return applyResult;
    case 'saleResult':
      return saleResult;
    case 'resultType':
      return resultType;
    case 'area':
      return area;
    case 'prefectures':
      return prefectures;
    case 'applyType':
      return applyType;
    default:
      return [];
  }
};

export const ApiOptionHandler = (value: string) => {
  if (value === '0') {
    return '普通';
  } else if (value === '1') {
    return '当座';
  } else {
    return '';
  }
};

export const roleCheck = (role: string) => {
  let status: string = '';
  switch (role) {
    case '0':
      status = '管理者';
      break;
    case '1':
      status = '一般社員';
      break;
    case '2':
      status = 'セールス社員';
      break;
    default:
      break;
  }
  return status;
};

export const statusCheck = (verified: boolean, active: boolean) => {
  //認証機能できたらcomment outを外します
  // if (verified) {
  if (active) {
    return '有効';
  } else {
    return '無効';
  }
  // } else {
  //   return "未確認";
  // };
};

export const applyStatus = (status: string) => {
  switch (status) {
    case 'UNTOUCHED':
      return '未対応';
    case 'IN_PROGRESS':
      return '対応中';
    case 'INTERNAL_APPROVAL':
      return '社内承認';
    case 'CUSTOMER_APPROVAL':
      return 'お客様合意';
    case 'RENEGOTIATION':
      return '再交渉';
    case 'WITHDRAWAL':
      return '取り下げ';
    default:
      return '';
  }
};
