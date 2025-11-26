import "@/assets/styles/global.css";

export const metadata = {
  title: "PropertyPulse | Find the perfect rental.",
  description: "Find your dream rental property.",
  keywords: 'rental, find rentals, find properties'
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
