
import Footer from "./Footer/Footer";
import Navbar from "./navbar/Navbar";
import "./globals.css";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import { Toaster } from "react-hot-toast";

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
        <SessionProviderWrapper>
          <Navbar />
          <main className="min-h-screen dark:dark:bg-gray-900 ">
             <Toaster position="top-right" reverseOrder={false} />
            {children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
