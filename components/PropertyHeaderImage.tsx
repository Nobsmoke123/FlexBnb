import Image from "next/image";

const PropertyHeaderImage: React.FC<{ image: string }> = ({ image }) => {
  return (
    <section className="container-xl m-auto">
      <div className="grid grid-cols-1">
        <Image
          src={`/images/properties/${image}`}
          alt="property-image-header"
          className="object-cover h-[45vh] w-[100vw]"
          width={0}
          height={0}
          loading="eager"
          sizes="100vw"
          priority={true}
        />
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
