import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";



const HomePage = () => {
  return (
    <div className="h-full text-2xl font-bold flex flex-col dark:bg-white">
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
