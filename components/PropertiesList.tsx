"use client";

import { fetchProperties } from "@/app/utils/requests";
import { Property } from "@/models/Property";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Loading from "./Loading";

const PropertiesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProperties();
        setProperties(() => data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-4 py-6 dark:bg-white">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id.toString()} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesList;
