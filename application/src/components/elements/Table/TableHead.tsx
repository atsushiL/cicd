type Props = {
  tableData: string[];
};

export const TableHead: React.FC<Props> = ({ tableData }) => {
  return (
    <thead>
      <tr>
        {tableData.map((value, index) => (
          <th className={`bg-gray-100 px-3 py-1 border-[1px] border-gray-200`} key={`cell-item-${index}`}>
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
};
