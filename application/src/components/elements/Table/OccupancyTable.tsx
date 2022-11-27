type Props = {
  tableTitle: string;
  customStyles?: string;
};

const propertyAmount: number = 209619000;
const buildingAmount: number = 174985037;
const totalAmount: number = propertyAmount + buildingAmount;
const propertyPercent: number = Math.round((propertyAmount / totalAmount) * 100);
const buildingPercent: number = Math.round((buildingAmount / totalAmount) * 100);
const totalPercent: number = propertyPercent + buildingPercent;

const buildingOccupancyData = [
  {
    name: 'title',
    info: ['', '金額', '占有率'],
  },
  {
    name: 'total',
    info: ['合計', totalAmount.toLocaleString(), `${totalPercent}%`],
  },
  {
    name: 'property',
    info: ['土地', propertyAmount.toLocaleString(), '土地評価額 / 合計不動産評価額'],
  },
  {
    name: 'building',
    info: ['建物', buildingAmount.toLocaleString(), '建物評価額 / 合計不動産評価額'],
  },
];

export const OccupancyTable: React.FC<Props> = ({ tableTitle, customStyles }) => {
  return (
    <table className={`${customStyles} w-full h-auto`}>
      <thead>
        <tr>
          <th colSpan={3} className={`px-3 py-2 bg-sky-600 text-white`}>
            {tableTitle}
          </th>
        </tr>
      </thead>
      <tbody>
        {buildingOccupancyData.map((value, index) => (
          <tr className={'w-full text-center flex justify-between'} key={`cell-item-${index}`}>
            {value.info.map((childrenValue) => (
              <td className={'border border-slate-300 py-2 w-full'} key={`children-cell-item-${index}`}>
                {childrenValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
