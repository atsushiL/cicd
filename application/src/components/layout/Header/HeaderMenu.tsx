import { headerMenuList, userMenuList } from '../../../constants/constants';
import { DropDownButton } from '../../elements/Button/DropDownButton';

type Props = {
  userInfo: {
    name: string;
    role: string;
  };
};

type ListValue = {
  value: string;
  info: {
    title: string;
    path: string;
  }[];
};

export const HeaderMenu: React.FC<Props> = ({ userInfo }) => {
  const role = userInfo.role;
  const filteredMenu = (item: ListValue) => {
    if (role === 'SALES' && item.value !== 'お客様情報') {
      return 'hidden';
    } else {
      return '';
    }
  };
  return (
    <ul className="flex">
      {headerMenuList.map((item) => {
        return (
          <li key={item.value} className={'mx-2 ' + filteredMenu(item)}>
            <DropDownButton
              text={item.value}
              actionList={role === 'SALES' ? item.info.filter((item) => item.title === '見込み客一覧') : item.info}
            />
          </li>
        );
      })}
      <li key={'user'} className="mx-2">
        <DropDownButton
          text={userInfo.name}
          actionList={role === 'MANAGEMENT' ? userMenuList : userMenuList.filter((item) => item.title !== '使用者管理')}
        />
      </li>
    </ul>
  );
};
