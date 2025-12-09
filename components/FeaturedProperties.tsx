import { fetchProperties } from "@/app/utils/requests";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { Property } from "@/models/Property";

const FeaturedProperties = async () => {
  const { properties } = await fetchProperties({ showfeatured: true });

  return (
    properties.length > 0 && (
      <section className="bg-gray-50 px-4 pt-6 pb-10">
        <div className="container lg:container-xl m-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="w-full flex flex-nowrap gap-6 bg-gray-50 px-3 py-6 overflow-x-auto">
            {properties.map((property: Property) => (
              <FeaturedPropertyCard
                key={property._id.toString()}
                property={property}
              />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
