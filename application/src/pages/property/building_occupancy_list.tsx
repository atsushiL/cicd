import { OccupancyTable } from '../../components/elements/Table/OccupancyTable';
import { PageHeader } from '../../components/layout/Header/PageHeader';

const BuildingOccupancyList = () => {
  return (
    <>
      <PageHeader title={'建物占有率'} borderMode addClick={() => {}} />
      <OccupancyTable tableTitle={'戶建'} customStyles="mb-16"/>
      <OccupancyTable tableTitle={'マンション'} />
    </>
  );
};

export default BuildingOccupancyList;
