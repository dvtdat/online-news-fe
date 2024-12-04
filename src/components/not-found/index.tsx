import { useNavigate } from '@tanstack/react-router';

import { Button } from '../button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <div className="text-9xl font-black text-primary">404</div>
      <div className="mt-8 text-center text-3xl font-bold text-primary">
        Không tìm thấy trang. Vui lòng kiểm tra lại đường dẫn.
      </div>
      <div className="mt-20 w-40">
        <Button
          onClick={() => navigate({ to: '/' })}
          theme="primary"
          variant="contained"
          width="full"
        >
          Trở về trang chủ
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
