"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/productsPage");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/productsPage",
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(res.url || "/productsPage");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 ">
      <div className="md:w-[50%] flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:space-y-4 p-5 rounded-xl md:w-96 shadow-md userForm border dark:border-gray-500 border-gray-200"
        >
          <h2 className="font-semibold md:text-2xl text-lg text-center text-black dark:text-white">
            Login
          </h2>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="label md:text-lg">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <span className="label md:text-lg">Password</span>
            <label className="input focus-within:outline-none w-full">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                autoComplete="password"
                required
                placeholder="Password"
                minLength="8"
                className="w-full focus:outline-none"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Must be more than 6 characters, including lowercase letter, uppercase letter"
              />
              <p
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </p>
            </label>
          </div>

          <button
            type="submit"
            className="btn w-full border-[#e5e5e5] bg-white hover:bg-gray-100 mt-2 dark:text-black"
          >
            Login
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/productsPage" })}
            className="btn w-full border-[#e5e5e5] bg-white hover:bg-gray-100 flex justify-center items-center"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </svg>
            <span className="ml-2 text-base-content dark:text-black">
              Login with Google
            </span>
          </button>

          <p className="text-center mt-4">
            Don’t have an account?
            <Link href="/register">
              <span className="ml-1 hover:underline text-blue-500">
                Register
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
