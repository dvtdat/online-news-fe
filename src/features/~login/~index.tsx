import { createFileRoute } from '@tanstack/react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { emailRegex } from '@/data/auth-data';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage() {
  const {
    setIsAuthenticated,
    setEmail,
    setPassword,
    setIsAdmin,
    isAuthenticated,
    email,
  } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRegex, 'Email phải là email BKNetID (@hcmut.edu.vn).')
        .required('Vui lòng nhập email của bạn'),
      password: Yup.string().required('Vui lòng nhập mật khẩu'),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: () => {
      setIsAuthenticated(true);
      setEmail(formik.values.email);
      setPassword(formik.values.password);
      setIsAdmin(formik.values.email === 'admin@hcmut.edu.vn');
    },
  });

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="h-screen min-h-0 bg-[url('/images/home.jpeg')] bg-cover bg-fixed">
          <div className="relative flex h-full flex-row items-center justify-center bg-primary/[0.7] px-5 pt-0 xl:px-[calc(160px-(1920px-100vw)/3)]">
            <div className="flex h-fit w-2/5 flex-col items-center justify-center rounded-lg bg-white px-10 py-20">
              <div className="flex size-fit flex-col items-center">
                <div className="text-7xl font-black text-hcmut-dark">
                  BK<span className="text-hcmut-light">News</span>
                </div>
                <div className="mt-2 text-xl font-bold text-hcmut-dark">
                  Dịch vụ in ấn thông minh
                </div>

                <div className="mt-5 w-full px-10 text-center text-sm font-light text-neutral">
                  Dịch vụ in ấn thông minh được kết nối với tài khoản MyBK của
                  sinh viên, vui lòng sử dụng tài khoản, mật khẩu từ hệ thống
                  MyBK để đăng nhập
                </div>

                {!isAuthenticated ? (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="relative mt-16 flex w-full flex-col items-start gap-4"
                  >
                    <div className="relative flex w-full flex-col gap-2">
                      <div className="relative flex w-full flex-col items-start justify-start gap-2">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          placeholder="BKNetID@hcmut.edu.vn"
                          className={`${formik.touched.email && formik.errors.email ? 'border-red' : 'border-neutral'} w-full rounded border border-solid p-3 focus:border-primary`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="flex text-red">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="relative flex w-full">
                      <div className="relative flex w-full flex-col items-start justify-start gap-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          className={`${formik.touched.password && formik.errors.password ? 'border-red' : 'border-neutral'} w-full rounded border border-solid p-3 focus:border-primary`}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="flex text-red">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <Button
                      onClick={formik.handleSubmit}
                      theme="primary"
                      variant="contained"
                      width="full"
                      size="large"
                      className="mt-4"
                    >
                      Đăng Nhập
                    </Button>
                  </form>
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
