import { Button as MuiButton, IconButton } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LayoutContext } from '../context/layout.context';
import SettingsIcon from '@material-ui/icons/Settings';
import { motion, Variants } from 'framer-motion';

interface IconButtonWithLabelProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
}

const IconButtonWithLabel = ({
  label,
  onClick,
  icon
}: IconButtonWithLabelProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Button
      onClick={onClick}
      style={{ fontSize: 'inherit' }}
      color="secondary"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon}
      <ActionText
        variants={textVariants}
        initial="hide"
        animate={hover ? 'show' : 'hide'}
      >
        {label}
      </ActionText>
    </Button>
  );
};

const textVariants: Variants = {
  show: {
    width: 'auto',
    marginLeft: '0.4rem',
    marginRight: '0.4rem'
  },
  hide: { width: 0, marginLeft: 0, marginRight: 0 }
};

const Button = styled(MuiButton)`
  border-radius: 2rem;
  justify-content: flex-start;
`;

const ActionText = styled(motion.div)`
  overflow: hidden;
`;

export default IconButtonWithLabel;
