import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../components/elements/Button/MainButtons';
import { InputForm } from '../../components/elements/Form/InputForm';
import { FormValues } from '../../Types/FormTypes';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { PasswordRules } from '../../components/templates/password/PasswordRules';
import { passwordRegex } from '../../constants/validationReg';
import { useEffect, useState } from 'react';
import { fetch_POST } from '../../constants/functions/fetch';

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Partial<FormValues>>();
  const [result, setResult] = useState<boolean>(false);
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    if (router.isReady) {
      fetch_POST({
        url: `user/verify_mail_token/`,
        body: JSON.stringify({ token: token }),
        resFunction: (res: Response) => {
          if (res.ok) {
            setResult(true);
          } else {
            setResult(false);
            alert('リンクは無効になりました');
            //クリックしたら、ページは自動的に閉じます。
            //いいかどうかわからないので、要相談。
            // window.close()
          }
        },
      });
    }
  }, [router.isReady]);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const body = {
      new_password: data.new_password,
      confirm_password: data.confirm_password,
      token: token,
    };
    fetch_POST({
      url: 'user/reset_password/',
      body: JSON.stringify(body),
      resFunction: (response: Response) => {
        if (response.ok) {
          alert('パスワード変更しました。');
          Router.push('/login');
        } else {
          throw Error('サーバーのエラー');
        }
      },
    });

    return (
      <>
        {result ? (
          <div className="h-[90vh] flex flex-col justify-center">
            <h1 className="text-center text-h3 font-semibold mb-8">パスワード再設定</h1>
            <form className="flex flex-col justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
              <PasswordRules />
              <InputForm
                label="新しいパスワード"
                name="new_password"
                type="password"
                control={control}
                rules={{ pattern: passwordRegex }}
                error={errors.new_password && true}
                helperText={errors.new_password && 'ルールを従ってください'}
                customStyles="flex flex-col"
                required
              />
              <InputForm
                label="新しいパスワード（確認）"
                name="confirm_password"
                type="password"
                control={control}
                rules={{ validate: (value) => value === getValues('new_password') }}
                error={errors.confirm_password && true}
                helperText={errors.confirm_password && '同じパスワードを入力してください'}
                customStyles="flex flex-col"
                required
              />
              <Button
                type="submit"
                text="設定する"
                disabled={false}
                buttonStyles={'Primary'}
                customStyles="block mx-auto my-4"
              />
            </form>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
};

export default ResetPassword;
