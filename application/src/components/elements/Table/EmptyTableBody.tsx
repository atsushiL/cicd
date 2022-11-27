export const EmptyTableBody: React.FC = () => {
  return (
    <tbody>
      <tr className="text-center border h-[50px]">
        <td colSpan={10}>データが見つかりません</td>
      </tr>
    </tbody>
  );
};
