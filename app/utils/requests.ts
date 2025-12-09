import { Property } from "@/models/Property";

 const base = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000";

 export const fetchProperty = async (propertyId: string): Promise<Property> => {
   try {
     const res = await fetch(`${base}/api/properties/${propertyId}`, {
       cache: "no-cache",
     });

     if (!res.ok) {
       throw new Error("Failed to fetch properties.");
     }
     return res.json();
   } catch (error) {
     console.log(error);
     throw new Error("Failed to fetch properties.");
   }
 };

 export const fetchProperties = async ({
   page = 0,
   pageSize = 3,
   showfeatured = false,
 }) => {
   try {
     const res = await fetch(
       `${base}/api/properties${
         showfeatured ? "/featured" : ""
       }?page=${page}&pageSize=${pageSize}`
     );
     if (!res.ok) {
       throw new Error("Failed to fetch properties.");
     }

     return await res.json();
   } catch (error) {
     console.log("The error is: ", error);
     console.log(error);
     throw new Error("An error occured.", {
       cause: JSON.stringify(error),
     });
   }
 };