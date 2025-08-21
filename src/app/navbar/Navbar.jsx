"use client";

import link from 'daisyui/components/link';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {

    const links = (

        <>
            <li><Link
                href='/'
            >home</Link></li>
            <li><Link href='/productsPage'
            > Products</Link></li>
            <li>Item 3</li>
        </>
    )


    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-center items-center  fixed top-0 left-0 w-full  z-50">
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
                    className="btn bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</Link>
            </div>
        </div>
    );
}
