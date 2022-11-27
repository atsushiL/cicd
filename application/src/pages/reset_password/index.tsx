import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { FormValues } from '../../Types/FormTypes';
import Router from 'next/router';
import { useState } from 'react';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { emailRegex } from '../../constants/validationReg';
import { fetch_POST } from '../../constants/functions/fetch';

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<FormValues>>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    fetch_POST({
      url: 'user/send_reset_password_mail/',
      body: JSON.stringify(data),
      resFunction: (response: Response) => {
        if (response.ok) {
          setOpenDialog(true)
        }else{
          alert('サーバーのエラー');
        }
      },
    });
  };

  const onClose = () => {
    setOpenDialog(false);
    Router.push('/login');
  };

  return (
    <div>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[45%]'}>
        <p className="text-center">メールが正しければ、送信しました。メールのインボクスを確認してください。</p>
        <Button
          type={'button'}
          text={'了解'}
          buttonStyles={'Primary'}
          onClick={onClose}
          customStyles={'block mx-auto my-5'}
        />
      </Dialog>
      <div className="h-[90vh] flex flex-col justify-center">
        <h1 className="text-center text-h3 font-semibold">パスワード再発行</h1>
        <form
          className="flex flex-col justify-center gap-[10px] max-w-[600px] px-12 py-10 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-zinc-600 text-center text-sm">登録しているメールアドレスを入力して送信してください</p>
          <InputForm
            label="メールアドレス"
            type="email"
            name="email"
            control={control}
            rules={{ required: true, pattern: emailRegex }}
            customStyles="mx-auto my-10"
            error={errors.email && true}
            helperText={errors.email && '正しいメールアドレスを入れてください。'}
          />
          <Button
            type="submit"
            text="送信する"
            disabled={false}
            buttonStyles={`Primary`}
            customStyles="block mx-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
