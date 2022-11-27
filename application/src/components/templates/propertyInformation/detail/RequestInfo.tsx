import { Control } from 'react-hook-form';
import { dummyDetailsForSaleInfo, dummySaleList, tableHeadForPropertyList } from '../../../../constants/constants';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../../Atoms/Atoms';
import { FormValues } from '../../../../Types/FormTypes';
import { Dialog } from '../../../elements/Dialog/Dialog';
import { DialogFooter } from '../../../elements/Dialog/DialogFooter';
import { FormDialogHeader } from '../../../elements/Dialog/DialogHeader';
import { InputForm } from '../../../elements/Form/InputForm';
import { DetailFormTable } from '../../../elements/Table/DetailTable';
import { TableBody } from '../../../elements/Table/TableBody';
import { TableHead } from '../../../elements/Table/TableHead';
import { RadioLabel } from '../../../elements/Form/RadioLabel';

type Props = {
  onSubmit?: () => void;
  control: Control<Partial<FormValues>>;
  onClick: () => void;
  openDialog?: boolean;
  onClose?: () => void;
  confirmClick?: () => void;
};

export const RequestInfo: React.FC<Props> = ({ control, onClose, onSubmit, onClick, confirmClick }) => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  return (
    <div>
      <DetailFormTable detailData={dummyDetailsForSaleInfo}/>
      <table className="my-10 w-full h-auto">
        <TableHead tableData={tableHeadForPropertyList} />
        <TableBody tableData={dummySaleList} edit onClick={onClick} />
      </table>
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[30%]'}>
        <FormDialogHeader title={'調査結果編集'} onClose={onClose} />
        <form onSubmit={onSubmit} className="px-2">
          <InputForm label={'結果'} name={'propertyPurchaseName'} control={control} rules={{}} labelStyles="mr-3" />
          <RadioLabel
            control={control}
            data={[
              { title: 'OK', value: 'OK' },
              { title: 'NG', value: 'NG' },
            ]}
            name="approve"
            title="判定"
            customStyles="flex items-center text-[18px]"
            labelWidth="w-[120px]"
          />
          <InputForm label={'理由'} name={'reason'} control={control} rules={{}} labelStyles="mr-3" />
          <DialogFooter
            cancelText={'キャンセル'}
            cancelClick={onClose}
            confirmText={'保存'}
            confirmClick={confirmClick}
          />
        </form>
      </Dialog>
    </div>
  );
};