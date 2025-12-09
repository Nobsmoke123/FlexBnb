"use client";

import { Property } from "@/models/Property";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const PropertyContactForm: React.FC<{ property: Property }> = ({
  property,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const userId = session?.user.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      toast.error("You need to sign in to send a message.");
      return;
    }

    if (userId.toString() === property.owner.toString()) {
      toast.error("You can not send a message to yourself.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          property: property._id,
          receiver: property.owner,
        }),
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        toast.error(errorMessage.message);
        return;
      }

      setFormData(() => ({ name: "", email: "", phone: "", message: "" }));

      toast.success("Message sent successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl text-center text-zinc-900 font-semibold mb-6">
        Contact Property Manager
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            className="bg-zinc-800 hover:bg-zinc-600 text-white font-extralight py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-4"
            type="submit"
          >
            <FaPaperPlane />
            <span>{isLoading ? "Sending..." : "Send Message"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
