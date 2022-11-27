import { Button } from '../../elements/Button/MainButtons';

type Props = {
  title: string;
  searchClick?: () => void;
  addClick: () => void;
  registerOnly?: boolean;
  borderMode?: boolean;
};

export const PageHeader: React.FC<Props> = ({ title, searchClick, addClick, registerOnly, borderMode }) => {
  return (
    <header className={'flex justify-between my-4 ' + (borderMode ? 'border-b-2 border-gray-400 py-2' : '')}>
      <h3 className="text-h3">{title}</h3>
      <div>
        { searchClick && <Button
          type={'button'}
          text={'検索'}
          buttonStyles={'Primary'}
          customStyles={'mx-2 ' + (registerOnly && 'hidden')}
          onClick={searchClick}
        />}
        <Button type={'button'} text={'登録'} buttonStyles={'Primary'} customStyles="mx-2" onClick={addClick} />
      </div>
    </header>
  );
};
