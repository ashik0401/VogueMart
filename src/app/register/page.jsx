"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/products",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="md:w-[50%] flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5 rounded-xl md:w-96 shadow-md border dark:border-gray-500 border-gray-200"
        >
          <h2 className="font-semibold text-2xl text-center text-black dark:text-white ">
            Register your account
          </h2>

          {error && <p className="text-red-500">{error}</p>}


          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Full Name"
              required
            />
          </div>


          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

 
          <div>
            <span className="label">Password</span>
            <label className="input w-full flex items-center">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                minLength="8"
                className="w-full focus:outline-none"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Must be at least 6 characters, include lowercase and uppercase letters"
              />
              <p
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer ml-2"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </p>
            </label>
          </div>

        
          <button
            type="submit"
            className="btn w-full bg-white border hover:bg-gray-100 text-black"
          >
            Register
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/products" })}
            className="btn w-full bg-white border hover:bg-gray-100 flex justify-center items-center"
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
            <span className="ml-2 text-black">Login with Google</span>
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/logIn">
              <span className="ml-1 hover:underline text-blue-500">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
