import { Link, useNavigate } from '@tanstack/react-router';

import Logo from '@/components/icons/logo';
import { useAuthStore } from '@/stores/auth';

import { Button } from '../button/button';
const Header = () => {
  const { isAuthenticated, logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="sticky left-0 top-0 z-50 flex h-20 w-full flex-row items-center justify-between bg-white px-5 text-neutral shadow-lg xs:px-[32px] sm:px-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
      <Link to="/">
        <Logo />
      </Link>
      {isAuthenticated ? (
        <div className="flex flex-row items-center space-x-6 md:space-x-10 lg:space-x-12">
          {isAuthenticated && isAdmin && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <div className="w-28">
            <Button
              onClick={() => {
                logout();
              }}
              theme="neutral"
              variant="outlined"
              width="full"
            >
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        !(
          window.location.pathname === '/' ||
          window.location.pathname === '/login'
        ) && (
          <div className="flex flex-row items-center space-x-4">
            <div className="w-28">
              <Button
                onClick={() => navigate({ to: '/' })}
                theme="neutral"
                variant="outlined"
                width="full"
              >
                Log In
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Header;
