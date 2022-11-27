import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useState } from 'react';
import { fetch_POST_DATA } from '../../../constants/functions/fetch';

type Props = {
  text: string;
  actionList: {
    title: string;
    path: string;
  }[];
};

export const DropDownButton: React.FC<Props> = ({ text, actionList }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const path = router.pathname;
  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        sx={{
          fontSize: '1rem',
          color: '#3A3B3C',
        }}
      >
        {text}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {actionList.map((item) => {
          return (
            <MenuItem
              key={item.path}
              onClick={() => {
                router.push(item.path);
                handleClose();
                if (item.title === 'ログアウト') {
                  fetch_POST_DATA({ url: 'logout/' });
                }
              }}
              sx={{
                color: path === item.path ? '#5496D2' : 'black',
              }}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
