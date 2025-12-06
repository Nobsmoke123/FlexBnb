"use client";

import { Property } from "@/models/Property";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import PropertyCard from "@/components/PropertyCard";
import { HiHomeModern } from "react-icons/hi2";

const SavedProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/bookmarks");

        if (response.ok) {
          const properties = await response.json();
          setProperties(() => properties);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-4 py-6 dark:bg-white">
      <h1 className="text-2xl text-center text-zinc-800 font-semibold mb-4">
        Saved Properties
      </h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div className="h-[70vh] border-2 border-slate-300 flex flex-col items-center justify-center rounded-md">
            <HiHomeModern className="md:size-60" />
            <p className="text-zinc-800 text-2xl font-light text-center">
              No saved properties.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
