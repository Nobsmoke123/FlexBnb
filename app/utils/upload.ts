export const uploadImage = async (file: File) => {
  const result = await fetch(`${process.env.NEXTAUTH_URL}/api/cloudinary`);
  const sig = await result.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", sig.timestamp);
  formData.append("signature", sig.signature);
  formData.append("folder", "propertypulse");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudname}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};
