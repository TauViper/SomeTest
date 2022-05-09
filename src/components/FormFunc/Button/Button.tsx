import React, { FC } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ButtonUI from '@mui/material/Button';

export const Button: FC = () => (
    <ButtonUI variant='contained' type='submit' endIcon={<SendIcon />}>
        send
    </ButtonUI>
);
