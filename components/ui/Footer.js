import Head from "next/head";
import Image from "next/image";
import sparks from "../../assets/sparks.png";

const Footer = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="row flex flex-wrap items-center justify-between   mx-1 p-4">
        <a
          className="btn btn-primary mr-3 "
          href="https://airtable.com/shrTenIx1eiMT0UCB"
          target="_blank"
        >
          <div className=" heading-fancy feedback">Give Feedback</div>
        </a>
        <a href="https://www.buymeacoffee.com/nelsongc" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            width={125}
            height={50}
            alt="Buy Me A Coffee"
          />
        </a>
      </div>
    </nav>
  );
};

export default Footer;
