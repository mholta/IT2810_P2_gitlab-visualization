import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { FilterContext } from '../../context/filter.context';
import { ListOrGraph } from '../../context/filter.initialValue';

/**
 * Chooses whether to display data as a list or graph.
 */
const ViewTypeToggle = () => {
  const {
    state: { listOrGraph },
    setListOrGraph
  } = useContext(FilterContext);

  const [localListOrGraph, setLocalListOrGraph] =
    useState<ListOrGraph>(listOrGraph);

  useEffect(() => {
    setLocalListOrGraph(listOrGraph);
  }, [listOrGraph]);

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          setLocalListOrGraph(ListOrGraph.LIST);
          setListOrGraph(ListOrGraph.LIST);
        }}
        color={localListOrGraph === ListOrGraph.LIST ? 'secondary' : 'default'}
      >
        {ListOrGraph.LIST}
      </Button>
      <Button
        onClick={() => {
          setLocalListOrGraph(ListOrGraph.GRAPH);
          setListOrGraph(ListOrGraph.GRAPH);
        }}
        color={localListOrGraph === ListOrGraph.GRAPH ? 'secondary' : 'default'}
      >
        {ListOrGraph.GRAPH}
      </Button>
    </ButtonGroup>
  );
};

export default ViewTypeToggle;
