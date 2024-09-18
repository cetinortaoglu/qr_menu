import React from "react";
import LogoFastrest from "./LogoFastrest";

export default function Footer({ account }) {
 /* const getDomainName = (url) => {
    if (!url) return "";

    try {
      const domain = new URL(url).hostname;
      return domain.startsWith("www.") ? domain.substring(4) : domain;
    } catch (error) {
      console.error("Invalid URL:", error);
      return "";
    }
  }; */
  return (
    <div className="flex-row justify-center align-middle mx-auto mt-16 max-w-full px-12 py-6 sm:mt-32 lg:px-8">
      {/**   <div className="mb-24">
        <div className="mx-auto mb-2 max-w-4xl text-center">
          <h1 className="text-base font-bold leading-7 text-black">
            Görüşlerinizi Bize Bildirin
          </h1>
          <p className="mt-2 text-sm tracking-tight text-gray-500">
            Görüşlerinizi, dileklerinizi ve şikayetlerinizi iletmeniz bizim için
            çok önemli.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-hm-Normal-active hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
        >
          Ankete Katıl
        </button>
      </div> */}
      <div className="flex justify-center align-middle mb-4">
        <LogoFastrest />
      </div>
      <div className="mt-4 gap-y-2">
        <div className="mx-auto mb-2 max-w-4xl text-center">
          <h1 className="text-base font-bold leading-7 text-black">
            {account?.owner_info?.name}
          </h1>
          <a
            href={account?.owner_info?.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm tracking-tight text-gray-500 cursor-pointer hover:underline"
          >
            {account?.owner_info?.website}
          </a>

          <br />
          <a
            className="mt-2 text-sm tracking-tight text-gray-500 hover:underline"
            href={`tel:${account?.owner_info?.phone}`}
          >
            {account?.owner_info?.phone}
          </a>

          <div className="flex justify-center align-middle">
            <p className="mt-2 text-sm text-gray-500">
              Powered by<span className="font-semibold"> Begüm Yazılım</span>{" "}
              <span className="">&copy; 2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
