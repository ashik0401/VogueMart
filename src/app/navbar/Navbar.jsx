"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Show nothing while session is loading
  if (status === "loading") {
    return null; 
  }

  const links = (
    <>
      <li>
        <Link href="/" className={`m-2 ${pathname === "/" ? "underline font-bold" : ""}`}>Home</Link>
      </li>
      <li>
        <Link href="/productsPage" className={`m-2 ${pathname === "/productsPage" ? "underline font-bold" : ""}`}>Products</Link>
      </li>
      {session?.user && (
        <li>
          <Link href="/dashboard/add-product" className={`m-2 ${pathname === "/dashboard/add-product" ? "underline font-bold" : ""}`}>
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="dark:bg-gray-900 bg-gray-100 z-50 fixed top-0 w-full left-0 shadow-sm">
      <div className="navbar flex justify-center md:mx-auto items-center md:w-11/12 px-5">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <h1 className="sm:text-3xl font-bold text-lg">
            Vogue<span className="text-blue-500">Mart</span>
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn text-black dark:text-white rounded hover:bg-blue-600 transition border border-blue-600 bg-transparent hover:text-white btn-sm md:btn-md"
            >
              Logout
            </button>
          ) : (
            <Link href="/logIn" className="btn bg-blue-600 text-white rounded hover:bg-blue-700 transition border-none  btn-sm md:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
