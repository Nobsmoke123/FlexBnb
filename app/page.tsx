import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";

const HomePage = () => {
  return (
    <div className="h-[100vh] text-2xl font-bold flex flex-col">
      <Hero />
      <InfoBoxes />
      
    </div>
  );
};

export default HomePage;
