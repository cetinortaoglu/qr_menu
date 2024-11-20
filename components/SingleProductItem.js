import Image from "next/image";
import React from "react";

export default function SingleProductItem({ product, id }) {
  return (
    <div className="mt-8 bg-white" key={product?.product_id}>
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                width="100"
                height="100"
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D"
                alt={`logo`}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a
                      href={`/menu/${id}/productDetail/${product?.product_id}`}
                      className="cursor-pointer"
                    >
                      {product?.product_name}
                    </a>
                  </h3>
                </div>
                <a>
                  <TruncateText
                    text={product?.content ? product?.content : "İçerik Yok"}
                  />
                </a>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="font-semibold">₺{product?.price}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
const TruncateText = ({ text }) => {
  // Metni boşluklara göre böler ve ilk 12 kelimeyi alır
  const truncatedText = text.split(" ").slice(0, 11).join(" ");

  // Eğer metin 12 kelimeden uzunsa sonuna üç nokta ekler
  const displayText =
    text.split(" ").length > 10 ? `${truncatedText}...` : truncatedText;

  return <p className="mt-1 text-sm text-gray-500">{displayText}</p>;
};
