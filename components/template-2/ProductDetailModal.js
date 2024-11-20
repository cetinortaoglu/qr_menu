"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react"; 
import { useSelector } from "react-redux";

export default function ProductDetailModal({
  open,
  setOpen,
  product,
  formatPrice,
}) {
  const cancelButtonRef = useRef(null);
  const theme = useSelector(({ account }) => account.theme);

  console.log("theme: " , theme)

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                className="relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                style={{
                  backgroundColor: theme?.selectedProduct?.modal?.bgColor,
                }}
              >
                <div
                  style={{
                    backgroundColor: theme?.selectedProduct?.modal?.bgColor,
                  }}
                >
                  <img
                    src={
                      product?.image_url
                        ? product?.image_url
                        : "https://www.sodexoavantaj.com/uploads/20210809111840949.jpg"
                    }
                    alt={product?.product_name}
                    className="h-full w-full object-cover object-center rounded-md"
                  />
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="leading-6"
                      style={{
                        color: theme?.selectedProduct?.productName?.fontColor,
                        fontSize: `${theme?.selectedProduct?.productName?.fontSize}px`,
                        fontFamily:
                          theme?.selectedProduct?.productName?.fontStyle,
                      }}
                    >
                      {product?.product_name}
                    </Dialog.Title> 
                    <div className="mt-2">
                      <p
                        className=""
                        style={{
                          color:
                            theme?.selectedProduct?.productPrice?.fontColor,
                          fontSize:
                            `${theme?.selectedProduct?.productPrice?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productPrice?.fontStyle,
                        }}
                      >
                        {formatPrice(product?.price)}₺
                      </p>
                    </div>
                    <div className="mt-3">
                      <p
                        className={`text-lg tracking-tight font-bold  text-black ${
                          !product?.content && "hidden"
                        }`}
                        style={{
                          color: theme?.selectedProduct?.productName?.fontColor, 
                          fontFamily:
                            theme?.selectedProduct?.productName?.fontStyle,
                        }}
                      >
                        Ürün Detayları
                      </p>
                      <div
                        className="space-y-6"
                        style={{
                          color:
                            theme?.selectedProduct?.productDetail?.fontColor,
                          fontSize: `${theme?.selectedProduct?.productDetail?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productDetail?.fontStyle,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: product?.content ? product?.content : "",
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <p
                        className={`text-lg tracking-tight font-bold  text-black ${
                          !product?.description && "hidden"
                        }`}
                        style={{
                          color: theme?.selectedProduct?.productName?.fontColor, 
                          fontFamily:
                            theme?.selectedProduct?.productName?.fontStyle,
                        }}
                      >
                        Ürün Açıklama
                      </p>
                      <div
                        className="space-y-6"
                        style={{
                          color:
                            theme?.selectedProduct?.productDescription
                              ?.fontColor,
                          fontSize: `${theme?.selectedProduct?.productDescription?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productDescription
                              ?.fontStyle,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: product?.description ? product?.description : "",
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <p
                        className={`text-lg tracking-tight font-bold  text-black ${
                          !product?.allergen && "hidden"
                        }`}
                        style={{
                          color: theme?.selectedProduct?.productName?.fontColor, 
                          fontFamily:
                            theme?.selectedProduct?.productName?.fontStyle,
                        }}
                      >
                        Ürün Alerjenleri
                      </p>
                      <div
                        className="space-y-6"
                        style={{
                          color:
                            theme?.selectedProduct?.productDescription
                              ?.fontColor,
                          fontSize: `${theme?.selectedProduct?.productDescription?.fontSize}px`,
                          fontFamily:
                            theme?.selectedProduct?.productDescription
                              ?.fontStyle,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: product?.allergen ? product?.allergen : "",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:gap-3">
                  {/**
                 *   <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                 */}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Kapat
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
