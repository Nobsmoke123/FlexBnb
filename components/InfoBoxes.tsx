import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            backgroundColor="bg-gray-100"
            textColor="text-zinc-900"
            heading="For Renters"
            buttonInfo={{
              backgroundColor: "bg-black",
              link: "/properties",
              text: "Browse Properties",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>

          <InfoBox
            backgroundColor="bg-blue-100"
            textColor="text-zinc-900"
            heading="For Property Owners"
            buttonInfo={{
              text: " Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as a shortlet
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
