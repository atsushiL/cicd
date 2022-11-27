import { Button } from '../../elements/Button/MainButtons';
import { Return } from '../../elements/Button/Return';

type Props = {
  title?: string;
  buttonText?: string;
  showReturn?: boolean;
  onClick?: () => void;
  notEdit?: boolean;
};

export const DetailPageHeader: React.FC<Props> = ({ title, buttonText, showReturn, onClick }) => {
  return (
    <header className="flex justify-between my-4 items-end">
      <div className="flex flex-col gap-3 items-start">
        {/* trueの時だけ表示する */}
        {showReturn && <Return />}
        <h3 className=" text-h3">{title}</h3>
      </div>
      <Button
        type={'button'}
        text={buttonText ? buttonText : ""}
        buttonStyles={'Thirdly'}
        customStyles={'mx-2 ' + (!buttonText && "hidden")}
        onClick={onClick}
      />
    </header>
  );
};
