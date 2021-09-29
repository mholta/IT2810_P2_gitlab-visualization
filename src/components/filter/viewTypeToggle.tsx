import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { FilterContext } from '../../context/filter.context';
import { ListOrGraph } from '../../context/filter.initialValue';

/**
 * Chooses whether to display data as a list or graph.
 */
const ViewTypeToggle = () => {
  const {
    state: { listOrGraph: valueFromContext },
    setListOrGraph
  } = useContext(FilterContext);

  const [localValue, setLocalValue] = useState<ListOrGraph>(valueFromContext);

  useEffect(() => {
    setLocalValue(valueFromContext);
  }, [valueFromContext]);

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          setLocalValue(ListOrGraph.LIST);
          setListOrGraph(ListOrGraph.LIST);
        }}
        color={localValue === ListOrGraph.LIST ? 'secondary' : 'default'}
      >
        {ListOrGraph.LIST}
      </Button>
      <Button
        onClick={() => {
          setLocalValue(ListOrGraph.GRAPH);
          setListOrGraph(ListOrGraph.GRAPH);
        }}
        color={localValue === ListOrGraph.GRAPH ? 'secondary' : 'default'}
      >
        {ListOrGraph.GRAPH}
      </Button>
    </ButtonGroup>
  );
};

export default ViewTypeToggle;
