"use client";

import { fetchProperty } from "@/app/utils/requests";
import BookmarkButton from "@/components/BookmarkButton";
import Loading from "@/components/Loading";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButton from "@/components/ShareButton";
import { Property } from "@/models/Property";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const PropertyPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [property, setProperty] = useState<Property | null>(null);
  const queryParms = useSearchParams();
  const toastMessage = queryParms.get("toast");

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);

        const res = await fetchProperty(id!.toString());

        setProperty((prev) => ({ ...prev, ...res }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();

    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [id, toastMessage]);

  return isLoading ? (
    <Loading />
  ) : (
    property !== null && (
      <>
        <PropertyHeaderImage image={property?.images[0]} />
        <section className="dark:bg-white">
          <div className="container m-auto py-6 px-6">
            <Link
              href={"/properties"}
              className="text-center text-zinc-900 font-extralight flex items-center justify-start gap-4 px-6 py-2"
            >
              <BiArrowBack />
              Back to properties
            </Link>
          </div>
        </section>

        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-center items-start w-full gap-6">
              {!isLoading && <PropertyDetails property={property} />}

              {/* <!-- Sidebar --> */}
              <aside className="md:basis-xs space-y-4">
                <BookmarkButton property={property} />

                <ShareButton property={property} />

                {/* <!-- Contact Form --> */}
                <PropertyContactForm property={property} />
              </aside>
            </div>
          </div>
        </section>
        <PropertyImages images={property.images} />
      </>
    )
  );
};

export default PropertyPage;
