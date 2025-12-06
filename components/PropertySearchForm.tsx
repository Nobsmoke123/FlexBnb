"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PropertySearchForm = () => {
  const [locationInput, setLocationInput] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput(event.target.value);
  };

  const handleSelectInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPropertyType(event.target.value);
  };

  const handleFormSubmission = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (locationInput === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${encodeURIComponent(
        locationInput
      )}&propertyType=${encodeURIComponent(propertyType)}`;
      router.push(`/properties/searchResults${query}`);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={locationInput}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-white font-light text-base text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter Keywords or Location (City, State, Zip, etc)"
        />
      </div>

      {/* Property Type */}
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          name="type"
          value={propertyType}
          onChange={handleSelectInputChange}
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 text-base font-light focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button className="text-white text-base font-bold md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-7 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
