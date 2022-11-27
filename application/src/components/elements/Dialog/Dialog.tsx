import React, { ReactNode, useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  customStyle: string;
  children: ReactNode;
};

export const Dialog: React.FC<Props> = ({ isOpen, onClose, customStyle, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogElement = dialogRef.current;

  useEffect(() => {
    if (isOpen) {
      dialogElement?.showModal();
      // prevent bg scroll
      document.body.classList.add('modal-open');
    } else {
      dialogElement?.close();
      // prevent bg scroll
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  //DialogのContentをClickしても閉じないように設定

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog ref={dialogRef} onClick={onClose} className={!isOpen ? `hidden ${customStyle}` : `${customStyle}`}>
      <main onClick={preventAutoClose}>{children}</main>
    </dialog>
  );
};
