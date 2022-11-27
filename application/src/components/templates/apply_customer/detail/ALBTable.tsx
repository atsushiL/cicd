import { useState } from 'react';
import {
  dummyForALBDetail,
  tableDetailForALB,
  tableDetailForALBAccount,
  tableHeadForALBDetail,
} from '../../../../constants/constants';
import { Button } from '../../../elements/Button/MainButtons';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { DetailTable } from '../../../elements/Table/DetailTable';
import { TableHead } from '../../../elements/Table/TableHead';

type Props = {
     title?:string
}

export const ALBTable: React.FC<Props> = ({title}) => {
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<boolean>(false);
  const onClose = () => {
    setOpenDetailDialog(false);
  };
  return (
    <>
    {title && <h3 className="text-h3 my-3">{title}</h3>}
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForALBDetail} />
        <tbody>
          {dummyForALBDetail.map((item) => {
            return (
              <tr key={item.id}>
                {Object.values(item.info).map((info, index) => {
                  return (
                    <td key={index} className="text-center py-5 border">
                      {info}
                      {index <= 1 && (
                        <Button
                          type={'button'}
                          text={'詳細'}
                          buttonStyles={'Thirdly'}
                          onClick={() => {
                            setOpenDetailDialog(true);
                            if (index === 0) {
                              setPersonalInfo(true);
                            } else {
                              setPersonalInfo(false);
                            }
                          }}
                          customStyles="text-[14px] block mx-auto"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog isOpen={openDetailDialog} onClose={onClose} customStyle={'w-[45vw]'}>
        <FormDialogHeader title={personalInfo ? '個人情報' : '取引状況'} onClose={onClose} />
        <DetailTable dummyData={personalInfo ? tableDetailForALB : tableDetailForALBAccount} customStyles="my-5" />
      </Dialog>
    </>
  );
};
