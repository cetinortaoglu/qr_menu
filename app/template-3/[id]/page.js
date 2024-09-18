"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { accountCategories, getAccount } from "@/app/services/axios";
import store from "@/app/Redux/store";
import { authActions } from "@/app/Redux/features/auth-slice";
import { productActions } from "@/app/Redux/features/product-slice";
import Link from "next/link";
import { LanguageIcon } from "@heroicons/react/20/solid";
import loadingProductList from "../../../components/lotties/loadingProductList.json";
import Lottie from "react-lottie";
import { accountActions } from "@/app/Redux/features/account-slice";
import { settingsProvider } from "@/components/theme";
import PageContainer from "@/components/projectTemplates/PageContainer";
import Footer from "@/components/Footer";
import Header from "@/components/template-3/Header";

export default function HomePage({ params }) {
  const [account, setAccount] = useState();
  const [inputProducts, setInputProducts] = useState();
  const [loadingText, setLoadingText] = useState();
  const [hasAccount, setHasAccount] = useState();
  const [categories, setCategories] = useState([]);
  const [templateTheme, setTemplateTheme] = useState();

  const handleRedirect = (catId) => {
    window.location.href = `/template-3/${params?.id}/menu/${catId}`;
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingProductList,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  /*const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/17-05-06-Miniaturen_RR79033.jpg/640px-17-05-06-Miniaturen_RR79033.jpg",
    "https://www.happygroup.com.tr/uploads/source/2023/01/serpme-kahvalti-384.png",
    "https://www.altunmarket.com/app/assets/home/img/blog/s%C4%B1cakcay-min.jpg",
    "https://cdn.yemek.com/mnresize/940/940/uploads/2023/04/tavuklu-spagetti-onecikan.jpg",
    "https://egetelgrafcom.teimg.com/crop/1280x720/egetelgraf-com/uploads/2023/08/sogukicecekler2.jpg",
    "https://cdn.dpeurasia.com/dms/images/product/TR__BMPIZ_434x404.jpg",
    "https://cdn.yemek.com/mnresize/940/940/uploads/2023/04/tavuklu-spagetti-onecikan.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_R7H7e_bpChVUAFaLwrZWTOcOaTXVa5cwCAo-_UiPTWMVxQSejvnyqvyGb5Efz7c-wM&usqp=CAU",
    "https://www.sodexoavantaj.com/uploads/20210809111840949.jpg",
    "https://www.dontgobaconmyheart.co.uk/wp-content/uploads/2020/03/cheeseburger-wraps.jpg",
    "https://www.midyatsuryanisarap.com/images/sarap-cesitleri-nelerdir.jpg",
    "https://www.sodexoavantaj.com/uploads/20210809111840949.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_R7H7e_bpChVUAFaLwrZWTOcOaTXVa5cwCAo-_UiPTWMVxQSejvnyqvyGb5Efz7c-wM&usqp=CAU",
    "https://i12.haber7.net//fotogaleri/haber7/album/2017/52/hangi_cerez_kac_kalori_1514621159_4003.jpg",
    "https://www.barsokagi.com/wp-content/uploads/2016/08/asdf.fw_-1.png",
    "https://www.midyatsuryanisarap.com/images/sarap-cesitleri-nelerdir.jpg",
    "https://www.yasarpastanesi.com.tr/u178mado-sade-dondurma-dondurmalarhtm-dondurmalar-mado-582-17-B.jpg",
    "https://www.drozdogan.com/news-images/6-adimda-haftalik-yemek-plani-saglikli-ve-hizli-ogunler-142230-730-480.jpg",
    "https://www.yasarpastanesi.com.tr/u178mado-sade-dondurma-dondurmalarhtm-dondurmalar-mado-582-17-B.jpg",
    "https://cdn.yemek.com/mnresize/940/940/uploads/2023/04/tavuklu-spagetti-onecikan.jpg",
  ];*/
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
    <PageContainer theme={templateTheme}>
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
          <div
            className="relative m-4"
            onClick={() => handleRedirect(categories[0]?.id)}
          >
            <img
              src={
                categories[0]?.image_url
                  ? categories[0]?.image_url
                  : 'https://th.bing.com/th/id/OIG2.QpaVnz5zwQCk3LP9wCpe?w=1024&h=1024&rs=1&pid=ImgDetMain'
              }
              alt="Gallery image"
              className="h-32 w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center rounded-lg">
              <p
                className="font-semibold backdrop-blur-3xl p-1 rounded-lg cursor-pointer text-center"
                style={{
                  color: templateTheme?.menuSection?.fontColor,
                  fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                  fontFamily: templateTheme?.menuSection?.fontStyle,
                }}
              >
                {categories[0]?.name}
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-4 w-full px-4 pb-4 rounded-md"
            onClick={() => handleRedirect(categories[1]?.id)}
          >
            <div className="col-span-1 flex flex-col rounded-md">
              <div className="relative h-full">
                <img
                  src={
                    categories[1]?.image_url
                      ? categories[1]?.image_url
                      : images[2]
                  }
                  alt="Gallery image"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                  <p
                    className="font-semibold backdrop-blur-3xl p-2 rounded-lg cursor-pointer text-center"
                    style={{
                      color: templateTheme?.menuSection?.fontColor,
                      fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                      fontFamily: templateTheme?.menuSection?.fontStyle,
                    }}
                  >
                    {categories[1]?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col space-y-4">
              {[categories[2], categories[3], categories[4]].map(
                (category, index) => (
                  <div
                    key={category?.id}
                    className="relative rounded-md"
                    onClick={() => handleRedirect(category?.id)}
                  >
                    <img
                      src={
                        category?.image_url
                          ? category?.image_url
                          : images[index]
                      }
                      alt={`Gallery image ${index}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                      <p
                        className="font-semibold backdrop-blur-3xl p-1 rounded-lg cursor-pointer text-center"
                        style={{
                          color: templateTheme?.menuSection?.fontColor,
                          fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                          fontFamily: templateTheme?.menuSection?.fontStyle,
                        }}
                      >
                        {category?.name}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="m-3">
            {categories?.map(
              (category, index) =>
                index > 4 && (
                  <div
                    key={category?.id}
                    className="relative pb-4"
                    onClick={() => handleRedirect(category?.id)}
                  >
                    <img
                      src={
                        category?.image_url
                          ? category?.image_url
                          : images[index]
                      }
                      alt={`Gallery image ${index}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                      <p
                        className="font-semibold backdrop-blur-3xl p-1 rounded-lg cursor-pointer text-center"
                        style={{
                          color: templateTheme?.menuSection?.fontColor,
                          fontSize: `${templateTheme?.menuSection?.fontSize}px`,
                          fontFamily: templateTheme?.menuSection?.fontStyle,
                        }}
                      >
                        {category?.name}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
          <Footer />
        </>
      ) : (
        <div className="bg-hm-Light mt-2">
          <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
            <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-6 lg:grid-cols-6 p-4 gap-x-4">
              <Lottie options={defaultOptions} />
              <Lottie options={defaultOptions} />
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
