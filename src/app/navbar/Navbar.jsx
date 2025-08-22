"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();


    const links = (

        <>
            <li>
                <Link
                    href="/"
                    className={`m-2 ${pathname === "/"
                        ? "underline font-bold"
                        : ""
                        }`}
                >
                    Home
                </Link>
            </li>

            <li>
                <Link
                    href="/productsPage"
                    className={`m-2 ${pathname === "/productsPage"
                        ? "underline font-bold"
                        : ""
                        }`}
                >
                    Products
                </Link>
            </li>
        </>
    )


    return (
        <div className='dark:bg-gray-900 bg-gray-100 z-50 fixed top-0 w-full left-0 shadow-sm '>
            <div className="navbar  flex justify-center md:mx-auto items-center    md:w-11/12 px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <h1 className='text-3xl font-bold'>Vogue<span className='text-blue-500'>Mart</span></h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link
                        href='/logIn'
                        className="btn bg-blue-600 text-white rounded hover:bg-blue-700 transition border-none">Login</Link>
                </div>
            </div>
        </div>
    );
}
