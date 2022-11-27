import { colorHandler, roleCheck, statusCheck } from '../../../constants/functions/handlers';
import { UserListValue } from '../../../Types/ApiTypes';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button } from '@mui/material';
import { Button as MainButton } from '../Button/MainButtons';
import { changeUserStatus } from '../../../constants/functions/getData';

type Props = {
  tableData: UserListValue[];
  onClick: (id: string) => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
};

export const UserTableBodyAPI: React.FC<Props> = ({ tableData, onClick, setReload, reload }) => {
  return (
    <tbody>
      {tableData.map((item) => {
        const status = statusCheck(item.verified, item.is_active);
        return (
          <tr key={item.id} className={'w-full text-center'}>
            <td className={'border border-slate-300 py-2 '}>{roleCheck(item.role)}</td>
            <td className={'border border-slate-300 py-2 '}>{item.name}</td>
            <td className={'border border-slate-300 py-2 '}>{item.username}</td>
            <td className={'border border-slate-300 py-2 ' + `${colorHandler(status)}`}>{status}</td>
            <td className={'border border-slate-300 py-2 '}>
              {status === '有効' ? (
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    changeUserStatus(item.id, setReload, reload);
                  }}
                >
                  <CloseOutlinedIcon />
                  無効
                </Button>
              ) : (
                <Button
                  className=" text-white bg-lime-600 hover:bg-lime-700"
                  onClick={() => {
                    changeUserStatus(item.id, setReload, reload);
                  }}
                >
                  <CircleOutlinedIcon />
                  有効
                </Button>
              )}
            </td>
            <td className="border border-slate-300">
              <MainButton
                type={'button'}
                text={'編集'}
                buttonStyles={'Thirdly'}
                onClick={() => {
                  onClick(item.id);
                }}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
