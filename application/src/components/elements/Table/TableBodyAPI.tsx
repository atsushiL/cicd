import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { Button } from '../Button/MainButtons';
import { ApiType, ApplyCustomerListValue, filterDataType } from '../../../Types/ApiTypes';
import { colorHandler } from '../../../constants/functions/handlers';

interface Props {
  tableData: ApiType['results'];
  detail?: boolean;
  edit?: boolean;
  result?: boolean;
  onClick?: (id: string) => void;
}

export const TableBodyAPI: React.FC<Props> = ({ tableData, detail, edit, onClick, result }) => {
  const router = useRouter();
  //idを抜いてからマップする
  const getFilterData = (item: filterDataType) => {
    let temp: {
      [key: string]: string;
    } = {};
    for (const [key, value] of Object.entries(item)) {
      if (key !== 'id' && key !== 'customer' && key !== 'interview_item') {
        temp = Object.assign(temp, { [key]: value });
      }
    }
    return temp;
  };

  return (
    <tbody>
      {tableData.map((item) => {
        const filteredData = getFilterData(item);
        return (
          <tr key={item.id} className={'w-full text-center'}>
            {Object.values(filteredData).map((data, index) => {
              return (
                <td key={index} className={'border border-slate-300 py-2 ' + `${colorHandler(data)}`}>
                  {data}
                </td>
              );
            })}
            {detail && (
              <td className="border border-slate-300">
                {/* dynamic routeを作ったので、a tagの代わりにbuttonを使いました。 */}
                <Button
                  type={'button'}
                  text={'詳細'}
                  buttonStyles={'Thirdly'}
                  onClick={() => {
                    if (router.pathname === '/customers/prospective_customer_list') {
                      router.push({
                        pathname: '/customers/[prospective_id]',
                        query: { prospective_id: item.id },
                      });
                    } else if (router.pathname === '/property/property_list') {
                      router.push({
                        pathname: '/property/details/[id]',
                        query: { id: item.id },
                      });
                    } else {
                      const value = item as ApplyCustomerListValue;
                      router.push({
                        pathname: '/customers/details/[type]',
                        query: { type: 'detail', customer_id: value.customer, provisional_id: value.id },
                      });
                    }
                  }}
                />
              </td>
            )}
            {edit && (
              <td className="border border-slate-300">
                <Button
                  type={'button'}
                  text={'編集'}
                  buttonStyles={'Thirdly'}
                  onClick={() => {
                    //編集する物のidを渡す
                    //onClickがundefinedじゃないように判断する
                    onClick && onClick(item.id);
                  }}
                />
              </td>
            )}
            {/* {result && (
              <td className="border border-slate-300">
                <Button type={'button'} text="結果登録" buttonStyles="Thirdly" onClick={() => setOpenRegister(true)} />
              </td>
            )} */}
          </tr>
        );
      })}
    </tbody>
  );
};
