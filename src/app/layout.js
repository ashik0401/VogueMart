import Footer from "./Footer/Footer";
import "./globals.css";
import Navbar from "./navbar/Navbar";

export const metadata = {
  title: "My Landing Page",
  description: "Modern Next.js landing page example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main
        className="min-h-screen"
        >{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
