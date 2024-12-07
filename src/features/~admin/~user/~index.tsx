import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export const Route = createFileRoute('/admin/user/')({
  component: AdminUserPage,
});

function AdminUserPage() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const fetchedUserList = await userService.getAll();
        setUserList(fetchedUserList?.data as unknown as User[]);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      }
    };

    fetchUserList();
  }, []);

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
            <div className="w-full overflow-hidden rounded-lg">
              <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
                <div className="flex flex-row items-center justify-center">
                  #
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Name
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Username
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Email
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Created At
                </div>
              </div>
              {userList.map((user: User, index) => (
                <Link
                  className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
                  key={user.userid}
                  to={`/admin/user/${user.userid}`}
                >
                  <div className="flex flex-row items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {user.name}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {user.username}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {user.email}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {new Date(user.createdat).toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
