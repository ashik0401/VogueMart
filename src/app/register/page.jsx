'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function register() {
      const [showPass, setShowPass] = useState(false);

    return (
        <div className='flex justify-center items-center min-h-screen px-4 sm:px-6  '>
            <div className='md:w-[50%] flex justify-center'>
                <form  className='md:space-y-4 p-5 rounded-xl md:w-96 shadow-md userForm border dark:border-gray-500 border-gray-200'>
                    <h2 className='font-semibold md:text-2xl text-lg text-center text-secondary dark:text-white'>Register your account</h2>

                    <div className='flex flex-col items-center mb-4'>
                        <input
                            type='file'
                            accept='image/*'
                           
                            
                            style={{ display: 'none' }}
                        />
                        <div
                            
                            className='cursor-pointer rounded-full border-2 border-dashed border-gray-400 dark:border-gray-600 w-32 h-32 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700'
                            title="Click to upload image"
                        >
                                <img
                                    src=""
                                    alt='Preview'
                                    className='object-cover w-full h-full rounded-full'
                                />
                           
                            
                           
                        </div>
                    </div>

                    <div>
                        <label className='label md:text-lg'>Name</label>
                        <input type='text' name='name' className='input input-bordered w-full focus:outline-none' placeholder='Full Name' required />
                    </div>

                    <div>
                        <label className='label md:text-lg'>Email</label>
                        <input type='email' name='email' className='input input-bordered w-full focus:outline-none' placeholder='Email' required />
                    </div>

                    <div>
                        <span className='label md:text-lg'>Password</span>
                        <label className='input focus-within:outline-none w-full'>
                            <input
                                type={showPass ? 'text' : 'password'}
                                name='password'
                                autoComplete='password'
                                required
                                placeholder='Password'
                                minLength='8'
                                className='w-full focus:outline-none'
                                pattern='^(?=.*[a-z])(?=.*[A-Z]).{6,}$'
                                title='Must be more than 6 characters, including lowercase letter, uppercase letter'
                            />
                            <p onClick={() => setShowPass(!showPass)} className='cursor-pointer'>
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </p>
                        </label>
                        {/* {error && <p className='text-red-500'>{error}</p>} */}
                    </div>

                    {/* {error && <p className='text-red-500'>{error}</p>} */}

                   

                    <div className='divider'>OR</div>
                    <button className='btn w-full border-[#e5e5e5] bg-white hover:bg-gray-100'>
                        <svg aria-label='Google logo' width='16' height='16' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='#34a853' d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341' />
                            <path fill='#4285f4' d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57' />
                            <path fill='#fbbc02' d='m90 341a208 200 0 010-171l63 49q-12 37 0 73' />
                            <path fill='#ea4335' d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55' />
                        </svg>
                        <span className='ml-2 text-base-content dark:text-black'>Login with Google</span>
                    </button>
                    <p className='text-center mt-4'>
                        Already have an Account?
                        <Link 
                        href='/logIn'
                        >
                            <span className='ml-1  hover:underline text-blue-500'>Login</span>
                        </Link>
                    </p>
                </form>
            </div>
           
        </div>
    )
}

