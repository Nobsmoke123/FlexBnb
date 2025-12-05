"use client";

import { fetchProperty } from "@/app/utils/requests";
import Loading from "@/components/Loading";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
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
        <section>
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
                <button className="bg-zinc-700 hover:bg-blue-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center">
                  <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                </button>
                <button className="bg-slate-700 hover:bg-orange-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center">
                  <i className="fas fa-share mr-2"></i> Share Property
                </button>

                {/* <!-- Contact Form --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl text-center text-zinc-900 font-semibold mb-6">
                    Contact Property Manager
                  </h3>
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                      >
                        Phone:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                      >
                        Message:
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className="bg-zinc-800 hover:bg-zinc-600 text-white font-extralight py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                        type="submit"
                      >
                        <i className="fas fa-paper-plane mr-2"></i> Send Message
                      </button>
                    </div>
                  </form>
                </div>
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
