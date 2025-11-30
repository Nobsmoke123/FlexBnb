import connectDB from "@/config/database";

export const GET = async (request) => {
  try {
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
