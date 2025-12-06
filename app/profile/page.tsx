"use client";

import Image from "next/image";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Property } from "@/models/Property";
import Loading from "@/components/Loading";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profileImage = session?.user.image;
  const email = session?.user.email;
  const username = session?.user.name;

  useEffect(() => {
    const fetchUserListings = async (userId: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/properties/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to load user properties.");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserListings(session.user.id!);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "delete",
      });

      if (res.ok) {
        const updatedProperties = properties.filter(
          (property) => property._id.toString() !== propertyId
        );
        setProperties((_) => updatedProperties);
        toast.success("Property deleted successfully.");
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-slate-200 m-4 md:m-0">
          <h1 className="text-4xl font-light text-center text-zinc-600 mb-4">
            Your Profile
          </h1>
          <hr className="h-1 mb-4 text-stone-300" />
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="size-20 md:size-30 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  width={50}
                  height={50}
                  sizes="100vw"
                />
              </div>

              <h2 className="text-xl mb-4">
                <span className="font-light block">Name: </span>
                {username}
              </h2>
              <h2 className="text-xl">
                <span className="font-light block">Email: </span>
                {email}
              </h2>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl text-zinc-700 font-semibold mb-4 text-center">
                  Your Listings
                </h2>

                {!isLoading && properties.length === 0 && (
                  <p className="text-zinc-700 font-bold">
                    You have no listing.
                  </p>
                )}

                {!isLoading &&
                  properties.length > 0 &&
                  properties.map((property) => (
                    <div key={property._id.toString()} className="mb-10">
                      <Link href={`/properties/${property._id.toString()}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property 1"
                          width={0}
                          height={0}
                          loading="eager"
                          sizes="100vw"
                        />
                      </Link>

                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <div className="flex items-center gap-2">
                          <FaLocationDot className="text-red-500" />
                          <p className="text-zinc-600 text-base font-light">
                            {property.location.street} {property.location.city}{" "}
                            {property.location.state},{" "}
                            {property.location.zipcode}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex gap-3">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="bg-zinc-800 text-white px-6 py-2 rounded-sm hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-zinc-800 text-white px-6 py-2 rounded-sm hover:bg-red-600"
                          type="button"
                          onClick={() =>
                            handleDeleteProperty(property._id.toString())
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
