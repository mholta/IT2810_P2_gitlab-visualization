import Header from '../components/header';
import MainContentContainer from '../components/mainContentContainer';
import SideBar from '../components/sidebar';

const MainPage = () => {
  console.log('MainPage rendered');

  return (
    <div>
      <Header />
      <SideBar />
      <MainContentContainer />
    </div>
  );
};

export default MainPage;
