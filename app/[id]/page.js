"use client";

import LogoFastrest from "@/components/LogoFastrest";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAccount, insertAccountToDB } from "../services/axios";

export default function page({ params }) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await insertAccountToDB(params?.id);
      const getAccountDetail = await getAccount(params?.id);
      router.push(
        `/template-${getAccountDetail?.message?.settings?.template_id}/${params?.id}`
      ); 
    };
    fetchData();
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-hm-Light">
      <h1 className="text-hm-Normal">
        {"Ürün kategorileri ve ürünler aranıyor."}
      </h1>
      <ArrowPathIcon
        className="w-20 h-20 text-hm-Normal animate-spin my-16"
        aria-hidden="true"
      />
      <LogoFastrest />
    </div>
  );
}

/**
 * "use client";
import { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import HorizontalSlideList from "@/components/HorizontalSlideList";
import ProductGroupImageCard from "@/components/ProductGroupImageCard";
import SearchInput from "@/components/search";
import ProductGroup from "@/components/ProductGroup";
import Footer from "@/components/Footer";
import {
  accountCategoriesAndProducts,
  getAccount,
  getInputProducts,
} from "../services/axios";
import store from "../Redux/store";
import { productActions } from "../Redux/features/product-slice";
import { authActions } from "../Redux/features/auth-slice";
import LogoFastrest from "@/components/LogoFastrest";
export default function HomePage({ params }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [query, setQuery] = useState("");
  const [inputProducts, setInputProducts] = useState([]);
  const [hasAccount, setHasAccount] = useState(true);
  const [loadingText, setLoadingText] = useState(
    "Ürün kategorileri ve ürünler aranıyor."
  );
  const [account, setAccount] = useState({});
  const [openSubCategories, setOpenSubCategories] = useState(false);

  const handleImageCardClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSubCategories = (categoryId) => {
    if (selectedCategoryId == categoryId) {
      setOpenSubCategories(false);
    } else {
      setOpenSubCategories(true);
    }
    setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const getAccountDetail = await getAccount(params?.id);
      store.dispatch(
        authActions.updateState({ account: getAccountDetail?.message })
      );
      setAccount(getAccountDetail?.message);
      const responseProducts = await getInputProducts(
        params?.id,
        query?.toUpperCase()
      );
      setInputProducts(responseProducts?.message);
      try {
        const response = await accountCategoriesAndProducts(params?.id);
        if (response?.message.status === true) {
          setCategories(response?.message.data);
          store.dispatch(
            productActions.updateState({
              categories: response?.message.data,
            })
          );
        } else {
          setLoadingText(response?.message?.message);
          setHasAccount(false);
        }
      } catch (error) {
        if (error.message === "CORS error") {
          console.error("Sunucu CORS hatası: İstek reddedildi.");
          // Kullanıcıya bilgi mesajı gösterme
          // Örn: alert("Sunucu CORS hatası: İstek reddedildi.");
        } else {
          console.error("Beklenmeyen bir hata oluştu:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const inputOnClick = async () => {
    const response = await getInputProducts(params?.id, query?.toUpperCase());
    setInputProducts(response?.message);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.getElementById("scroll-to-top-button");
      if (scrollButton) {
        scrollButton.style.display = window.scrollY > 100 ? "block" : "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      {categories?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen bg-hm-Light">
          {!hasAccount ? (
            <>
              <h1 className="text-hm-Normal font-bolder mb-52">
                {loadingText}
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-hm-Normal">{loadingText}</h1>
              <ArrowPathIcon
                className="w-20 h-20 text-hm-Normal animate-spin my-16"
                aria-hidden="true"
              />
            </>
          )}
          <LogoFastrest />
        </div>
      ) : (
        <div className="bg-white">
          <Header
            account={account}
            categories={categories}
            handleImageCardClick={handleImageCardClick}
          />
          <div className="mx-auto bg-hm-Light px-4 pt-2 sm:px-6 sm:py-8">
            <HorizontalSlideList>
              {categories?.length > 0 &&
                categories?.map((category, catIndex) => (
                  <div
                    className="flex-shrink-0"
                    key={category?.id}
                    //onClick={() => handleSubCategories(category?.id)}
                  >
                    <ProductGroupImageCard
                      handleImageCardClick={handleImageCardClick}
                      handleSubCategories={(event) =>
                        handleSubCategories(event)
                      }
                      selectedCategoryId={selectedCategoryId}
                      openSubCategories={openSubCategories}
                      category={category}
                      catIndex={catIndex}
                    />
                  </div>
                ))}
            </HorizontalSlideList>
          </div>
          <div className="top-0">
            <div className="px-4 mx-auto sm:px-6 text-black sm:py-2 rounded-bl-xl  rounded-br-xl  bg-hm-Light pt-2 pb-2">
              <SearchInput
                searchOnClick={inputOnClick}
                query={query}
                setQuery={setQuery}
                inputProducts={inputProducts}
              />
            </div>
          </div> 
          <button
            id="scroll-to-top-button"
            className="fixed bottom-24 right-8 bg-hm-Normal p-2 rounded-full hidden hover:bg-blue-200 transition duration-300"
            onClick={handleScrollToTop}
          >
            <ArrowSmallUpIcon
              className="w-8 h-8 text-hm-Light"
              aria-hidden="true"
            />
          </button>
          <button
            id="scroll-to-bottom-button"
            className="fixed bottom-8 right-8 bg-hm-Normal p-2 rounded-full hover:bg-blue-200 transition duration-300"
            onClick={handleScrollToBottom}
          >
            <ArrowSmallDownIcon
              className="w-8 h-8 text-hm-Light"
              aria-hidden="true"
            />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2">
            {categories?.length > 0 ? (
              categories?.map((category, index) => (
                <span
                  key={category?.id + index + 5}
                  id={category?.adi + category?.id + index}
                >
                  <ProductGroup
                    selectedSubCategoryId={selectedSubCategoryId}
                    selectedCategoryId={selectedCategoryId}
                    category={category}
                  />
                </span>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <h1 className="text-black">Ürün Kategorileri Bulunamadı!</h1>
              </div>
            )}
          </div>
          <Footer account={account} />
        </div>
      )}
    </main>
  );
}

 */
