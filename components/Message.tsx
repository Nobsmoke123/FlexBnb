import type { PopulatedMessage } from "@/app/types/PopulatedMessage";
import Link from "next/link";

const Message: React.FC<{ message: PopulatedMessage }> = ({ message }) => {
  console.log("The message is: ", message);
  return (
    <div className="">
      <div className="relative bg-white p-4 rounded-md shadow-sm border border-stone-300">
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
          <button className="bg-zinc-700 hover:bg-blue-500 text-white py-2 px-4 rounded-sm">
            Mark As Read
          </button>
          <button className=" bg-zinc-700 hover:bg-red-500 text-white py-2 px-4 rounded-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
