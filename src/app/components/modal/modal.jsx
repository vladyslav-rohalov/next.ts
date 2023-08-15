'use client';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Container, IconButton, Box, Typography, Divider } from '@mui/material';
import { Backdrop, ModalWindow } from './modal.styled';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({
  onClose,
  children,
  title,
  width,
  height,
  position = 'center',
}) {
  useEffect(() => {
    const keyDownEvent = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDownEvent);

    return () => {
      window.removeEventListener('keydown', keyDownEvent);
    };
  }, [onClose]);

  const location = position => {
    if (position === 'center')
      return { top: '50%', left: '50%', x: '50%', y: '50%' };
    if (position === 'top') return { top: '72px', left: '50%', x: '50%', y: 0 };
  };

  const onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <Backdrop onClick={onCloseBackdrop}>
      <Container
        maxWidth="xl"
        sx={{ position: 'relative', height: '100%' }}
        onClick={onCloseBackdrop}
      >
        <ModalWindow
          width={width}
          height={height}
          location={location(position)}
        >
          <IconButton
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
            onClick={onClose}
          >
            <CloseIcon sx={{ fill: '#586ba4' }} />
          </IconButton>
          <Box>
            <Typography component="h2" sx={{ fontSize: 28, fontWeight: 500 }}>
              {title}
            </Typography>
            <Divider />
          </Box>
          {children}
        </ModalWindow>
      </Container>
    </Backdrop>,
    document.body
  );
}
