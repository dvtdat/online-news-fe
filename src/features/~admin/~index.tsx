import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
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
        <div className="relative my-5 flex h-[60vh] w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          {!isAuthenticated ? (
            <NotFound />
          ) : (
            <div className="grid size-full grid-cols-4 gap-8">
              <Link
                to={'/admin/user'}
                className="flex h-32 w-full flex-row items-center justify-center rounded-lg border border-primary bg-white text-2xl font-bold text-primary shadow-lg transition-all duration-100 hover:bg-primary hover:text-white"
              >
                User Management
              </Link>
              <Link
                to={'/admin/tag'}
                className="flex h-32 w-full flex-row items-center justify-center rounded-lg border border-primary bg-white text-2xl font-bold text-primary shadow-lg transition-all duration-100 hover:bg-primary hover:text-white"
              >
                Tag Management
              </Link>
              <Link
                to={'/admin/user'}
                className="flex h-32 w-full flex-row items-center justify-center rounded-lg border border-primary bg-white text-2xl font-bold text-primary shadow-lg transition-all duration-100 hover:bg-primary hover:text-white"
              >
                Article Management
              </Link>
              <Link
                to={'/admin/user'}
                className="flex h-32 w-full flex-row items-center justify-center rounded-lg border border-primary bg-white text-2xl font-bold text-primary shadow-lg transition-all duration-100 hover:bg-primary hover:text-white"
              >
                Comment Management
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
