type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
  width?: string;
};

export const TabPanel: React.FC<Props> = ({ children, index, value, width }) => {
  return (
    <div
      hidden={value !== index}
      id={`tablePanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="flex flex-col justify-center items-center"
    >
      {value === index && (
        <div className={'pt-5 pb-10 flex flex-col justify-center ' + (width ? width : 'w-[70%]')}>{children}</div>
      )}
    </div>
  );
};
