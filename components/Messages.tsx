"use client";

import { PopulatedMessage } from "@/app/types/PopulatedMessage";
import { useState, useEffect } from "react";
import { TbMessagesOff } from "react-icons/tb";

import Loading from "./Loading";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState<PopulatedMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/messages");

        if (res.ok) {
          const data = await res.json();
          setMessages(() => data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-slate-300 m-4 md:m-0">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Your Messages
          </h1>

          {!isLoading && messages.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-4">
              <TbMessagesOff className="size-30 font-light" />
              <p className="font-light text-lg text-zinc-700">
                {" "}
                You have no messages.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {!isLoading &&
              messages.length > 0 &&
              messages.map((message) => (
                <Message key={message._id.toString()} message={message} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
