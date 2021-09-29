import Footer from '../components/footer';
import Header from '../components/header';
import MainContentContainer from '../components/mainContentContainer';
import SideBar from '../components/sidebar';

/**
 * Main page.
 */
const MainPage = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <MainContentContainer />
      <Footer />
    </div>
  );
};

export default MainPage;
