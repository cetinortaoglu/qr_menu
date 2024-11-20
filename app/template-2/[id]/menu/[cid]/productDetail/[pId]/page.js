"use client";
import ProductDetailHeader from "@/components/ProductDetailHeader";
import React, { useEffect, useState } from "react";
import EggsIcon from "../../../../../../../public/icons/Eggs.svg";
import Image from "next/image";
import { productDetail } from "@/app/services/axios";

export default function ProductDetailPage({ params }) {
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseDetails = await productDetail(628, params?.cid, params?.pId);
      setProductDetails(responseDetails?.message?.data);
    };
    fetchData();
  }, []);
  return (
    <main>
      <div className="bg-white">
        <div className="min-h-screen text-black">
          <ProductDetailHeader />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {productDetails[0]?.product_name}
            </h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight font-semibold  text-hm-Dark">
                ₺{productDetails[0]?.price}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xl tracking-tight font-semibold  text-black mb-4">
                Ürün Detayları
              </p>
              <div
                className="space-y-6 text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: productDetails[0]?.content
                    ? productDetails[0]?.content
                    : "Açıklama yok",
                }}
              />
            </div>
            <div className="mt-6">
              <p className="text-xl tracking-tight font-semibold  text-black mb-4">
                Alerjenler
              </p>
              <div className="flex justify-between align-middle">
                <AllergenItem />
                <AllergenItem />
                <AllergenItem />
                <AllergenItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
