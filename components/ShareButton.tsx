import { Property } from "@/models/Property";
import { BiShare } from "react-icons/bi";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  TelegramIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const ShareButton: React.FC<{ property: Property }> = ({ property }) => {
  const shareUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
  }/properties/${property._id.toString()}`;
  return (
    <>
      <button className="bg-slate-700  text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center gap-2">
        <BiShare />
        <span>Share this property</span>
      </button>

      <div className="flex gap-3 justify-center">
        <FacebookShareButton
          url={shareUrl}
          title={property.name}
          content={property.description}
          hashtag={`#${property.type}ForRent`}
          
        >
          <FacebookIcon className="size-10 rounded-full" />
        </FacebookShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={property.name}
          content={property.description}
        >
          <TelegramIcon className="size-10 rounded-full" />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          content={property.description}
        >
          <WhatsappIcon className="size-10 rounded-full" />
        </WhatsappShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          content={property.description}
        >
          <TwitterIcon className="size-10 rounded-full" />
        </TwitterShareButton>

        <EmailShareButton
          url={shareUrl}
          about={property.name}
          content={property.description}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon className="size-10 rounded-full" />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
