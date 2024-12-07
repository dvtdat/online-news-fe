import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NotFound from '@/components/not-found';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/stores/auth';
import { User } from '@/types';

export const Route = createFileRoute('/admin/user/$id/')({
  component: AdminUserDetailPage,
});

function AdminUserDetailPage() {
  const { isAuthenticated } = useAuthStore();
  // const navigate = useNavigate();
  const { id } = Route.useParams();

  const [user, setUser] = useState<User>();

  const [isAdminFetch, setIsAdminFetch] = useState(false);
  const [isArticleManagerFetch, setIsArticleManagerFetch] = useState(false);
  const [isCommunityManagerFetch, setIsCommunityManagerFetch] = useState(false);
  const [isWriterFetch, setIsWriterFetch] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isArticleManager, setIsArticleManager] = useState(false);
  const [isCommunityManager, setIsCommunityManager] = useState(false);
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // eslint-disable-next-line testing-library/no-await-sync-queries
        const fetchedUserData = await userService.getById(Number(id));
        setUser(fetchedUserData?.data as unknown as User);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    const checkIsAdmin = async () => {
      try {
        const fetchedIsAdmin = await userService.isAdmin(Number(id));
        setIsAdminFetch(fetchedIsAdmin?.data as unknown as boolean);
        setIsAdmin(fetchedIsAdmin?.data as unknown as boolean);
      } catch (error) {
        console.error('Failed to fetch isAdmin:', error);
      }
    };

    const checkIsArticleManager = async () => {
      try {
        const fetchedIsArticleManager = await userService.isArticleManager(
          Number(id),
        );
        setIsArticleManagerFetch(
          fetchedIsArticleManager?.data as unknown as boolean,
        );
        setIsArticleManager(
          fetchedIsArticleManager?.data as unknown as boolean,
        );
      } catch (error) {
        console.error('Failed to fetch isArticleManager:', error);
      }
    };

    const checkIsCommunityManager = async () => {
      try {
        const fetchedIsCommunityManager = await userService.isCommunityManager(
          Number(id),
        );
        setIsCommunityManagerFetch(
          fetchedIsCommunityManager?.data as unknown as boolean,
        );
        setIsCommunityManager(
          fetchedIsCommunityManager?.data as unknown as boolean,
        );
      } catch (error) {
        console.error('Failed to fetch isCommunityManager:', error);
      }
    };

    const checkIsWriter = async () => {
      try {
        const fetchedIsWriter = await userService.isWriter(Number(id));
        setIsWriterFetch(fetchedIsWriter?.data as unknown as boolean);
        setIsWriter(fetchedIsWriter?.data as unknown as boolean);
      } catch (error) {
        console.error('Failed to fetch isWriter:', error);
      }
    };

    fetchUser();
    checkIsAdmin();
    checkIsArticleManager();
    checkIsCommunityManager();
    checkIsWriter();
  }, [id]);

  const handleConfirm = async () => {
    try {
      if (!isAdminFetch && isAdmin) {
        await userService.createAdmin({ userId: Number(id) });
      }

      if (!isArticleManagerFetch && isArticleManager) {
        await userService.createArticleManager({
          userId: Number(id),
          section: '',
        });
      }

      if (!isCommunityManagerFetch && isCommunityManager) {
        await userService.createCommunityManager({ userId: Number(id) });
      }

      if (!isWriterFetch && isWriter) {
        await userService.createWriter({
          userId: Number(id),
          penname: user?.name || 'n/a',
          bio: '',
        });
      }

      window.location.reload();
    } catch (error) {
      console.error('Failed to update user roles:', error);
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
                to={'/admin/user'}
                className="mb-5 flex w-full flex-row items-center justify-start font-medium text-neutral"
              >
                <img
                  src="/icons/chevron.svg"
                  alt="chevron-left"
                  className="h-5 w-auto"
                />{' '}
                <p>Back</p>
              </Link>
              {/* <div className="mb-8 flex w-1/2 flex-row items-center justify-between pr-5">
                <p className="text-2xl font-bold text-primary">User Details</p>
                <Button
                  onClick={handleDelete}
                  theme="danger"
                  variant="contained"
                  width="fit"
                >
                  Delete User
                </Button>
              </div> */}
              {user ? (
                <div className="mt-4 flex w-1/2 flex-col space-y-8">
                  <div className="w-full">
                    <div className="w-full text-lg font-medium text-neutral">
                      Username
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={user.username}
                      disabled
                      className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary "
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full text-lg font-medium text-neutral">
                      Name
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={user.name}
                      disabled
                      className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full text-lg font-medium text-neutral">
                      Password
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="text"
                      value={user.password}
                      disabled
                      className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full text-lg font-medium text-neutral">
                      Email
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={user.email}
                      disabled
                      className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex w-full flex-row items-center justify-between text-lg font-medium text-neutral">
                      <div>Access Level</div>
                      <button
                        onClick={() => {
                          setIsAdmin(isAdminFetch || false);
                          setIsArticleManager(isArticleManagerFetch || false);
                          setIsCommunityManager(
                            isCommunityManagerFetch || false,
                          );
                          setIsWriter(isWriterFetch || false);
                        }}
                        className="text-base text-gray-400 hover:underline"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="mt-3 flex w-full flex-row space-x-2">
                      <button
                        className={`flex w-full items-center justify-center rounded border p-3 text-base transition-all duration-100 ${
                          isAdmin
                            ? 'bg-primary font-bold text-white'
                            : 'hover:bg-slate-100'
                        }`}
                        disabled={isAdminFetch || isAdmin}
                        onClick={() => setIsAdmin(!isAdmin)}
                      >
                        Admin
                      </button>
                      <button
                        className={`flex w-full items-center justify-center rounded border p-3 text-base transition-all duration-100 ${
                          isArticleManager
                            ? 'bg-primary font-bold text-white'
                            : 'hover:bg-slate-100'
                        }`}
                        disabled={isArticleManagerFetch || isArticleManager}
                        onClick={() => setIsArticleManager(!isArticleManager)}
                      >
                        Article Manager
                      </button>
                      <button
                        className={`flex w-full items-center justify-center rounded border p-3 text-base transition-all duration-100 ${
                          isCommunityManager
                            ? 'bg-primary font-bold text-white'
                            : 'hover:bg-slate-100'
                        }`}
                        disabled={isCommunityManagerFetch || isCommunityManager}
                        onClick={() =>
                          setIsCommunityManager(!isCommunityManager)
                        }
                      >
                        Community Manager
                      </button>
                      <button
                        className={`flex w-full items-center justify-center rounded border p-3 text-base transition-all duration-100 ${
                          isWriter
                            ? 'bg-primary font-bold text-white'
                            : 'hover:bg-slate-100'
                        }`}
                        disabled={isWriterFetch || isWriter}
                        onClick={() => setIsWriter(!isWriter)}
                      >
                        Writer
                      </button>
                    </div>
                  </div>

                  {/* <div className="w-1/2">
                    <div className="w-full text-lg font-medium text-neutral">
                      Printer
                    </div>
                    <Select
                      options={printerOptions.filter(
                        (x) => x.value !== printer.id.toString(),
                      )}
                      value={printerOptions.find(
                        (option) => option.value === printer.id.toString(),
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setPrinter(
                            usePrinterStore
                              .getState()
                              .printerList.find(
                                (printer) =>
                                  printer.id === Number(selectedOption.value),
                              ) as Printer,
                          );
                        }
                      }}
                      placeholder={'Choose Type'}
                      className="mt-3 w-full"
                    />
                  </div> */}

                  {/* <div className="w-1/2">
                    <div className="w-full text-lg font-medium text-neutral">
                      Paper Quantity
                    </div>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setQuantity(value < 0 ? 0 : value);
                      }}
                      value={quantity}
                      placeholder="Enter Paper Quantity"
                      className="mt-3 w-full rounded-lg border border-solid p-3 focus:border-primary"
                    />
                  </div> */}

                  {/* <div className="w-1/2">
                    <div className="w-full text-lg font-medium text-neutral">
                      Status
                    </div>
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(
                        (option) => option.value === status,
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setStatus(selectedOption.value as AllocateStatus);
                        }
                      }}
                      placeholder="Choose Status"
                      className="mt-3 w-full"
                    />
                  </div> */}

                  <div className="flex w-1/6 flex-row pt-10">
                    <Button
                      onClick={handleConfirm}
                      theme="primary"
                      variant="contained"
                      width="full"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              ) : (
                <>HAhahaha</>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
