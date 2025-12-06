import { BiShare } from "react-icons/bi";

const ShareButton = () => {
  return (
    <button className="bg-slate-700 hover:bg-orange-600 text-white font-extralight w-full py-2 px-4 rounded-md flex items-center justify-center gap-2">
      <BiShare />
      <span>Share Property</span>
    </button>
  );
};

export default ShareButton;
