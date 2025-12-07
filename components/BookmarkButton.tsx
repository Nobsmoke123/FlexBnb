"use client";

import { Property } from "@/models/Property";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { BiBookmarkMinus, BiBookmarkPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const BookmarkButton: React.FC<{ property: Property }> = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const bookmarkProperty: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/bookmarks`, {
        method: "POST",
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (!response.ok) {
        toast.error("Property bookmark failed.");
        return;
      }

      const data = await (response.json() as Promise<{
        status: boolean;
        message: string;
      }>);

      if (data.status) {
        toast.success(data.message);
        setBookmarked(true);
      } else {
        toast.success(data.message);
        setBookmarked(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Property bookmark failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch("/api/bookmarks/check", {
          method: "POST",
          body: JSON.stringify({ propertyId: property._id.toString() }),
        });

        if (response.ok) {
          const data = (await response.json()) as boolean;
          setBookmarked(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBookmarkStatus();
  }, []);

  return (
    <button
      onClick={bookmarkProperty}
      className="bg-zinc-700 hover:bg-blue-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center gap-2"
    >
      {bookmarked ? <BiBookmarkMinus /> : <BiBookmarkPlus />}

      <span>
        {isLoading
          ? "Loading..."
          : bookmarked
          ? "Remove Bookmark"
          : "Bookmark Property"}
      </span>
    </button>
  );
};

export default BookmarkButton;
