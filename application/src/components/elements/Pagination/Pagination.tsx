import { IconButton } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  count: number;
  next: string | null;
  previous: string | null;
  setOffset: Dispatch<SetStateAction<number>>;
  limit: number;
};

export const PaginationBar: React.FC<Props> = ({ count, next, previous, setOffset, limit }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <span className="px-3 text-[18px] ">計 {count} 個</span>
      <IconButton
        disabled={previous === null && true}
        onClick={() => {
          setOffset((prev) => prev - limit);
        }}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <IconButton
        disabled={next === null && true}
        onClick={() => {
          setOffset((prev) => prev + limit);
        }}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    </div>
  );
};
