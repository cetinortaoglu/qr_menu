"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import ProductModal from "../ProductModal";
import { useSelector } from "react-redux";
import Link from "next/link";
import ProductDetailModal from "../template-2/ProductDetailModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchInput({
  searchOnClick,
  query,
  setQuery,
  inputProducts,
  paramsId,
}) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const account = useSelector(({ auth }) => auth.account);
  const template = account?.settings?.template_id; 

  const filteredProducts = useMemo(() => {
    return query === ""
      ? inputProducts
      : inputProducts?.filter((product) => {
          return product?.product_name
            ? product?.product_name
                .toLocaleUpperCase()
                .includes(query.toLocaleUpperCase("tr"))
            : product?.name
                .toLocaleUpperCase()
                .includes(query.toLocaleUpperCase("tr"));
        });
  }, [inputProducts, query]);

  const productModalHandler = (product, category) => {
    setOpenProductModal(true);
    setSelectedProduct(product);
    if (product?.name) {
      const newPageUrl = `/template-2/${paramsId}/menu/${product?.id}`;
      window.location.href = newPageUrl;
    }
  };

  const formatPrice = (price) => {
    // Fiyatı binlik formata dönüştürme
    const formattedPrice = price.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });

    // Binlik ayrımı için noktayı değiştirme
    const priceWithDot = formattedPrice.replace(",", ".");

    return priceWithDot;
  };
  return (
    <Combobox as="div" value={query} onChange={setQuery} className={"my-2"}>
      {/**
       * <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Ürün Ara
      </Combobox.Label>
       */}
      <div className="relative mt-2 sm:w-60">
        <Combobox.Input
          placeholder="Menüde ara"
          className="w-full rounded-md border-0 bg-hm-Light py-1.5 pl-3 pr-10 text-hm-Dark placeholder:text-hm-Dark shadow-sm ring-1 ring-inset ring-hm-Light-active focus:ring-2 focus:ring-inset focus:ring-hm-Dark-active sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <Combobox.Button
          onClick={searchOnClick}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <MagnifyingGlassIcon
            className="h-5 w-5 text-hm-Dark-active"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full sm:w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredProducts &&
            filteredProducts?.map((product, index) => (
              <Combobox.Option
                key={
                  product?.id + product?.product_name
                    ? product?.product_name
                    : product?.name
                }
                onClick={() => productModalHandler(product)}
                value={
                  product?.product_name ? product?.product_name : product?.name
                }
                className={({ active }) =>
                  classNames(
                    "relative select-none py-2 pl-3 pr-9 cursor-pointer",
                    active ? "bg-hm-Dark-active text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <Link
                      onClick={() => productModalHandler(product)}
                      href={"#"}
                      // product?.name ? `/template-2/${paramsId}/menu/${product?.id}` : ""
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {product?.product_name
                        ? product?.product_name
                        : product?.name}
                    </Link>

                    {selected && (
                      <Link
                        onClick={() => productModalHandler(product)}
                        href={"#"}
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-hm-Dark-active"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
      {selectedProduct?.product_name && (
        <>
          {template === 1 ? (
            <ProductModal
              open={openProductModal}
              setOpen={setOpenProductModal}
              product={{
                product_name: selectedProduct?.product_name,
                urun_id: selectedProduct?.urun_id,
                resim_url: selectedProduct?.resim_url,
                brand_logo: account?.brand_logo,
                icerik: selectedProduct?.content,
                fiyat: selectedProduct?.price,
                aciklama: selectedProduct?.description,
                alerjen: selectedProduct?.allergen,
              }}
            />
          ) : (
            <ProductDetailModal
              open={openProductModal}
              setOpen={setOpenProductModal}
              product={selectedProduct}
              formatPrice={formatPrice}
            />
          )}
        </>
      )}
    </Combobox>
  );
}
