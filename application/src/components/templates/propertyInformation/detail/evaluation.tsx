import { Control } from 'react-hook-form';
import { evaluationHead } from '../../../../constants/constants';
import { FormValues } from '../../../../Types/FormTypes';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { TableHead } from '../../../elements/Table/TableHead';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { Button } from '../../../elements/Button/MainButtons';
import { useState } from 'react';
import { colorHandler } from '../../../../constants/functions/handlers';

type evaluation = {
  id?: string;
  info: {
    status: string;
  };
};

type Props = {
  onSubmit: () => void;
  onClose: () => void;
  control: Control<Partial<FormValues>>;
};

export const Evaluation: React.FC<Props> = ({ onSubmit, control, onClose }) => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const [result, setResult] = useState<string>('未対応');
  const checkStatus = (item: evaluation) => {
    if (item.info.status === '未対応') {
      return (
        <td key={item.id} className="border border-slate-300">
          <Button type={'button'} text="依頼中" buttonStyles="Thirdly" onClick={() => setResult('依頼中')} />
        </td>
      );
    } else if (item.info.status === '依頼中') {
      return (
        <td key={item.id} className="border border-slate-300">
          <Button type={'button'} text="結果登録" buttonStyles="Thirdly" onClick={() => setOpenDialog(true)} />
        </td>
      );
    } else {
      return <td className="border border-slate-300"></td>;
    }
  };

  //API接続後、この配列をデフォルトとしてuseStateで管理
  const evaluationList = [
    {
      id: String(Math.random()),
      info: {
        title: 'A社',
        status: '承認',
        result: '1,000,000',
        note: '最寄り駅から徒歩5分であるため',
      },
    },
    {
      id: String(Math.random()),
      info: {
        title: 'B社',
        status: `${result}`,
        result: '0',
        note: '規定外',
      },
    },
    {
      id: String(Math.random()),
      info: {
        title: 'C社',
        status: '依頼中',
        result: '0',
        note: '',
      },
    },
    {
      id: String(Math.random()),
      info: {
        title: 'C社',
        status: '依頼中',
        result: '0',
        note: '',
      },
    },
  ];
  return (
    <>
      <table className="w-full h-auto">
        <TableHead tableData={evaluationHead} />
        {/* 型定義にかなりの時間を費やした結果、上手くいかなかったためTableBodyコンポーネントを使用せずに直接記述 */}
        <tbody>
          <>
            {evaluationList.map((item) => {
              return (
                <tr key={item.id} className={'w-full text-center'}>
                  <>
                    {Object.values(item.info).map((data, index) => {
                      return (
                        <td
                          key={index}
                          className={'border border-slate-300 py-2 ' + `${colorHandler(data.toString())}`}
                        >
                          {data}
                        </td>
                      );
                    })}
                    {checkStatus(item)}
                  </>
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
      <Dialog isOpen={openDialog} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'評価会社結果入力'} onClose={onClose} />
        <form onSubmit={onSubmit} className="px-2">
          <InputForm label={'金額'} name="amount" control={control} width="100px" />
          <InputForm label={'特記事項'} name="note" control={control} width="300px" />
          <DialogFooter
            cancelText={'キャンセル'}
            cancelClick={onClose}
            confirmText={'登録'}
            confirmClick={() => {
              setOpenDialog(false);
            }}
          />
        </form>
      </Dialog>
    </>
  );
};
