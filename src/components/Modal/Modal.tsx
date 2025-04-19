import { createPortal } from 'react-dom';
import classes from './Modal.module.scss';
import { ReactNode } from 'react';
import Typography from '../Typography/Typography';
import { AccentColors, Variant } from '@/shared/types/enums';
import IconButton from '../Buttons/IconButton/IconButton';
import { CloseIcon } from '@/assets/icons';

interface Modal {
  isOpen: boolean;
  title: string;
  body: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<Modal> = ({
  isOpen,
  title,
  onClose,
  body,
  className,
}) => {
  return isOpen
    ? createPortal(
        <div className={classes.backdrop}>
          <div className={classes.content}>
            <div className={`${className} ${classes.modal}`}>
              <div className={classes.header}>
                <Typography variant={Variant.P} text={title} />
                <IconButton
                  icon={<CloseIcon />}
                  onClick={onClose}
                  title={'close'}
                  color={AccentColors.Secondary}
                />
              </div>
              <div className={classes.body}>{body}</div>
            </div>
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement,
      )
    : null;
};

export default Modal;
