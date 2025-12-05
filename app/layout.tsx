import "@/assets/styles/global.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "PropertyPulse | Find the perfect rental.",
  description: "Find your dream rental property.",
  keywords: "rental, find rentals, find properties",
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>PropertyPulse</title>
        </head>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
