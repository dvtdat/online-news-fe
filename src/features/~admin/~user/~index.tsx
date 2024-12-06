import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import UserList from '@/components/user-list';

export const Route = createFileRoute('/admin/user/')({
  component: AdminUserPage,
});

function AdminUserPage() {
  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5 flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
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
              <p className="text-2xl font-bold text-primary">User List</p>
              {/* <Button
                onClick={handleCreate}
                theme="primary"
                variant="contained"
                width="fit"
              >
                Create Allocate Session
              </Button> */}
            </div>
            <UserList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
