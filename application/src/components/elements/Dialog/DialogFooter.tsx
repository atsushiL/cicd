import { Button } from '../Button/MainButtons';

type Props = {
  cancelText: string;
  confirmText: string;
  cancelClick?: () => void;
  confirmClick?: () => void;
};

export const DialogFooter: React.FC<Props> = ({ cancelText, confirmText, cancelClick, confirmClick }) => {
  return (
    <footer className="flex items-center justify-center gap-10">
      <Button type={'button'} text={cancelText} buttonStyles={"Secondary"} onClick={cancelClick} />
      <Button type={'submit'} text={confirmText} buttonStyles={'Primary'} onClick={confirmClick} />
    </footer>
  );
};
