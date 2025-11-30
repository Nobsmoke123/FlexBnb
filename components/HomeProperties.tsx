import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = () => {
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, 5).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-lg mx-auto my-10 px-6">
        <Link
          href={"/properties"}
          className="bg-zinc-900 px-6 py-3 rounded-lg text-white text-base font-extralight hover:opacity-80"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
