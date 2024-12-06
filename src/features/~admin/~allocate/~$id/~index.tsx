import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import * as React from 'react';

import AllocateSessionDetail from '@/components/allocate-session-detail';
import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import { useAllocateSessionStore } from '@/stores/allocate-session';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/admin/allocate/$id/')({
  component: AdminAllocateSessionDetailPage,
});

function AdminAllocateSessionDetailPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const { setAllocateSessionList, allocateSessionList } =
    useAllocateSessionStore();

  const allocateSession = allocateSessionList.find(
    (session) => session.id === Number(id),
  );

  const handleDelete = () => {
    if (allocateSession) {
      setAllocateSessionList(
        allocateSessionList.filter(
          (session) => session.id !== allocateSession.id,
        ),
      );
      navigate({ to: '/admin/allocate' });
      alert('Session deleted');
    }
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
                to={'/admin/allocate'}
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
                  Allocate Session Details
                </p>
                <Button
                  onClick={handleDelete}
                  theme="danger"
                  variant="contained"
                  width="fit"
                >
                  Delete Session
                </Button>
              </div>
              {allocateSession ? (
                <AllocateSessionDetail allocateSession={allocateSession} />
              ) : (
                <NotFound />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
