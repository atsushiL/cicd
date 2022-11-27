import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type Props = {
  title: string;
  subTitle?: string;
  onClose?: () => void;
};

export const FormDialogHeader: React.FC<Props> = ({ title, subTitle, onClose }) => {
  return (
    <div className='flex items-center before:content-[""] before:w-3 before:h-[21px] before:bg-sky-600 before:mr-2 h-10'>
      <div className="flex items-baseline">
        <h2 className="text-h3 mr-4">{title}</h2>
        <p className="text-[#777777]">{subTitle}</p>
      </div>
      <button onClick={onClose} className="ml-auto mb-auto" type='button'>
        <CloseOutlinedIcon />
      </button>
    </div>
  );
};
