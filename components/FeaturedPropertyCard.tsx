import { getRateDisplay } from "@/app/utils/currencyDisplay";
import type { Property } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaHome, FaMoneyBill } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const FeaturedPropertyCard: React.FC<{ property: Property }> = ({
  property,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-[250px] md:w-[500px] shrink-0 relative border-2 border-stone-300 rounded-lg shadow-xl">
      <Image
        src={property.images[0]}
        alt={`${property.name}-image`}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto md:w-1/3"
      />

      <div className="flex flex-col justify-around flex-1 p-4">
        <p className="text-xl md:text-2xl text-zinc-800 font-semibold">
          {property.name}
        </p>

        <p className="text-base text-zinc-800 font-light">{property.type}</p>

        <p className="text-sm absolute bg-white px-1 py-1 rounded-xl text-blue-600 font-semibold top-2 left-2">
          ${getRateDisplay(property.rates)}
        </p>

        <div className="mt-2 flex justify-between items-center text-sm text-zinc-700">
          <div className="flex flex-col items-center justify-center">
            <FaBed />
            <span className="text-sm font-semibold">{property.beds} Beds</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaBath />
            <span className="text-sm font-semibold">
              {property.baths} Baths
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaHome />
            <span className="text-sm font-semibold">
              {property.square_feet} sqft
            </span>
          </div>
        </div>

        <div className="hidden md:flex text-sm md:text-base font-light justify-between mt-4">
          {property.rates?.nightly && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-1">
              <FaMoneyBill className="text-zinc-800 text-sm" />
              <p>Nightly</p>
            </div>
          )}

          {property.rates?.weekly && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-1">
              <FaMoneyBill className="text-zinc-800 text-sm" />
              <p>Weekly</p>
            </div>
          )}

          {property.rates?.monthly && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-1">
              <FaMoneyBill className="text-zinc-800 text-sm" />
              <p>Monthly</p>
            </div>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-sm md:text-base text-orange-700" />
            <span className="text-orange-700 text-sm md:text-base">
              {property.location.city}
              {` `}
              {property.location.state}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-zinc-600 hover:bg-zinc-800 font-semibold text-white px-4 py-2 rounded-sm text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
