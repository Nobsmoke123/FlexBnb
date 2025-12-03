import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertiesPage = () => {
  return (
    <section className="bg-white">
      <div className="container m-auto max-w-2xl py-20">
        <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-md border border-slate-200 m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertiesPage;
