"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { Property } from "@/models/Property";
import PropertyCard from "@/components/PropertyCard";
import { HiHomeModern } from "react-icons/hi2";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  const searchParams = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const propertyType = searchParams.get("propertyType") ?? "All";

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/properties/search?location=${encodeURIComponent(
            location
          )}&propertyType=${encodeURIComponent(propertyType)}`
        );

        if (response.ok) {
          const data = await response.json();
          setProperties((_) => data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResult();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      {isLoading ? (
        <Loading />
      ) : (
        <section className="px-4 py-6 dark:bg-white">
          <div className="flex items-center justify-start mb-4 px-10">
            <Link
              href={"/properties"}
              className="text-center text-zinc-900 font-extralight flex items-center justify-start gap-4 px-6 py-2"
            >
              <BiArrowBack />
              Back to properties
            </Link>
          </div>

          <h1 className="text-2xl text-center text-zinc-800 font-semibold mb-4">
            Search Result{properties.length > 1 ? "s" : ""}
          </h1>

          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (
              <div className="h-[70vh] border-2 border-slate-300 flex flex-col items-center justify-center rounded-md">
                <HiHomeModern className="md:size-60" />
                <p className="text-zinc-800 text-2xl font-light text-center">
                  No search results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id.toString()}
                    property={property}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
