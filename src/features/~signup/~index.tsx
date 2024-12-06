import { createFileRoute } from '@tanstack/react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { emailRegex } from '@/data/auth-data';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/signup/')({
  component: SignUpPage,
});

function SignUpPage() {
  const {
    setIsAuthenticated,
    setName,
    setUsername,
    isAuthenticated,
    name,
    setIsAdmin,
  } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter your name'),
      username: Yup.string().required('Please enter your username'),
      email: Yup.string()
        .matches(emailRegex, 'Email must be a BKNetID email (@hcmut.edu.vn).')
        .required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: async () => {
      const createUserDto = {
        name: formik.values.name,
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password,
        role: 'user',
      };

      await authService
        .signup(createUserDto)
        .then((res) => {
          setIsAuthenticated(true);
          setName(res.data.name);
          setUsername(res.data.username);
          setIsAdmin(res.data.name.includes('Admin'));
        })
        .catch((error) => {
          console.error('Sign Up failed', error);
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
                          id="name"
                          name="name"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          placeholder="Name"
                          className={`${formik.touched.name && formik.errors.name ? 'border-red' : 'border-neutral'} w-full rounded border border-solid p-3 focus:border-primary`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="flex text-red">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="relative flex w-full flex-col gap-2">
                      <div className="relative flex w-full flex-col items-start justify-start gap-2">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder="Username"
                          className={`${formik.touched.username && formik.errors.username ? 'border-red' : 'border-neutral'} w-full rounded border border-solid p-3 focus:border-primary`}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div className="flex text-red">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                    </div>
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
                      Sign Up
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
