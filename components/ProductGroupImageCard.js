"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductGroupImageCard({
  category,
  openSubCategories,
  selectedCategoryId,
  catIndex,
  handleImageCardClick,
  handleSubCategories,
  templateTheme,
}) {
  const account = useSelector(({ auth }) => auth.account);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // Mobil veya tablet ekranlar için 768'i geçen genişlikler
    }

    handleResize(); // Sayfa ilk yüklendiğinde ekran boyutunu kontrol etmek için
    window.addEventListener("resize", handleResize); // Ekran boyutu değiştiğinde yeniden kontrol etmek için

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength && isMobile) {
      // Mobil görünümde kelimelerin alt alta gelmesini sağlayacak şekilde metni işleyin
      const words = text.split(" ");
      const truncatedText = words.slice(0, maxLength).join("<br>");
      return <span dangerouslySetInnerHTML={{ __html: truncatedText }} />;
    } else {
      return text;
    }
  };

  return (
    <>
      <article
        className="relative overflow-hidden bg-gray-900 isolate rounded-lg cursor-pointer w-36 h-24 sm:w-48 sm:h-32 md:w-64 md:h-48 lg:w-72 lg:h-48 xl:w-72 xl:h-48 "
        onClick={() => handleImageCardClick(category?.id)}
      >
        <a>
          <Image
            width={templateTheme?.header?.image?.width ? templateTheme?.header?.image?.width*10 : "300"}
            height={templateTheme?.header?.image?.height ? templateTheme?.header?.image?.height*10 : "400"}
            src={category?.img ? category?.img : account?.brand_logo}
            alt={category?.adi}
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-hm-Normal-hover  via-indigo-900/40" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-indigo-900/10" />
          <div className="absolute inset-0 flex flex-col justify-end px-3 pb-1 text-white">
            <h3 style={{
                    color: templateTheme?.header?.fontColor,
                    fontSize: `${templateTheme?.header?.fontSize}px`,
                    fontFamily: templateTheme?.header?.fontStyle,
                  }}
                  className="font-bold"
                   >{truncateText(category?.adi, 15)}</h3> 
          </div>
        </a>
      </article>
      {selectedCategoryId === category?.id && openSubCategories && (
        <div key={category?.id} className="overflow-y-auto max-h-60">
          {/* Maksimum 60px yüksekliğinde olacak */}
          {category?.alt_gruplar?.length > 0 ? (
            <>
              {selectedCategoryId === category?.id &&
                openSubCategories &&
                category?.alt_gruplar.map((altGrup) => (
                  <div key={altGrup?.id} className="bg-hm-light">
                    <a
                      href="#"
                      onClick={async (e) => {
                        e.preventDefault();
                        await handleImageCardClick(category?.id);
                      }}
                      className="block text-center text-hm-light py-2 bg-hm-Normal rounded-lg mt-1"
                    >
                      {truncateText(altGrup?.adi, 8)}
                    </a>
                  </div>
                ))}
            </>
          ) : (
            <div
              key={category?.id}
              className={catIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <div className="my-4 h-auto">
                <a
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleImageCardClick(category?.id);
                  }}
                  className="block text-center text-hm-light py-2 bg-hm-Normal rounded-lg mt-1"
                >
                  {truncateText(category?.adi, 8)}
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
