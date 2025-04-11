import { SidebarProvider } from '@betfinio/components/ui';
import { Outlet } from '@tanstack/react-router';
import CustomSidebar from '../components/CustomSidebar';
import Header from '../components/Header';

function Root() {
  return (
    <div className="pwa">
      hello
      {/* <SidebarProvider
        defaultOpen
        className="flex flex-row max-w-(--breakpoint-2xl) mx-auto relative overflow-x-hidden"
      >
        <CustomSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </SidebarProvider> */}
    </div>
  );
}

export default Root;
