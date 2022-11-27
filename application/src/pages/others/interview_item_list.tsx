import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../Atoms/Atoms';
import { Dialog } from '../../components/elements/Dialog/Dialog';
import { FormDialogHeader } from '../../components/elements/Dialog/DialogHeader';
import { InputForm } from '../../components/elements/Form/InputForm';
import { TableHead } from '../../components/elements/Table/TableHead';
import { PageHeader } from '../../components/layout/Header/PageHeader';
import { tableHeadForInterviewItem } from '../../constants/constants';
import { FormValues } from '../../Types/FormTypes';
import { TextArea } from '../../components/elements/Form/TextArea';
import { useEffect, useState } from 'react';
import { DialogFooter } from '../../components/elements/Dialog/DialogFooter';
import { ApiType, InterviewItemApiType } from '../../Types/ApiTypes';
import { TableBodyAPI } from '../../components/elements/Table/TableBodyAPI';
import { EmptyTableBody } from '../../components/elements/Table/EmptyTableBody';
import { PaginationBar } from '../../components/elements/Pagination/Pagination';
import { fetch_GET } from '../../constants/functions/fetch';
import { dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { postApi, patchApi } from '../../constants/functions/getData';

const InterviewItemTable = () => {
  const [openDialog, setOpenDialog] = useRecoilState(dialogState); // Dialog表示状態管理
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { dirtyFields },
  } = useForm<Partial<FormValues>>(); // フォーム制御のhooks
  const [edit, setEdit] = useState<boolean>(false); // 編集状態管理
  const [interviewItem, setInterviewItem] = useState<InterviewItemApiType[]>([]); // 表示用データ(バックエンドから取得したデータを格納)
  const [editId, setEditId] = useState<string>(''); //編集対象管理(どのデータを編集しているかを判別するため)
  const [pageItem, setPageItem] = useState<Omit<ApiType, 'results'>>({
    count: 0,
    next: '',
    previous: '',
  }); //ページ情報管理
  const [offset, setOffset] = useState<number>(0); //ページ情報管理

  function fetchData() {
    fetch_GET({
      url: `interview_item/?offset=${offset}&limit=15`,
      resFunction: (data: ApiType) => {
        setPageItem({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      },
    });
  }

  //データを整形して、tableBodyに入れる
  //データの型を確認して、trueの場合はマップでデータを入れる
  const dataHandler = (data: ApiType) => {
    const newData =
      isInterviewItem(data.results) &&
      data.results.map((item: InterviewItemApiType) => {
        return {
          id: item.id,
          item: item.item,
          created_by: item.created_by,
          created_at: dateTimeFormatter_noTime(item.created_at),
          memo: item.memo,
        };
      });
    newData && setInterviewItem(newData);
  };

  useEffect(() => {
    fetchData();
    console.log(interviewItem);

  }, [offset]);

  const onClose = () => {
    setOpenDialog(false);
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    const url = 'interview_item/';
    if (edit) {
      patchApi(`${url}${editId}/`, dirtyFields, data, fetchData);
    } else {
      postApi(url, data, fetchData);
    }

    resetEdit();
  };

  const onOpen = () => {
    resetEdit();
    setOpenDialog(true);
  };

  const resetEdit = () => {
    reset();
    setEditId('');
    setEdit(false);
  };

  // InterviewItemApiTypeかどうかを判断してitemを返す
  function isInterviewItem(item: ApiType['results']): item is InterviewItemApiType[] {
    return (item as InterviewItemApiType[]) !== undefined;
  }

  //データの編集を行う
  const onEdit = (id: string) => {
    // 引数のidをもとにinterviewItem内の該当するデータを抽出する
    const list = interviewItem.find((item) => item.id === id)
    setOpenDialog(true);
    setEdit(true);
    setEditId(id);
    setValue('memo', list?.memo);
    setValue('item', list?.item);
  };

  return (
    <div>
      <PageHeader title="ヒアリング項目一覧" addClick={onOpen} registerOnly />
      <table className="w-full h-auto">
        <TableHead tableData={tableHeadForInterviewItem} />
        <TableBodyAPI tableData={interviewItem} edit onClick={onEdit} />
      </table>
      <PaginationBar count={pageItem.count} next={pageItem.next} previous={pageItem.previous} setOffset={setOffset} limit={15} />
      <Dialog isOpen={openDialog} onClose={onClose} customStyle={'w-[39%]'}>
        <FormDialogHeader title={'ヒアリング項目の' + (edit ? '編集' : '登録')} onClose={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <InputForm label={'ヒアリング項目名'} name={'item'} control={control} rules={{}} width={'w-60'} />
          <TextArea
            name={'memo'}
            placeholder={'特記事項を内容を入力してください'}
            width="w-[100%]"
            register={register}
          />
          <DialogFooter
            cancelText="キャンセル"
            cancelClick={onClose}
            confirmText={edit ? '保存' : '登録'}
            confirmClick={onClose}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default InterviewItemTable;
