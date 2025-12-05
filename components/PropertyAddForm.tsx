"use client";
// import Form from "next/form";

import {
  amenitiesMapper,
  AmenityKey,
  PropertyAddFormBlankState,
  type PropertyAddForm,
} from "@/app/types/PropertyAddFormTypes";
import { useState } from "react";

const PropertyAddForm = () => {
  const [formData, setFormData] = useState<PropertyAddForm>({
    ...PropertyAddFormBlankState,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = event.target.name;
    const value = event.target.value;

    const keyValues = key.toString().split(".");

    if (keyValues.length > 1) {
      const parent = formData[keyValues[0] as keyof PropertyAddForm];

      setFormData({
        ...formData,
        [keyValues[0]]: {
          ...(typeof parent === "object" && parent !== null ? parent : {}),
          [keyValues[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  const handleAmenitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.dataset.name!;

    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: {
          ...prev.amenities[name as AmenityKey],
          value: !prev.amenities[name as AmenityKey].value,
        },
      },
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  return (
    <form action="/api/properties" method="POST" encType="multipart/form-data">
      <h2 className="text-3xl text-zinc-800 text-center font-semibold mb-6">
        Add Property
      </h2>

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Property Type
        </label>

        <select
          id="type"
          name="type"
          value={formData.type}
          className="border text-zinc-900 rounded w-full py-2 px-3"
          onChange={handleSelectChange}
          required
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Charlet">Charlet</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-zinc-800 font-semibold mb-2">
          Listing Name
        </label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border text-zinc-900 rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
          required
        ></textarea>
      </div>

      <div className="mb-4 bg-gray-50 p-1">
        <label className="block text-zinc-700 font-semibold mb-2">
          Location
        </label>
        <input
          type="text"
          id="street"
          value={formData.location.street}
          onChange={handleInputChange}
          name="location.street"
          className="border text-sm text-zinc-800 rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          required
        />
        <input
          type="text"
          id="city"
          name="location.city"
          value={formData.location.city}
          onChange={handleInputChange}
          className="border text-sm text-zinc-800 rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
        />
        <input
          type="text"
          id="state"
          name="location.state"
          value={formData.location.state}
          onChange={handleInputChange}
          className="border text-sm text-zinc-800 rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          value={formData.location.zipcode}
          onChange={handleInputChange}
          className="border text-sm text-zinc-800 rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          required
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label
            htmlFor="beds"
            className="block text-sm text-zinc-700 font-semibold mb-2"
          >
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleInputChange}
            className="border text-sm text-zinc-700 rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label
            htmlFor="baths"
            className="block text-sm text-zinc-700 font-semibold mb-2"
          >
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            value={formData.baths}
            onChange={handleInputChange}
            className="border text-sm text-zinc-700 rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-sm text-zinc-700 font-semibold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            value={formData.square_feet}
            onChange={handleInputChange}
            className="border text-sm text-zinc-700 rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-zinc-800 font-semibold mb-2">
          Amenities
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.keys(amenitiesMapper).map((amenity: string) => (
            <div className="flex items-center" key={amenity}>
              <input
                type="checkbox"
                id={amenity}
                data-name={amenity}
                name={`amenities`}
                value={formData.amenities[amenity as AmenityKey].text}
                checked={formData.amenities[amenity as AmenityKey].value}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              <label htmlFor={amenity} className="text-zinc-800 text-sm">
                {amenitiesMapper[amenity as AmenityKey]["text"]}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 bg-gray-50 p-1">
        <label className="block text-zinc-700 font-semibold mb-4">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2 text-zinc-800 text-md">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              value={formData.rates.weekly}
              onChange={handleInputChange}
              className="border rounded text-zinc-800 text-sm w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="monthly_rate"
              className="mr-2 text-zinc-800 text-md"
            >
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              value={formData.rates.monthly}
              onChange={handleInputChange}
              className="border rounded text-zinc-800 text-sm w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="nightly_rate"
              className="mr-2 text-zinc-800 text-md"
            >
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              value={formData.rates.nightly}
              onChange={handleInputChange}
              className="border rounded text-zinc-800 text-sm w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          value={formData.seller_info.name}
          onChange={handleInputChange}
          className="border text-zinc-800 rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          value={formData.seller_info.email}
          onChange={handleInputChange}
          className="border rounded text-zinc-800 w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          value={formData.seller_info.phone}
          onChange={handleInputChange}
          className="border text-zinc-800 rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="images"
          className="block text-zinc-700 font-semibold mb-2"
        >
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border text-zinc-700 rounded w-full py-2 px-3"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          required
        />
      </div>

      <div>
        <button
          className="bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-sm w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
