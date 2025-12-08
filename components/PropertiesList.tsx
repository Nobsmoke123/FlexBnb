"use client";

import { fetchProperties } from "@/app/utils/requests";
import { Property } from "@/models/Property";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

const PropertiesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProperties(page, pageSize);
        setProperties(() => data.properties);
        setTotal(() => data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [page, pageSize]);

  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handlePageChange = (value: number) => {
    setPage(() => value);
  };

  console.log(
    "The page is: ",
    page,
    " the pageSize is: ",
    pageSize,
    " The total is: ",
    total
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="px-4 py-6 dark:bg-white">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
            ))}
          </div>
        </div>
      </section>

      <Pagination
        total={total}
        pageSize={pageSize}
        handler={handlePageChange}
        currentPage={page}
      />
    </>
  );
};

export default PropertiesList;
