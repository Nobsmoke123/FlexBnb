"use client";

import type { PopulatedMessage } from "@/app/types/PopulatedMessage";
import { useMessageContext } from "@/context/MessageContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Message: React.FC<{ message: PopulatedMessage }> = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [_isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setCount } = useMessageContext();

  const handleMarkAsRead = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();

        setCount((prev) => (data ? prev - 1 : prev + 1));

        setIsRead(() => !isRead);

        if (data) {
          toast.success("Message marked as read.");
        } else {
          toast.success("Message marked as new.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsDeleted(() => true);
        setCount((prev) => prev - 1);
        toast.success("Message deleted successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="">
      <div className="relative bg-white p-4 rounded-md shadow-sm border border-stone-300">
        {!isRead && (
          <div className="absolute size-2 rounded-full bg-green-700 right-2 top-2 animate-bounce"></div>
        )}

        <h2 className="text-xl mb-4 flex gap-2">
          <span className="font-semibold">Property Inquiry:</span>
          <span>{message.property.name}</span>
        </h2>

        <p className="text-gray-700">{message.message}</p>

        <ul className="mt-4">
          <li className="flex gap-2">
            <span className="text-zinc-700 font-semibold text-md">Name:</span>
            <span className="text-zinc-700 font-semibold text-md">
              {message.name}
            </span>
          </li>

          <li>
            <div className="flex gap-2">
              <span className="text-zinc-700 font-semibold text-md">
                Reply Email:
              </span>
              <Link href={`mailto:${message.email}`} className="text-blue-500">
                {message.email}
              </Link>
            </div>
          </li>

          <li>
            <div className="flex gap-2">
              <span className="text-zinc-700 font-semibold text-md">
                Phone:
              </span>
              <Link href={`tel:${message.phone}`} className="text-blue-500">
                {message.phone}
              </Link>
            </div>
          </li>

          <li>
            <strong>Received:</strong>{" "}
            {new Date(message.createdAt).toLocaleTimeString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
        </ul>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleMarkAsRead}
            className="bg-zinc-700 hover:bg-blue-500 text-white py-2 px-4 rounded-sm"
          >
            {"Mark As Read"}
          </button>
          <button
            onClick={handleDeleteMessage}
            className=" bg-zinc-700 hover:bg-red-500 text-white py-2 px-4 rounded-sm"
          >
            {"Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
