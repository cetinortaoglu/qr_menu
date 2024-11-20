"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { accountCategories, getAccount } from "@/app/services/axios";
import store from "@/app/Redux/store";
import { authActions } from "@/app/Redux/features/auth-slice";
import { productActions } from "@/app/Redux/features/product-slice";
import Header from "@/components/template-2/Header";
import Link from "next/link";
import { LanguageIcon } from "@heroicons/react/20/solid";
import Lottie from "react-lottie";
import loadingProductList from "../../../components/lotties/loadingProductList.json";
import { settingsProvider } from "@/components/theme";
import { accountActions } from "@/app/Redux/features/account-slice";
import PageContainer from "@/components/projectTemplates/PageContainer";
import Footer from "@/components/Footer";

export default function HomePage({ params }) {
  const [account, setAccount] = useState();
  const [inputProducts, setInputProducts] = useState();
  const [loadingText, setLoadingText] = useState();
  const [hasAccount, setHasAccount] = useState();
  const [categories, setCategories] = useState([]);
  const [templateTheme, setTemplateTheme] = useState();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingProductList,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const images = [
    "https://th.bing.com/th/id/OIG4.LCuQYaT.V_NF2cetQRnF?pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.f9KxatEbsfoPSIX2S7vw?w=1024&h=1024&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIG2.LRFo5gwnHOQg53pPxeYp?w=1024&h=1024&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIG3.r88ReaMIJp9AbLn2WRMD?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.KlrgVs3hTEy2WppFmOJ9?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.9tKNg6f9hriXj4RfO2.N?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.deNUdomfKtiWXb6tIH0g?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.1.Z.FwzLo64QLB1mWiGv?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.75LGqA0AxQzRzgs3Hbsq?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.1yVExBC9lxREhwQ3BFb9?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG3.XpBYsNY.0WJJQuyV7QSz?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.6SKmvixzLTYqY3XtjDCG?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG3.nMA5fU79t4qgx8qt3y8H?pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.RXNDEOU2.dA872ywlcPQ?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.9VunvY9MVSjQg1RC9Ip4?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG3.Vmoic1x2_AF9PSpE20VS?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.mqicB7Kdyv5m.96RdGpT?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.kMywR5Zu1qhnMX5FglnT?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG4.gyKFANyd.FHTYRUYQC0M?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG1.Z4DwQ1chM3HFGrYsyt.g?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
    "https://th.bing.com/th/id/OIG3.2aNEUPc4_CIvH4Cm0gVp?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
  ];

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

      /**   const responseProducts = await getInputProducts(
        params?.id,
        query?.toUpperCase()
      );
      setInputProducts(responseProducts?.message); */
      try {
        const response = await accountCategories(params?.id);
        if (response?.success === true) {
          setCategories(response?.message);
          store.dispatch(
            productActions.updateState({
              categories: response?.message,
            })
          );
        } else {
          setLoadingText(response?.message);
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

  return (
    <PageContainer
    theme={templateTheme}
    >
      <Header
        leftIcon={
          <LanguageIcon
          className={`w-10 h-10 backdrop-blur-3xl m-2 bg-black text-hm-Light my-2 rounded-lg`}
          size={30}
        />
        }
        account={account}
        list={categories}
        paramsId={params?.id}
      />

      {categories.length > 0 ? (
        <>
          <div className="relative m-3">
            <img
              src={
                categories[0]?.image_url
                  ? categories[0]?.image_url
                  : "https://th.bing.com/th/id/OIG2.QpaVnz5zwQCk3LP9wCpe?w=1024&h=1024&rs=1&pid=ImgDetMain"
              }
              alt="Gallery image"
              className="h-32 w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center rounded-lg">
              <Link
                href={`/template-2/${params?.id}/menu/${categories[0]?.id}`}
                className="font-semibold backdrop-blur-3xl p-1 rounded-lg cursor-pointer text-center"
                style={{
                  color: templateTheme?.menuSection?.fontColor,
                  fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                  fontFamily: templateTheme?.menuSection?.fontStyle,
                }}
              >
                {categories[0]?.name}
              </Link>
            </div>
          </div>
          <div className="gallery p-3">
            {categories?.map(
              (category, index) =>
                index !== 0 && (
                  <div key={category?.id} className="relative">
                    <img
                      key={category?.id}
                      src={
                        category?.image_url
                          ? category?.image_url
                          : images[index]
                      }
                      alt={`Gallery image ${index}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                      <Link
                        href={`/template-2/${params?.id}/menu/${category?.id}`}
                        className="font-semibold backdrop-blur-3xl p-1 rounded-lg cursor-pointer text-center"
                        style={{
                          color: templateTheme?.menuSection?.fontColor,
                          fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                          fontFamily: templateTheme?.menuSection?.fontStyle,
                        }}
                      >
                        {category?.name}
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
          <Footer Footer />
        </>
      ) : (
        <Lottie options={defaultOptions} />
      )}
    </PageContainer>
  );
}
