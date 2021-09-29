import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { FilterContext } from '../../context/filter.context';
import { LayoutContext } from '../../context/layout.context';

const ActionButton = () => {
  const { fetchData } = useContext(FilterContext);
  const { setMenuOpen } = useContext(LayoutContext);

  const handleClick = () => {
    fetchData();
    setMenuOpen(false);
  };
  return (
    <Button
      onClick={handleClick}
      style={{ marginTop: '2rem' }}
      variant="contained"
      color="secondary"
    >
      Update filter
    </Button>
  );
};

export default ActionButton;
