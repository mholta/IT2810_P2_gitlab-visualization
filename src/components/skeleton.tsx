import { useState } from 'react';
import Header from './header';
import MainContentContainer from './mainContentContainer';
import SideBar from './sidebar';

const Skeleton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header openMenu={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <MainContentContainer />
    </>
  );
};

export default Skeleton;
