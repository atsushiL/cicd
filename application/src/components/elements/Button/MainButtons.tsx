type Props = {
  type: 'button' | 'reset' | 'submit';
  text: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  buttonStyles: keyof typeof ButtonStyles;
  customStyles?: string;
  id?: string;
};

const ButtonStyles = {
  Primary: 'w-[140px] bg-sky-600 text-white py-2',
  Secondary: 'w-[140px] my-2 px-4 py-2 border border-sky-600 text-sky-600',
  Thirdly: 'w-auto text-sky-600',
  Fourthly: 'border-2',
} as const;

export const Button: React.FC<Props> = ({ type, text, onClick, disabled, buttonStyles, customStyles }) => {
  return (
    <button
      type={type}
      className={`${customStyles} ${ButtonStyles[buttonStyles]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
