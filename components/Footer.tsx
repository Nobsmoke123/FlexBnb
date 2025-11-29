import Image from "next/image";
import footerLogo from "@/assets/images/logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0 flex flex-col items-center justify-center">
          <Image src={footerLogo} alt="logo" className="h-8 w-auto" />
          <h1 className="text-sm font-semibold text-zinc-900">
            PropertyPulse
          </h1>
        </div>
        <div className="text-sm font-extralight flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li className="hover:font-semibold">
              <Link href="/properties">Properties</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <p className="text-sm font-extralight text-gray-900 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} PropertyPulse. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
