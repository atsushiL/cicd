import router from 'next/router';
import { gainsListHeader, tableBodyGainList } from '../../../../constants/constants';
import { Button } from '../../../elements/Button/MainButtons';
import { TableBody } from '../../../elements/Table/TableBody';
import { TableHead } from '../../../elements/Table/TableHead';

export const GainSim = () => {
  const onClickAdd = () => {
    router.push({
      pathname: '/property/gainSimulator',
    });
  };

  return (
    <div>
      <Button
        type={'button'}
        text={'登録'}
        buttonStyles={'Primary'}
        customStyles="mb-3 ml-auto w-[15%] block"
        onClick={onClickAdd}
      />
      <table className="w-full h-auto">
        <TableHead tableData={gainsListHeader} />
        <TableBody tableData={tableBodyGainList} onClick={onClickAdd} image />
      </table>
    </div>
  );
};
