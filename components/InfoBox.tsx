import { InfoBoxType } from "@/app/types/infobox";

const InfoBox: React.FC<InfoBoxType> = ({
  heading,
  backgroundColor,
  textColor,
  children,
  buttonInfo: { backgroundColor: buttonBackgroundColor, link, text },
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-xl font-semibold tracking-wide ${textColor}`}>
        {heading}
      </h2>
      <p className={`mt-2 mb-4 text-base font-light ${textColor}`}>
        {children}
      </p>
      <a
        href={link}
        className={`${buttonBackgroundColor} inline-block text-white font-light text-sm rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {text}
      </a>
    </div>
  );
};

export default InfoBox;
