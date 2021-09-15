import React from 'react';
import { Main } from '../components/layout';
import Header from '../components/header';
import MainContentContainer from '../components/mainContentContainer';
import SideBar from '../components/sidebar';

const MainPage = () => {
  return (
    <Main>
      <Header />
      <SideBar />
      <MainContentContainer />
    </Main>
  );
};

export default MainPage;
