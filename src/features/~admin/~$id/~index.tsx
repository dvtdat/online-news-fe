import { createFileRoute } from '@tanstack/react-router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import PrinterDetail from '@/components/printer-detail';
import { useAuthStore } from '@/stores/auth';
import { usePrinterStore } from '@/stores/printer';

export const Route = createFileRoute('/admin/$id/')({
  component: PrinterDetailPage,
});

function PrinterDetailPage() {
  const { isAuthenticated } = useAuthStore();
  const { printerList } = usePrinterStore();
  const { id } = Route.useParams();

  const printer = printerList[Number(id) - 1];

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5  flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          {!isAuthenticated ? (
            <NotFound />
          ) : (
            <div className="flex h-screen w-full flex-col">
              <div className="mb-5 w-full text-2xl font-bold text-primary">
                Thông tin máy in
              </div>
              <PrinterDetail printer={printer} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
