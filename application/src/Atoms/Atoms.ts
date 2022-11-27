import { atom } from 'recoil';

export const dialogState = atom({
  key: 'dialogState',
  default: false,
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const tabState = atom({
  key: 'tabState',
  default: '', //初期値判明次第設定
});


export const resultRegister = atom({
  key: 'resultRegister',
  default: false,
});
//buttonがコンポーネント内に存在せず、別コンポーネントから値を変化させる必要があるためatomsを追記