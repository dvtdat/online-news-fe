import { createFileRoute } from '@tanstack/react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage() {
  const {
    setIsAuthenticated,
    setUsername,
    isAuthenticated,
    setName,
    setUserId,
    name,
    setIsAdmin,
  } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please enter your username'),
      password: Yup.string().required('Please enter your password'),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: async () => {
      await authService
        .login(formik.values.username, formik.values.password)
        .then((res) => {
          setIsAuthenticated(true);
          setName(res.data.name);
          setUsername(res.data.username);
          setIsAdmin(res.data.name.includes('Admin'));
          setUserId(Number(res.data.userid));
          console.log(res);
        })
        .catch((error) => {
          console.error('Login failed', error);
        });
    },
  });

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="h-screen min-h-0 bg-[url('/images/home.jpeg')] bg-cover bg-fixed">
          <div className="relative flex h-full flex-row items-center justify-center bg-primary/[0.7] px-5 pt-0 xl:px-[calc(160px-(1920px-100vw)/3)]">
            <div className="flex h-fit w-2/5 flex-col items-center justify-center rounded-lg bg-white px-10 py-20">
              <div className="flex size-full flex-col items-center">
                <div className="text-7xl font-black text-hcmut-dark">
                  BK<span className="text-hcmut-light">News</span>
                </div>
                <div className="mt-2 text-xl font-bold text-hcmut-dark">
                  Online News Platform
                </div>
                {!isAuthenticated ? (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="relative mt-16 flex w-full flex-col items-start gap-4"
                  >
                    <div className="relative flex w-full flex-col gap-2">
                      <div className="relative flex w-full flex-col items-start justify-start gap-2">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          className={`${formik.touched.username && formik.errors.username ? 'border-red' : 'border-neutral'} w-full rounded border border-solid p-3 focus:border-primary`}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div className="flex text-red">
                            {formik.errors.username}
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
                      Log In
                    </Button>
                  </form>
                ) : (
                  <div className="size-full">
                    <div className="mt-16 w-full px-10 text-center text-lg font-bold text-primary">
                      Hello {name}!
                    </div>
                    <div className="mt-3 w-full px-16 text-center text-sm font-light text-neutral">
                      Please logout if you want to access with another account
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
