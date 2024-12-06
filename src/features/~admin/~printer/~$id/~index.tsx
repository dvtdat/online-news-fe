import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import PrinterDetail from '@/components/printer-detail';
import { useAuthStore } from '@/stores/auth';
import { usePrinterStore } from '@/stores/printer';

export const Route = createFileRoute('/admin/printer/$id/')({
  component: AdminPrinterDetailPage,
});

function AdminPrinterDetailPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { setPrinterList, printerList } = usePrinterStore();
  const { id } = Route.useParams();

  const printer = printerList[Number(id) - 1];

  const handleDelete = () => {
    setPrinterList(printerList.filter((p) => p.id !== printer.id));
    navigate({ to: '/admin/printer' });
    alert('Printer deleted');
  };

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5  flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          {!isAuthenticated ? (
            <NotFound />
          ) : (
            <div className="flex h-screen w-full flex-col">
              <Link
                to={'/admin/printer'}
                className="mb-5 flex w-full flex-row items-center justify-start font-medium text-neutral"
              >
                <img
                  src="/icons/chevron.svg"
                  alt="chevron-left"
                  className="h-5 w-auto"
                />{' '}
                <p>Back</p>
              </Link>
              <div className="mb-8 flex w-1/2 flex-row items-center justify-between pr-5">
                <p className="text-2xl font-bold text-primary">
                  Printer Details
                </p>
                <Button
                  onClick={handleDelete}
                  theme="danger"
                  variant="contained"
                  width="fit"
                >
                  Delete Printer
                </Button>
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
