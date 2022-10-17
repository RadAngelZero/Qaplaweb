import { useState, useEffect, useMemo } from 'react';
import { Button, Box, styled, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StyledChip = styled(Chip)({
    backgroundColor: '#4040FF4F',
    borderRadius: '20.5px',
    padding: '10px 14px',

    color: '#FFFFFFA6',
    fontSize: '17px',
    fontWeight: '600',
    lineHeight: '22px',
    letterSpacing: '0.492000013589859px',
    textAlign: 'center',
    height: '42px',
});

const TagChip = ({ label }) => {

    return (<StyledChip
        label={label}
        
    />);
}

export default TagChip;