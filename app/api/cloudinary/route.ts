import cloudinary from "@/config/cloudinary";

export const GET = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "propertypulse",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return new Response(
    JSON.stringify({
      timestamp,
      signature,
      cloudname: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
    }),
    {
      status: 200,
    }
  );
};
