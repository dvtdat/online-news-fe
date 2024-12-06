import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import * as React from 'react';

import AllocateSessionList from '@/components/allocate-session-list';
import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import { printers } from '@/constant/printer';
import { useAllocateSessionStore } from '@/stores/allocate-session';
import { useAuthStore } from '@/stores/auth';
import { AllocateStatus } from '@/types/allocate-session';

export const Route = createFileRoute('/admin/allocate/')({
  component: AdminAllocatePage,
});

function AdminAllocatePage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { allocateSessionList, addAllocateSession } = useAllocateSessionStore();

  const handleCreate = () => {
    const newSession = {
      id: allocateSessionList.length + 1,
      printer: printers[13],
      status: AllocateStatus.COMPLETED,
      quantity: 0,
      createdAt: new Date(),
    };

    addAllocateSession(newSession);
    navigate({ to: `/admin/allocate/${newSession.id}` });
  };

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5 flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
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
                <p className="text-2xl font-bold text-primary">
                  Allocate Session Log
                </p>
                <Button
                  onClick={handleCreate}
                  theme="primary"
                  variant="contained"
                  width="fit"
                >
                  Create Allocate Session
                </Button>
              </div>
              <AllocateSessionList />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
