import { Button, ButtonGroup } from '@material-ui/core';
import React, { useContext } from 'react';
import { FilterContext } from '../../context/filter.context';
import { ListOrGraph } from '../../context/filter.initialValue';
import { LayoutContext } from '../../context/layout.context';

/**
 * Chooses whether to display data as a list or graph.
 */
const ViewTypeToggle = () => {
  const {
    state: { listOrGraph },
    setListOrGraph
  } = useContext(FilterContext);

  const { setMenuOpen } = useContext(LayoutContext);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={() => {
            setListOrGraph(ListOrGraph.LIST);
            closeMenu();
          }}
          color={listOrGraph === ListOrGraph.LIST ? 'secondary' : 'default'}
        >
          List
        </Button>
        <Button
          onClick={() => {
            setListOrGraph(ListOrGraph.GRAPH);
            closeMenu();
          }}
          color={listOrGraph === ListOrGraph.GRAPH ? 'secondary' : 'default'}
        >
          Graph
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ViewTypeToggle;
