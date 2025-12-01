import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className="w-[100vw] h-[100vh] flex justify-center items-center px-6 py-4">
      <GridLoader
        color="#1e67e5"
        loading={true}
        size={20}
        aria-label="Loading Spinner"
      />
    </section>
  );
};

export default Loading;
