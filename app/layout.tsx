import "@/assets/styles/global.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { MessageProvider } from "@/context/MessageContext";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "FlexBnB | Find the perfect rental.",
  description: "Find your dream rental property.",
  keywords: "rental, find rentals, find properties",
  icons: {
    icon: "/favicon.ico",
  },
};

import "photoswipe/photoswipe.css";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <MessageProvider>
        <html lang="en">
          <head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>FlexBnB</title>
          </head>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessageProvider>
    </AuthProvider>
  );
};

export default MainLayout;
