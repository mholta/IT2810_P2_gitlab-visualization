import { withTheme } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Main } from '../components/layout';
import Skeleton from '../components/skeleton';

const MainPage = () => {
  const [invert, setInvert] = useState<boolean>(false);

  return (
    <Main>
      <Skeleton />
      {/* <BoxWithPropsAndTheme invert={invert} onClick={() => setInvert(!invert)}>
        Box
      </BoxWithPropsAndTheme> */}
    </Main>
  );
};

interface BoxProps {
  invert?: boolean;
}

const BoxWithPropsAndTheme = withTheme(styled.div<BoxProps>`
  padding: 6rem;
  margin: 6rem;
  display: inline-block;

  background-color: ${(props) => props.theme.palette.primary.main};

  filter: invert(${(props) => (props.invert ? 1 : 0)});

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    background-color: red;
  }
`);

export default MainPage;
