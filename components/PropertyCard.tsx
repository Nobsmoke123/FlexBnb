import type { PropertyCard } from "@/app/types/PropertyCard";
import Image from "next/image";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaHome,
  FaMapMarker,
  FaMoneyBill,
} from "react-icons/fa";

const PropertyCard: React.FC<{ property: PropertyCard }> = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={
          property.images[0].startsWith("http")
            ? property.images[0]
            : `/images/properties/${property.images[0]}`
        }
        alt="property-image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-zinc-900 text-base font-extralight">
            {property.type}
          </div>
          <h3 className="text-xl text-zinc-900 font-semibold">
            {property.name}
          </h3>
        </div>
        <h3 className="text-sm absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>
        <div className="flex justify-between text-gray-500 mb-4">
          <p className="flex flex-col justify-center items-center gap-1">
            <FaBed className="text-black" />
            <span className="md:hidden lg:inline text-sm text-zinc-900">
              {property.beds} Beds
            </span>
          </p>

          <p className="flex flex-col justify-center items-center gap-1">
            <FaBath className="text-black" />
            <span className="md:hidden lg:inline text-sm text-zinc-900">
              {property.baths} Baths
            </span>
          </p>

          <p className="flex flex-col justify-center items-center gap-1">
            <FaHome className="text-black" />
            <span className="md:hidden lg:inline text-sm text-zinc-900">
              {property.square_feet} sqft
            </span>
          </p>
        </div>

        <div className="flex justify-between gap-4 text-green-900 text-sm mb-4">
          {property.rates?.nightly && (
            <div className="flex justify-center items-center gap-2">
              <FaMoneyBill className="text-zinc-900 text-sm" />
              <p>Nightly</p>
            </div>
          )}

          {property.rates?.weekly && (
            <div className="flex justify-center items-center gap-2">
              <FaMoneyBill className="text-zinc-900 text-sm" />
              <p>Weekly</p>
            </div>
          )}

          {property.rates?.monthly && (
            <div className="flex justify-center items-center gap-2">
              <FaMoneyBill className="text-zinc-900 text-sm" />
              <p>Monthly</p>
            </div>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle items-center gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700" />
            <span className="text-zinc-700 text-base font-extralight">
              {property.location.city}
              {` `} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
