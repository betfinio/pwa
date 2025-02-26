import { Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import { useMediaQuery } from '@betfinio/components/hooks';

function Root() {
  const { isMobile } = useMediaQuery();
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto pwa">
      <Header />
      <div className="flex flex-row flex-nowrap h-full">
        {!isMobile && (
          <section className="border border-blue-500 w-[250px]">
            sidebar
          </section>
        )}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="border border-yellow-500 h-20">footer</footer>
    </div>
  );
}

export default Root;
