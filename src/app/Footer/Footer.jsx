import React from 'react'

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center text-primary-content p-10">
      <aside>
       <h1 className='text-3xl font-bold'>Vogue<span className='text-blue-500'>Mart</span></h1>
        <p className="font-bold">
         
          Providing reliable tech since 1992
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>

    </footer>
  )
}
