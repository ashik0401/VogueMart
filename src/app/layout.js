import Footer from "./Footer/Footer";
import "./globals.css";
import Navbar from "./navbar/Navbar";

export const metadata = {
  title: "VogueMart",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main
        className="min-h-screen dark:bg-gray-900"
        >{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
