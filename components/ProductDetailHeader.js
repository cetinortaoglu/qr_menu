import Image from "next/image";
import React from "react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
export default function ProductDetailHeader({ closeModal, product }) {
  return (
    <article className="relative overflow-hidden bg-gray-900 isolate">
      <Image
        width="1200"
        height="1600"
        src={
          product?.resim_url
            ? product?.resim_url
            : product?.brand_logo
        }
        alt={`review.author`}
        className="object-cover w-full h-52 sm:h-40 lg:h-64"
      />
      <div className="absolute inset-0 flex items-start justify-start p-3 text-white">
        <a
          //href="/menu/49"
          className="flex gap-x-2 items-center justify-center cursor-pointer"
          onClick={closeModal}
        >
          <ArrowSmallLeftIcon
            className="w-6 h-6 text-white"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}
