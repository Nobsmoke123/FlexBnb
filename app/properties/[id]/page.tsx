"use client";

import { amenitiesIconMapper } from "@/app/types/AmenitiesIconMapper";
import { amenitiesMapper, AmenityKey } from "@/app/types/PropertyAddFormTypes";
import { fetchProperty } from "@/app/utils/requests";
import Loading from "@/components/Loading";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { Property } from "@/models/Property";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaBath, FaBed, FaCheck, FaHome } from "react-icons/fa";
import { FaLocationPin, FaRegCalendarXmark } from "react-icons/fa6";

const PropertyPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [property, setProperty] = useState<Property | null>(null);

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
  }, [id]);

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
              <main className="grow-2">
                <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                  <h1 className="text-zinc-800 font-extralight mb-4">
                    {property.type}
                  </h1>

                  <h1 className="text-3xl text-zinc-900 font-semibold mb-4">
                    {property.name}
                  </h1>

                  <div className="text-gray-500 mb-4 flex items-center gap-2 justify-center md:justify-start">
                    <FaLocationPin className="text-red-500 text-xl" />
                    <p className="text-slate-700 text-left">
                      {property.location.street}, {property.location.city},{" "}
                      {property.location.state}, {property.location.zipcode}.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold my-6 rounded-md bg-gray-800 text-white p-2">
                    Rates & Options
                  </h3>

                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                      <h2 className="text-zinc-700 text-base mr-2 font-extralight">
                        Nightly
                      </h2>

                      {property.rates.nightly ? (
                        <div className="text-xl font-semibold text-zinc-800">
                          ${property.rates.nightly}
                        </div>
                      ) : (
                        <div className="text-xl font-bold">
                          <FaRegCalendarXmark className="text-zinc-700" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                      <div className="text-zinc-700 text-base mr-2 font-extralight">
                        Weekly
                      </div>

                      {property.rates.weekly ? (
                        <div className="text-xl font-semibold text-zinc-800">
                          ${property.rates.weekly}
                        </div>
                      ) : (
                        <div className="text-xl font-bold">
                          <FaRegCalendarXmark className="text-zinc-700" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                      <div className="text-zinc-700 text-base mr-2 font-extralight">
                        Monthly
                      </div>

                      {property.rates.monthly ? (
                        <div className="text-xl font-semibold text-zinc-800">
                          ${property.rates.monthly}
                        </div>
                      ) : (
                        <div className="text-xl font-bold">
                          <FaRegCalendarXmark className="text-zinc-700" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-lg text-zinc-900 font-semibold mb-6">
                    Description & Details
                  </h3>

                  <div className="flex justify-between gap-4 text-blue-500 mb-4 text-xl space-x-9">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <FaBed className="text-zinc-900" />
                      <span className="hidden sm:inline text-zinc-700 text-base text-center">
                        {property.beds} Beds
                      </span>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <FaBath className="text-zinc-900" />
                      <span className="hidden sm:inline text-zinc-700 text-base text-center">
                        {property.baths} Baths
                      </span>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <FaHome className="text-zinc-900" />
                      <span className="hidden sm:inline text-zinc-700 text-base text-center">
                        {property.square_feet} Sqft
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-700 mb-4 text-base text-start">
                    {property.description}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-lg font-semibold mb-6">Amenities</h3>

                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
                    {property.amenities.map(
                      (amenity: string, index: number) => (
                        <li
                          className="text-base flex gap-2 items-center"
                          key={`${amenity}-${index}`}
                        >
                          {/* <FaCheck className="text-green-800" /> */}
                          {/* {amenity} */}
                          {amenitiesIconMapper[amenity as AmenityKey]?.icon ?? (
                            <FaCheck className="text-green-800" />
                          )}
                          <span className="text-sm">
                            {amenitiesMapper[amenity as AmenityKey]?.text ??
                              amenity}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div id="map"></div>
                </div>
              </main>

              {/* <!-- Sidebar --> */}
              <aside className="space-y-4">
                <button className="bg-zinc-700 hover:bg-blue-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center">
                  <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                </button>
                <button className="bg-slate-700 hover:bg-orange-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center">
                  <i className="fas fa-share mr-2"></i> Share Property
                </button>

                {/* <!-- Contact Form --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl text-zinc-900 font-semibold mb-6">
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
      </>
    )
  );
};

export default PropertyPage;
