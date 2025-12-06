import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="bg-blue-600 min-h-screen flex-grow dark:bg-white">
      <div className="container m-auto max-w-4xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border border-gray-500 m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-zinc-700" size={100} />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mt-4 mb-4">Page Not Found!</h1>
            <p className="text-zinc-700 text-xl font-extralight mb-10 text-center">
              The page you are looking for does not exist.
            </p>

            <Link
              href={"/"}
              className="bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-4 px-6 rounded-md"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NotFoundPage;
