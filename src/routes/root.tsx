import { useMediaQuery } from '@betfinio/components/hooks';
import { Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Saidebar';

function Root() {
  const { isMobile } = useMediaQuery();
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto pwa max-w-screen overflow-x-hidden my-16">
      <Header />
      <div className="flex flex-row flex-nowrap h-full">
        {!isMobile && <Sidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="border border-yellow-500 h-20">footer</footer>
      {isMobile && <Navigation />}
    </div>
  );
}

export default Root;
