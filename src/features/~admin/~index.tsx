import { createFileRoute } from '@tanstack/react-router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import PrinterList from '@/components/printer-list';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
});

function AdminPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5  flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          {!isAuthenticated ? (
            <NotFound />
          ) : (
            <div className="flex h-fit w-full flex-col">
              <div className="mb-5 w-full text-2xl font-bold text-primary">
                Danh sách máy in
              </div>
              <PrinterList />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
