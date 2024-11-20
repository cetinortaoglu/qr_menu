"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function Header({ categories, handleImageCardClick, account }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedGroup, setClickedGroup] = useState(null);
  const [openContact, setOpenContact] = useState(false);
  const theme = useSelector(({ account }) => account.theme);

  //  const categories = useSelector(({ product }) => product.categories);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenContact(false);
  };

  const groupClickedHandler = (event) => {
    setIsClicked(!isClicked);
    setClickedGroup(event);
  };

  const shortenAccountName = (name) => {
    if (name && name.length > 25) {
      return name.substring(0, 25) + "...";
    }
    return name;
  };

  return (
    <div 
    //className={`${isOpen ? "bg-white" : "bg-hm-Light"}`}  
    style={{
      color:
        theme?.website
          ?.fontColor,
      fontSize:
        `${theme?.website
          ?.fontSize}px`,
      fontFamily:
        theme?.website
          ?.fontStyle,
      backgroundColor:
        theme?.website
          ?.bgColor,
    }}  >
      <div className="py-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className=""></div>
        <div className="">
          <div className="flex items-center sm:py-8 md:py-4 lg:py-4 xl:py-4">
            <div className="flex-shrink-0 justify-center">
              <div className="flex flex-col items-center pl-14">
                <a className="cursor-pointer">
                  <Image
                    width={theme?.header?.image?.width ? theme?.header?.image?.width : "86"}
                    height={theme?.header?.image?.height ? theme?.header?.image?.height : "64"}
                    src={account?.brand_logo}
                    alt={`logo`}
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>

            {/** <div>
              <h3 className="text-base font-bold leading-6 text-gray-900">
                <a href="/" className="cursor-pointer">
                  {" "}
                  HAPPY MOON'S
                </a>
              </h3>
              <p className="text-sm text-gray-500">
                <a href="#">SAKARYA</a>
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex flex-shrink-0">
          <nav className="pr-4">
            <div className="flex items-center justify-between gap-x-2">
              {
                //!isOpen && <div className="text-hm-Normal">Menu</div>
              }
              {/**  <button
                onClick={toggleMenu}
                className="text-hm-Normal focus:outline-none hidden lg:block"
              >
                {isOpen ? (
                  // Açık durumda çarpı işareti
                  <Bars3Icon
                    className="inline-flex w-6 h-6"
                    aria-hidden="true"
                  />
                ) : (
                  // Kapalı durumda hamburger ikonu
                  <XMarkIcon
                    className="inline-flex w-8 h-8"
                    aria-hidden="true"
                  />
                )}
              </button> */}
              <button
                onClick={toggleMenu}
                className="text-hm-Normal focus:outline-none"
              >
                {isOpen ? (
                  // Açık durumda çarpı işareti
                  <XMarkIcon
                    className="inline-flex w-8 h-8"
                    aria-hidden="true"
                  />
                ) : (
                  // Kapalı durumda hamburger ikonu
                  <Bars3Icon
                    className="inline-flex w-8 h-8"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>
      <h3 className="text-base font-bold leading-6 text-gray-900 text-center">
        <a href="#" className="cursor-pointer" 
         style={{
          color:
            theme?.website
              ?.fontColor,
          fontSize:
            `${theme?.website
              ?.fontSize}px`,
          fontFamily:
            theme?.website
              ?.fontStyle,
          backgroundColor:
            theme?.website
              ?.bgColor,
        }}  
        >
          {shortenAccountName(account?.account_name)}
        </a>
      </h3>
      {isOpen && (
        <div className="relative">
          {/* Ana içerik */}
          <div className="overflow-y-auto max-h-[500px] mb-4">
            <div
              className={"bg-gray-100"}
              onClick={() => setOpenContact(!openContact)}
            >
              <div className="my-4 block items-center justify-end">
                <a
                  href="#"
                  className="text-right text-hm-Light py-4 px-4 bg-hm-Normal flex items-center justify-end gap-4"
                >
                  {openContact === true ? (
                    <ChevronUpIcon className="w-6 h-6 ml-2" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 ml-2" />
                  )}
                  İletişim Bilgileri
                </a>
              </div>
            </div>
            {openContact === true && (
              <div className="max-w-sm mx-auto bg-hm-Light shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PlusIcon
                        className="inline-flex w-6 h-6 text-hm-Normal"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {account?.account_info?.account_name}
                      </p>
                      {/**
                       <p className="text-sm font-normal text-gray-600">
                        İletişime geçmek için aşağıdaki bilgileri
                        kullanabilirsiniz.
                      </p>
                       */}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <MapPinIcon
                          className="inline-flex w-6 h-6 text-hm-Normal"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-normal text-gray-600">
                          Adres:
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {account?.account_info?.district_name +
                            " " +
                            account?.account_info?.address_info +
                            " " +
                            account?.account_info?.city_name +
                            " / " +
                            account?.account_info?.country_name}
                        </p>
                      </div>
                    </div>
                    {account?.account_info?.phone?.length > 0 && (
                      <div className="flex items-center mt-3">
                        <div className="flex-shrink-0">
                          <PhoneIcon
                            className="inline-flex w-6 h-6 text-hm-Normal"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-normal text-gray-600">
                            Telefon:
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {account?.account_info?.phone}
                          </p>
                        </div>
                      </div>
                    )}
                    {account?.account_info?.mail?.length > 0 && (
                      <div className="flex items-center mt-3">
                        <div className="flex-shrink-0">
                          <EnvelopeIcon
                            className="inline-flex w-6 h-6 text-hm-Normal"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-normal text-gray-600">
                            E-posta:
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {account?.account_info?.mail}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* İçerik 500 pikselden daha uzunsa kaydırma çubuğu görünür olacak */}
            {categories.length > 0 &&
              categories?.map((category, catIndex) => (
                <React.Fragment key={category?.id}>
                  {category?.alt_gruplar?.length > 0 ? (
                    <>
                      <div
                        key={category?.id}
                        className={
                          catIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }
                        onClick={() => groupClickedHandler(category?.id)}
                      >
                        <div className="my-4 block items-center justify-end">
                          <a
                            href="#"
                            className="text-right text-hm-Normal py-4 px-4 bg-hm-Light flex items-center justify-end gap-4"
                          >
                            {clickedGroup === category?.id && isClicked ? (
                              <ChevronUpIcon className="w-6 h-6 ml-2" />
                            ) : (
                              <ChevronDownIcon className="w-6 h-6 ml-2" />
                            )}
                            {category?.adi?.toUpperCase()}{" "}
                            {/* İkonunuzun boyutunu ve margin'ini ayarlayın */}
                          </a>
                        </div>
                      </div>
                      {clickedGroup === category?.id &&
                        isClicked &&
                        category?.alt_gruplar.map((altGrup) => (
                          <div
                            key={altGrup?.id}
                            className="pr-2 mb-2 bg-hm-Normal"
                          >
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleImageCardClick(category?.id);
                              }}
                              className="block text-right text-hm-Light py-2 px-2 bg-hm-Normal"
                            >
                              {altGrup?.adi?.toUpperCase()}
                            </a>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div
                      key={category?.id}
                      className={
                        catIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }
                    >
                      <div className="my-4">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageCardClick(
                              category?.id
                            );
                          }}
                          className="block text-right text-hm-Normal py-2 px-2 bg-hm-Light"
                        >
                          {category?.adi?.toUpperCase()}
                        </a>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 *    {isOpen && (
        <div className="overflow-y-auto max-h-[500px] mb-16">
          {" "} 
          <>
            {categories.length > 0 &&
              categories?.map((category, catIndex) => (
                <React.Fragment key={category?.id}>
                  {category?.alt_gruplar?.length > 0 ? (
                    <>
                      <div
                        key={category?.id}
                        className={
                          catIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }
                        onClick={() => groupClickedHandler(category?.id)}
                      >
                        <div className="my-4 block items-center justify-end">
                          <a
                            href="#"
                            className="text-right text-hm-Normal py-4 px-4 bg-hm-Light flex items-center justify-end gap-4"
                          >
                            {clickedGroup === category?.id && isClicked ? (
                              <ChevronUpIcon className="w-6 h-6 ml-2" />
                            ) : (
                              <ChevronDownIcon className="w-6 h-6 ml-2" />
                            )}
                            {category?.adi?.toUpperCase()}{" "} 
                          </a>
                        </div>
                      </div>
                      {clickedGroup === category?.id &&
                        isClicked &&
                        category?.alt_gruplar.map((altGrup) => (
                          <div
                            key={altGrup?.id}
                            className="px-16 mb-5 bg-hm-light"
                          >
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleImageCardClick(altGrup?.id);
                              }}
                              className="block text-right text-hm-Normal py-4 px-4 bg-hm-Light"
                            >
                              {altGrup?.adi?.toUpperCase()}
                            </a>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div
                      key={category?.id}
                      className={
                        catIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }
                    >
                      <div className="my-4">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageCardClick(
                              category?.adi + category?.id + catIndex
                            );
                          }}
                          className="block text-right text-hm-Normal py-4 px-4 bg-hm-Light"
                        >
                          {category?.adi?.toUpperCase()}
                        </a>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </>
        </div>
      )}
 * 
 * 
 * 
 * 
 */
