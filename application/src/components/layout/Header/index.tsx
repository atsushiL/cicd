import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HeaderMenu } from './HeaderMenu';

type UserValue = {
  name: string,
  role: string
}

export const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserValue>();
  const fetchUser = async () => {
    const res = await fetch(`https://api.stg.crm.agsmileleaseback.co.jp/api/user/user_info/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setUserInfo(data);
  };
  useEffect(() => {
    fetchUser();
  }, [router.asPath]);
  return (
    <header className="w-screen h-[45px] border-b-[1px] bg-white flex items-center justify-between pl-3">
      <h1 className="font-bold text-xl">AG住まいるリースバックCRM</h1>
      {/* ページごとにUserを確認していますので、もしログインしてない場合はnameは""なので、navbarを表示しません */}
      {userInfo && userInfo.name !== '' && <HeaderMenu userInfo={userInfo} />}
    </header>
  );
};
