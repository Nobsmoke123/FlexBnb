"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Create context
const MessageContext = createContext<{
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}>({ count: 0, setCount: () => {} });

// Create provider
export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const res = await fetch("/api/messages/unread");
        if (res.ok) {
          const data = await res.json();
          setCount(data);
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchUnreadMessagesCount();
  }, []);

  return (
    <MessageContext.Provider value={{ count, setCount }}>
      {children}
    </MessageContext.Provider>
  );
};

// Export custom hook to access context.
export const useMessageContext = () => {
  return useContext(MessageContext);
};
