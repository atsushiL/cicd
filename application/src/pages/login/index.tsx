import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { FormValues } from '../../Types/FormTypes';
import Router from 'next/router';
import { usernameRegex } from '../../constants/validationReg';
import { fetch_LOGIN } from '../../constants/functions/fetch';

const Login = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Partial<FormValues>>();

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    fetch_LOGIN({
      url: 'login/',
      body: data,
      resFunction: (response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError('password', { type: 'custom' });
        }
      },
      loginRouting: (data: { role: string }) => {
        if (data) {
          if (data['role'].toLowerCase() == 'sales') {
            Router.push('/customers/prospective_customer_list/');
          } else {
            Router.push('/customers/apply_customer_list/');
          }
        }
      },
    });
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center">
      <h1 className="text-center text-h3 font-semibold">ログイン</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-[10px] max-w-[600px] px-12 py-10 mx-auto"
      >
        <InputForm
          label="社員番号"
          name="username"
          control={control}
          rules={{ pattern: usernameRegex }}
          customStyles="mx-auto"
          error={errors.username && true}
          helperText={errors.username && '8桁の数字で入力してください'}
          required
        />
        <InputForm
          label="パスワード"
          type="password"
          name="password"
          control={control}
          rules={{ required: true }}
          customStyles="mx-auto"
          error={errors.password && true}
          helperText={errors.password && '社員番号かパスワードが間違っています'}
          required
        />
        <Link href="/reset_password" passHref>
          <a className="underline hover:no-underline text-gray-400 text-center text-sm my-3">
            パスワードを忘れた場合はこちら
          </a>
        </Link>
        <Button
          type="submit"
          text="ログイン"
          disabled={isSubmitSuccessful ? true : false}
          buttonStyles={`Primary`}
          customStyles="block mx-auto my-4"
        />
      </form>
    </div>
  );
};

export default Login;
