import { Property } from "@/models/Property";

export const fetchProperty = async (propertyId: string): Promise<Property> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${propertyId}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch properties.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch properties.");
  }
};


export const fetchProperties = async (page = 0, pageSize = 3) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties?page=${page}&pageSize=${pageSize}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch properties.");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("An error occured.", {
      cause: JSON.stringify(error),
    });
  }
};