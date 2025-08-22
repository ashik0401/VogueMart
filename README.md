# Vogue Mart

## 🔗 Live Site

🌐 [Visit Live Website](https://vogue-mart.vercel.app/)

## Short Project Description
Vogue Mart is a modern e-commerce platform built with Next.js and NextAuth for authentication. Users can browse products, view product details, and log in using Google or email/password. The platform features a clean, responsive UI with support for dark mode.

---

## Setup & Installation Instructions

1. **Clone the repository**
```bash
git clone https://github.com/ashik0401/VogueMart
cd vogue-mart
npm install


NEXTAUTH_URL=http://localhost:3000/
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key

npm run dev

 ---

Route Summary
Route	   Description
/Home      / Landing page
/login	    Login page with Google and email/password       authentication
/register	User registration page
/productsPage	Browse all products
/productsPage?productId=<id>	Product detail modal for a specific product
/api/auth/*	NextAuth API routes for authentication
/api/products	API endpoint to fetch product data

---

Tech Stack

Next.js 15 (App Router)

NextAuth.js (Authentication)

React & Tailwind CSS

DaisyUI (UI components)

MongoDB (Database)

---

🤝 Contact
Md. Ashik Mahmud
📧 ashikmahmud0825@gmail.com
