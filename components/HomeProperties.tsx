// import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { Property } from "@/models/Property";

async function fetchProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties.");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const HomeProperties = async () => {
  const properties: Property[] = await fetchProperties();

  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, 5).map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
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
