import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuth, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/task");
  }, [isAuth, navigate]);

  const onSubmit = async (values) => {
    signup(values);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-900 max-w-md p-8 rounded-md">
        <h1 className="text-3xl text-center font-semibold mb-5">Register</h1>
  
        {Array.isArray(authErrors) && authErrors.length > 0 && (
          <>
            {authErrors.map((err, i) => (
              <div key={i} className="bg-red-800 text-white p-2 mb-4 rounded-md">
                {err}
              </div>
            ))}
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username:
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
            />
          </label>
          {errors.username && (
            <p className="text-red-400">El Username es requerido</p>
          )}

          <label>
            Email:
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
          </label>
          {errors.email && (
            <p className="text-red-400">El Email es requerido</p>
          )}

          <label>
            Password:
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
          </label>
          {errors.password && (
            <p className="text-red-400">El Password es requerido</p>
          )}

          <button
            className="h-10 px-6 font-semibold rounded-md bg-blue-500 text-white my-3"
            type="submit"
          >
            Registrarse
          </button>
        </form>
        <p className="flex justify-between mt-10">
          ¿Tienes cuenta?{" "}
          <Link
            to="/login"
            className=" px-3 font-semibold rounded-md bg-green-500 text-white "
          >
            Loguearse
          </Link>
        </p>
      </div>
    </div>
  );
};
