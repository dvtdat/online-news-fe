import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import PrinterList from '@/components/printer-list';
import { useAuthStore } from '@/stores/auth';
import { usePrinterStore } from '@/stores/printer';
import { Location, PrinterType, Status } from '@/types/printer';

export const Route = createFileRoute('/admin/printer/')({
  component: AdminPrinterPage,
});

function AdminPrinterPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { setPrinterList, printerList } = usePrinterStore();

  const handleCreate = () => {
    const newPrinter = {
      id: printerList.length + 1,
      name: 'new printer',
      status: Status.STOPPED,
      type: PrinterType.CANON,
      location: Location.A2_CS1,
      paperAvailable: 0,
    };
    setPrinterList([...printerList, newPrinter]);
    navigate({ to: `/admin/printer/${newPrinter.id}` });
  };

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5  flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          {!isAuthenticated ? (
            <NotFound />
          ) : (
            <div className="flex h-fit w-full flex-col">
              <Link
                to={'/admin'}
                className="mb-5 flex w-full flex-row items-center justify-start font-medium text-neutral"
              >
                <img
                  src="/icons/chevron.svg"
                  alt="chevron-left"
                  className="h-5 w-auto"
                />{' '}
                <p>Back</p>
              </Link>
              <div className="mb-8 flex w-full flex-row items-center justify-between">
                <p className="text-2xl font-bold text-primary">Printer List</p>
                <Button
                  onClick={handleCreate}
                  theme="primary"
                  variant="contained"
                  width="fit"
                >
                  Add New Printer
                </Button>
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
