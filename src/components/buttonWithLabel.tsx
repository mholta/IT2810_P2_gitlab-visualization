import { Button as MuiButton } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

interface IconButtonWithLabelProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
}

/**
 * Button with icon and animated text on hover.
 */
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
    marginRight: '0.4rem',
    opacity: 1
  },
  hide: { width: 0, marginLeft: 0, marginRight: 0, opacity: 0 }
};

const Button = styled(MuiButton)`
  border-radius: 2rem;
  justify-content: flex-start;
`;

const ActionText = styled(motion.div)`
  overflow: hidden;
`;

export default IconButtonWithLabel;
