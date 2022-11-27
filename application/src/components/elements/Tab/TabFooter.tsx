import { useRouter } from 'next/router';
import { Button } from '../Button/MainButtons';

type Props = {
  index?: number;
};

export const TabFooter: React.FC<Props> = ({ index }) => {
  const router = useRouter();
  const type = router.query.type;
  return (
    <footer className="flex gap-8 my-5 justify-center">
      {type === 'register' ? (
        <Button type={'submit'} text={index === 7 ? '登録' : '次へ'} buttonStyles={'Primary'} />
      ) : (
        <Button type={'submit'} text={'変更する'} buttonStyles={'Primary'} />
      )}
    </footer>
  );
};
