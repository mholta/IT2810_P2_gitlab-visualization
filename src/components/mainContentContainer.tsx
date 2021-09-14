import { Container } from '@material-ui/core';
import FilterBar from './filterBar';

const MainContentContainer = () => {
  return (
    <>
      <Container>
        <FilterBar />
        <Container>Info her</Container>
      </Container>
    </>
  );
};

export default MainContentContainer;
