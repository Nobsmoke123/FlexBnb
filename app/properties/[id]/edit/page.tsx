"use client";
import { useState, useEffect } from "react";
import { fetchProperty } from "@/app/utils/requests";
import { useParams } from "next/navigation";

import PropertyEditForm from "@/components/PropertyEditForm";
import { Property } from "@/models/Property";
import Loading from "@/components/Loading";

const EditPropertyPage = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);
        const property = await fetchProperty(id!.toString());
        setProperty((_) => property);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  return (
    <section className="bg-white dark:bg-white">
      <div className="container m-auto max-w-2xl py-20">
        <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-md border border-slate-200 m-4 md:m-0">
          {isLoading && <Loading />}
          {property !== null && <PropertyEditForm property={property} />}
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
