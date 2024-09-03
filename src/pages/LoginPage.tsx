import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const DUNKIN = "dunkin";

interface LoginFormFields {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = async (data: LoginFormFields) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        ...data,
      });

      if (response.status != 200) {
        return;
      }

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem(DUNKIN, accessToken);

      Cookies.set(DUNKIN, refreshToken, {
        httpOnly: import.meta.env.VITE_NODE_ENV === "production",
        secure: false,
        sameSite: "Strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      });

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem(DUNKIN) || Cookies.get(DUNKIN)) navigate("/");
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  return (
    <section className="grid w-full h-screen place-content-center">
      <div className="p-4 bg-white rounded shadow md:w-72">
        <form className="font-serif" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-10 text-lg font-bold">Welcome back! Login here</h1>
          <div className="grid mb-2 h-14">
            <input
              placeholder="Enter your email address"
              className="w-full px-2 py-1 border-2 border-black rounded outline-none h-9"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-700 ms-3">
                Email is required
              </span>
            )}
          </div>
          <div className="grid mb-8 h-14">
            <input
              className="w-full px-2 py-1 border-2 border-black rounded outline-none h-9"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-700 ms-3">
                Password is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-black rounded h-9 "
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
