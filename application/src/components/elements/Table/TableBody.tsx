import { useRouter } from 'next/router';
import { tableTypes, editTableTypes, editTypes } from '../../../Types/TableTypes';
import { Button } from '../Button/MainButtons';
import { colorHandler } from '../../../constants/functions/handlers';
import Link from 'next/link';

interface normalProps {
  tableData: tableTypes;
  detail?: boolean;
  edit?: false;
  result?: boolean;
  image?: boolean;
  onClick?: () => void;
}

interface editProps {
  tableData: editTableTypes;
  detail?: boolean;
  edit: true;
  result?: boolean;
  image?: boolean;
  onClick: (id: string, item: editTypes) => void;
}

interface userProps {
  tableData: {
    id: string;
    role: string;
    username: number;
    name: string;
    email: string;
    status: string;
    active: boolean;
  }[];
  // tableData: any
  onClick: (id: string, item: editTypes) => void;
  onAdd: (id: string, item: editTypes) => void;
}

type Props = editProps | normalProps;

export const TableBody: React.FC<Props> = ({ tableData, detail, edit, image, onClick }) => {
  const router = useRouter();
  return (
    <tbody>
      {tableData.map((item) => {
        return (
          <tr key={item.id} className={'w-full text-center'}>
            <>
              {Object.values(item.info).map((data, index) => {
                return (
                  <td key={index} className={'border border-slate-300 py-2 ' + `${colorHandler(data.toString())}`}>
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
                        router.push({
                          pathname: '/customers/details/[type]',
                          query: { type: 'detail', id: item.id },
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
                    //私はタイプスクリプトよりタイプがわかるから、これでオッケーだと書いてあります。
                    //https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
                    onClick={() => onClick(item.id, item.info as editTypes)}
                  />
                </td>
              )}
              {image && (
                <td className="border border-slate-300">
                  {/* ここに取得した画像のURLを実装 */}
                  <Link href="/">
                    <a target="_blank" className="w-auto text-sky-600">
                      画像
                    </a>
                  </Link>
                </td>
              )}
            </>
          </tr>
        );
      })}
    </tbody>
  );
};

// export const TableUserManageBodyAPI: React.FC<userProps> = ({ tableData, onClick, onAdd }) => {
//   return (
//     <tbody>
//       {tableData.map((item) => {
//         return (
//           <tr key={item.id} className={'w-full text-center'}>
//             <td className={'border border-slate-300 py-2 '}>
//               {roleCheck(data.role)}
//             </td>
//             <td className={'border border-slate-300 py-2 '}>
//               {data.username}
//             </td>
//             <td className={'border border-slate-300 py-2 '}>
//               {data.name}
//             </td>
//             <td className={'border border-slate-300 py-2 ' + `${colorHandler(data.status)}`}>
//               {data.status}
//             </td>
//             <td className={'border border-slate-300 py-2 ' + `${colorHandler(data.active ? '有効' : '無効')}`}>
//               <button
//                 className={`${data.active ? 'bg-green-600 hover:bg-green-800' : 'bg-red-600 hover:bg-red-800'} text-white font-bold py-1 px-1  rounded ` + ``}
//                 onClick={() =>
//                   onAdd!(item.id, data)
//                 }>
//                 {data.active ?
//                   <div className='flex my-1'>
//                     <CircleOutlinedIcon />
//                     <p className='mx-2'>有効</p>
//                   </div>
//                   : <div className='flex my-1'>
//                     <CloseOutlinedIcon />
//                     <p className='mx-2 '>無効</p>
//                   </div>}
//               </button>
//             </td>
//             <td className="border border-slate-300">
//               <Button
//                 type={'button'}
//                 text={'編集'}
//                 buttonStyles={'Thirdly'}
//                 onClick={() => onClick(item.id, data)}
//               />
//             </td>
//           </tr>
//         );
//       })}
//     </tbody>
//   );
// };
