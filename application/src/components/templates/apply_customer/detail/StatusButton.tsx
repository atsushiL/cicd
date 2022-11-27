import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { applyStatus } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { Button } from '../../../elements/Button/MainButtons';
import { RadioInput } from '../../../elements/Form/Radio';

type Props = {
  title: string;
  control: Control<Partial<FormValues>>;
  name?: string;
};

export const StatusButton: React.FC<Props> = ({ title, control, name }) => {
  const {setValue} =useForm()
  // APIと接続できたらここは修正する必要があるかも
  const [answer, setAnswer] = useState<boolean>(false);
  return (
    <div className="odd:bg-[#F5F5F5] flex px-3 py-2 items-center border-slate-100 border">
      <h3 className={'w-[210px] text-[16px] '}>{title}</h3>
      {/* 取下げの状態以外社内承認ボタンを表示する予定 */}
      <Button
        type={'button'}
        text={'社内承認'}
        buttonStyles={'Fourthly'}
        customStyles="px-2 py-1 rounded-sm border-sky-600 text-sky-700 mr-5"
        onClick={() => {
          setValue('status','INTERNAL_APPROVAL')
          setAnswer(true);
        }}
      />
      {/* 社内承認の状態になったら、以下のボタンを表示する */}
      {answer && (
        <RadioInput
          name={name as keyof FormValues}
          data={applyStatus}
          control={control}
          onChange={(event) => {
            // const value = event.target.value === 'agree' ? 'お客様合意' : '再交渉'
            // console.log(event.target.value);
            setValue('status',event.target.value)
          }}
        />
      )}
      {/* 取り下げるボタンは取り下げた状態以外表示する */}
      <Button
        type={'button'}
        text={'取り下げ'}
        buttonStyles={'Fourthly'}
        customStyles="px-2 py-1 rounded-sm border-slate-500 text-slate-500 ml-auto"
        onClick={()=>{setValue('status','取り下げ')}}
      />
    </div>
  );
};
