import { toast } from "react-toastify";

const Pagination: React.FC<{
  total: number;
  currentPage: number;
  pageSize: number;
  handler: (val: number) => void;
}> = ({ total, currentPage, pageSize, handler }) => {
  const pages = Math.ceil(total / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <div className="flex justify-center items-center gap-2">
        <button
          className="px-2 py-1 rounded-sm bg-zinc-700 text-white tracking-wider"
          onClick={() => {
            if (currentPage > 1) {
              handler(currentPage - 1);
            } else {
              toast.info("This is the beginning.");
            }
          }}
        >
          Previous
        </button>

        {[...Array.from({ length: pages }, (_, i) => i + 1)].map(
          (value, index) => (
            <button
              key={`buttton_${index}`}
              onClick={() => handler(value)}
              className={`${
                value === currentPage ? "border-2 border-blue-500" : ""
              } px-3 py-1 rounded-sm bg-zinc-700 text-white`}
            >
              {value}
            </button>
          )
        )}

        <button
          className="px-3 py-1 rounded-sm bg-zinc-700 text-white tracking-wider"
          onClick={() => {
            if (currentPage < pages) {
              handler(currentPage + 1);
            } else {
              toast.info("No more properties.");
            }
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
