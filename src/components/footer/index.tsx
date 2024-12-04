import Logo from '@/components/icons/logo';

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 z-50 flex h-fit w-full flex-row items-center justify-between bg-white px-5 text-neutral xs:px-[32px] sm:px-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
      <div className="my-14 grid size-full grid-cols-2 gap-10 2xl:grid-cols-4">
        <div className="size-full items-center justify-center">
          <Logo />
          <div className="mt-4 w-3/4">© 2024 Smart Printing Project.</div>
        </div>
        <div>
          <div className="text-lg font-bold">Development Team</div>
          <div className="mt-4">Hoàng Công Minh</div>
          <div className="mt-2">Hà Nguyễn Bảo Phúc</div>
          <div className="mt-2">Đỗ Quang Hào</div>
        </div>
        <div>
          <div className="text-lg font-bold">Development Team</div>
          <div className="mt-4">Đoàn Viết Tiến Đạt</div>
          <div className="mt-2">Đào Anh Phúc</div>
        </div>
        <div>
          <div className="text-lg font-bold">Project Information</div>
          <div className="mt-4">HCMC University of Technology</div>
          <div className="mt-2">Software Engineering Course (CO3001)</div>
          <div className="mt-2">Supervised by Prof. Truong Tuan Anh</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
