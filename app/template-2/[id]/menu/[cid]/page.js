"use client";
import { authActions } from "@/app/Redux/features/auth-slice";
import store from "@/app/Redux/store";
import { categoryProducts, getAccount } from "@/app/services/axios";
import Footer from "@/components/Footer";
import Header from "@/components/template-2/Header";
import ProductDetailModal from "@/components/template-2/ProductDetailModal";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loadingCard from "../../../../../components/lotties/loadingCard.json";
import { settingsProvider } from "@/components/theme";
import { accountActions } from "@/app/Redux/features/account-slice";
import PageContainer from "@/components/projectTemplates/PageContainer";

export default function MenuPage({ params }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(params?.cid);
  const [query, setQuery] = useState("");
  const [inputProducts, setInputProducts] = useState([]);
  const [account, setAccount] = useState();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [templateTheme, setTemplateTheme] = useState();
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingCard,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const theme = await settingsProvider(params?.id);
      setTemplateTheme(theme);
      store.dispatch(accountActions.updateState({ theme: theme }));
      const getAccountDetail = await getAccount(params?.id);
      store.dispatch(
        authActions.updateState({ account: getAccountDetail?.message })
      );
      setAccount(getAccountDetail?.message);
      const response = await categoryProducts(params?.id, params?.cid);
      setProducts(response?.message);

      setSelectedCategory(params?.cid);
    };
    fetchData();
  }, []);
  const openProductModal = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };
  const formatPrice = (price) => {
    // Fiyatı binlik formata dönüştürme
    const formattedPrice = price?.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });

    // Binlik ayrımı için noktayı değiştirme
    const priceWithDot = formattedPrice?.replace(",", ".");

    return priceWithDot;
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <PageContainer theme={templateTheme}>
      <div>
        <Header
          leftIcon={
            <ArrowUturnLeftIcon
              onClick={() => handleGoBack()}
              className="w-10 h-10 backdrop-blur-3xl m-2 bg-transparent text-hm-Light my-2 rounded-lg"
              size={30}
            />
          }
          account={account}
          list={products}
        />
        {!(products.length > 1) ? (
          <div style={{ backgroundColor: templateTheme?.website?.bgColor }}>
            <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
              <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 p-4 gap-x-4">
                <Lottie options={defaultOptions} />
                <Lottie options={defaultOptions} />
                <Lottie options={defaultOptions} />
                <Lottie options={defaultOptions} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
              <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {products?.map((product, index) => (
                  <div
                    key={product?.product_name + product?.id}
                    className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
                    onClick={() => openProductModal(product)}
                  >
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                      <img
                        src={
                          product?.image_url
                            ? product?.image_url
                            : "https://www.sodexoavantaj.com/uploads/20210809111840949.jpg"
                        }
                        alt={product?.product_name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="pb-4 pt-10 text-center">
                      <h3
                        style={{
                          color: templateTheme?.menuSubSection?.fontColor,
                          fontSize: `${templateTheme?.menuSubSection?.fontSize}px`,
                          fontFamily: templateTheme?.menuSubSection?.fontStyle,
                        }}
                      >
                        <a href={"#"}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product?.product_name}
                        </a>
                      </h3>
                      <p className="mt-4"
                       style={{ 
                        fontFamily: templateTheme?.menuSubSection?.fontStyle,
                      }}
                      >
                        {formatPrice(product?.price)}₺
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
      <ProductDetailModal
        open={open}
        setOpen={setOpen}
        product={selectedProduct}
        formatPrice={formatPrice}
      />
    </PageContainer>
  );
}
