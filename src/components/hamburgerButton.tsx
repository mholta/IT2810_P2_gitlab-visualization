import React, { useContext } from 'react';
import styled from 'styled-components';
import { LayoutContext } from '../context/layout.context';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButtonWithLabel from './buttonWithLabel';

interface HamburgerButtonProps {}

const HamburgerButton = ({}: HamburgerButtonProps) => {
  const { setMenuOpen } = useContext(LayoutContext);

  return (
    <HamburgerButtonWrapper>
      <IconButtonWithLabel
        onClick={() => setMenuOpen(true)}
        icon={<SettingsIcon />}
        label="Filter"
      />
    </HamburgerButtonWrapper>
  );
};

const HamburgerButtonWrapper = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 20;
`;

export default HamburgerButton;