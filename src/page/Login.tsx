import { useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/store";
import { userSignIn } from "../redux/features/userSlice";
interface iFormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iFormData>();
  const onSubmit = (data: iFormData) => {
    dispatch(userSignIn({email:data.email,password:data.password}))
    reset()
  };
  return (
    <section>
      <div className="container">
        <div className="px-2 flex w-full h-[80vh] items-center justify-center">
          <div className="mr-10">
            <h1 className="text-4xl">Welcome back!</h1>
            <p className="font-bold mt-2">Sign in with your credential</p>
          </div>
          <form
            className="border p-5 rounded w-[400px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="input input-bordered flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            <div className="text-center mt-3">
              <button className="btn">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
