import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../components/elements/Button/MainButtons';
import { InputForm } from '../../../components/elements/Form/InputForm';
import { PasswordRules } from '../../../components/templates/password/PasswordRules';
import { fetch_POST } from '../../../constants/functions/fetch';
import { passwordRegex } from '../../../constants/validationReg';
import { FormValues } from '../../../Types/FormTypes';

const ChangePassword: NextPage = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Partial<FormValues>>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    fetch_POST({
      url: 'user/change_password/',
      body: JSON.stringify(data),
      resFunction: (response: Response) => {
        if (response.ok) {
          alert('パスワード変更しました。');
          router.push('/customers/apply_customer_list');
        } else {
          alert('パスワードが間違っています');
        }
      },
    });
  };

  const textHandler = () => {
    if (errors.new_password?.type === 'pattern') {
      return '設定ルールを従ってください';
    } else if (errors.new_password?.type === 'validate') {
      return '使用中のパスワードと違うものを設定してください';
    }
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center">
      <h1 className="text-center text-h3 font-semibold mb-8">パスワード変更</h1>
      <form className="flex flex-col justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
        <PasswordRules />
        <InputForm
          label="現在のパスワード"
          name="password"
          type={'password'}
          control={control}
          rules={{}}
          customStyles="flex flex-col"
          required
        />
        <InputForm
          label="新しいパスワード"
          type={'password'}
          name="new_password"
          control={control}
          customStyles="flex flex-col"
          rules={{ pattern: passwordRegex, validate: (val) => val !== getValues('password') }}
          error={errors.new_password && true}
          helperText={textHandler()}
          required
        />
        <InputForm
          label="新しいパスワード（確認）"
          type={'password'}
          name="confirm_password"
          control={control}
          rules={{ validate: (val) => val === getValues('new_password') }}
          customStyles="flex flex-col"
          error={errors.confirm_password && true}
          helperText={errors.confirm_password && '同じパスワードを設定してください'}
          required
        />
        <Button
          type="submit"
          text="変更する"
          disabled={false}
          buttonStyles={'Primary'}
          customStyles="block mx-auto my-4"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
