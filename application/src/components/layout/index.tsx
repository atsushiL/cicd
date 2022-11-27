import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-rows-auto bg-white">
      <Header />
      <main className="max-w-[1200px] w-full mx-auto p-3">{children}</main>
    </div>
  );
};
