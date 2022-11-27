import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { useRouter } from 'next/router';

export const Return = () => {
    const router = useRouter()
    return <button className=' text-[#777777]' onClick={() => { router.back() }}>
        <KeyboardReturnOutlinedIcon className='mr-1' />
        戻る
    </button>
}