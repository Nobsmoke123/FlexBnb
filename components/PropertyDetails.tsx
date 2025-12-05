import { amenitiesIconMapper } from "@/app/types/AmenitiesIconMapper";
import { amenitiesMapper, AmenityKey } from "@/app/types/PropertyAddFormTypes";
import { Property } from "@/models/Property";
import { FaBath, FaBed, FaCheck, FaHome } from "react-icons/fa";
import PropertyMap from "./PropertyMap";
import { FaLocationDot, FaRegCalendarXmark } from "react-icons/fa6";

const PropertyDetails: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <main className="md:basis-5xl">
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <h1 className="text-zinc-800 font-extralight mb-4">{property.type}</h1>

        <h1 className="text-3xl text-zinc-900 font-semibold mb-4">
          {property.name}
        </h1>

        <div className="text-gray-500 mb-4 flex items-center gap-2 justify-center md:justify-start">
          <FaLocationDot className="text-red-500 text-xl" />
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
          {property.amenities.map((amenity: string, index: number) => (
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
                {amenitiesMapper[amenity as AmenityKey]?.text ?? amenity}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-md mt-6">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
