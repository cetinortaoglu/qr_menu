"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EggsIcon from "../public/icons/Eggs.svg";
import ProductDetailHeader from "./ProductDetailHeader";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function ProductModal({ open, setOpen, product }) {
  const cancelButtonRef = useRef(null);
  const theme = useSelector(({ account }) => account.theme);

  const formatPrice = (price) => {
    // Fiyatı binlik formata dönüştürme
    const formattedPrice = price?.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });

    // Binlik ayrımı için noktayı değiştirme
    const priceWithDot = formattedPrice?.replace(",", ".");

    return priceWithDot;
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-hm-Normal bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
               
              >
                <div
                  style={{
                    backgroundColor: theme?.selectedProduct?.modal?.bgColor,
                  }}
                >
                  <div className="text-black">
                    <ProductDetailHeader
                      product={product}
                      closeModal={() => setOpen(false)}
                    />
                    <div className="mt-4 p-6">
                      <h1
                        className="tracking-tight"
                        style={{
                          color:
                            theme?.selectedProduct?.productName
                              ?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productName
                              ?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productName
                              ?.fontStyle,
                        }}
                      >
                        {product?.product_name}
                      </h1>

                      <div className="mt-3">
                        <p className="tracking-tight"
                         style={{
                          color:
                            theme?.selectedProduct?.productPrice
                              ?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productPrice
                              ?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productPrice
                              ?.fontStyle,
                        }}
                        >
                          ₺{formatPrice(parseInt(product?.fiyat))}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className={`text-sm tracking-tight font-bold  text-black mb-4 ${!product?.icerik && "hidden"}`}   style={{
                          color:
                            theme?.selectedProduct?.productName
                              ?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productDetail
                              ?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productName
                              ?.fontStyle,
                        }}>
                          Ürün Detayları
                        </p>
                        <div
                          className="space-y-6"
                          style={{
                            color:
                              theme?.selectedProduct?.productDetail
                                ?.fontColor,
                            fontSize:
                              `${theme?.selectedProduct?.productDetail
                                ?.fontSize}px`,
                            fontFamily:
                              theme?.selectedProduct?.productDetail
                                ?.fontStyle,
                          }}  
                          dangerouslySetInnerHTML={{
                            __html: product?.icerik ? product?.icerik : "",
                          }}
                        />
                      </div>
                      <div className="mt-3">
                        <p className={`text-sm tracking-tight font-bold  text-black mb-4 ${!product?.aciklama && "hidden"}`}   style={{
                          color:
                            theme?.selectedProduct?.productName
                              ?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productDescription
                              ?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productName
                              ?.fontStyle,
                        }}>
                          Ürün Açıklama
                        </p>
                        <div
                          className="space-y-6"
                          style={{
                            color:
                              theme?.selectedProduct?.productDescription
                                ?.fontColor,
                            fontSize:
                              `${theme?.selectedProduct?.productDescription
                                ?.fontSize}px`,
                            fontFamily:
                              theme?.selectedProduct?.productDescription
                                ?.fontStyle,
                          }}  
                          dangerouslySetInnerHTML={{
                            __html: product?.aciklama ? product?.aciklama : "",
                          }}
                        />
                      </div>
                      <div className="mt-3">
                        <p className={`text-sm tracking-tight font-bold  text-black mb-4 ${!product?.alerjen && "hidden"}`}   style={{
                          color:
                            theme?.selectedProduct?.productName
                              ?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productDescription
                              ?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productName
                              ?.fontStyle,
                        }}>
                          Ürün Alerjenleri
                        </p>
                        <div
                          className="space-y-6"
                          style={{
                            color:
                              theme?.selectedProduct?.productDescription
                                ?.fontColor,
                            fontSize:
                              `${theme?.selectedProduct?.productDescription
                                ?.fontSize}px`,
                            fontFamily:
                              theme?.selectedProduct?.productDescription
                                ?.fontStyle,
                          }}  
                          dangerouslySetInnerHTML={{
                            __html: product?.alerjen ? product?.alerjen : "",
                          }}
                        />
                      </div>
                      {/* 
<div className="mt-6">
  <p className="text-sm tracking-tight font-bold  text-black mb-4">
    Alerjenler
  </p>
  <div className="flex justify-between align-middle">
    <AllergenItem />
    <AllergenItem />
    <AllergenItem />
    <AllergenItem />
  </div>
</div>
*/}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
const AllergenItem = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image width="24" height="24" src={EggsIcon.src} alt={"egg-icon"} />
      <span>Yumurta</span>
    </div>
  );
};
