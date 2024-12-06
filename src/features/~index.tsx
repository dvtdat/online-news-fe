import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, email } = useAuthStore();

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="h-screen min-h-0 bg-[url('/images/home.jpeg')] bg-cover bg-fixed">
          <div className="relative flex h-full flex-row items-center justify-center bg-primary/[0.7] px-5 pt-0 xl:px-[calc(160px-(1920px-100vw)/3)]">
            <div className="flex size-2/5 flex-col items-center justify-center rounded-lg bg-white p-10">
              <div className="flex size-fit flex-col items-center">
                <div className="text-7xl font-black text-hcmut-dark">
                  BK<span className="text-hcmut-light">News</span>
                </div>
                <div className="mt-2 text-xl font-bold text-hcmut-dark">
                  Online News Platform
                </div>

                {!isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => {
                        navigate({ to: '/login' });
                      }}
                      theme="neutral"
                      variant="outlined"
                      width="full"
                      size="large"
                      className="mt-10"
                    >
                      Log In
                    </Button>
                  </>
                ) : (
                  <div className="size-full">
                    <div className="mt-16 w-full px-10 text-center text-lg font-bold text-primary">
                      Xin chào {email}!
                    </div>
                    <div className="mt-3 w-full px-16 text-center text-sm font-light text-neutral">
                      Vui lòng đăng xuất nếu bạn muốn truy cập bằng tài khoản
                      khác
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
