"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { accountCategories, getAccount } from "@/app/services/axios";
import store from "@/app/Redux/store";
import { authActions } from "@/app/Redux/features/auth-slice";
import { productActions } from "@/app/Redux/features/product-slice";
import { accountActions } from "@/app/Redux/features/account-slice";
import { settingsProvider } from "@/components/theme";
import PageContainer from "@/components/projectTemplates/PageContainer";
import Footer from "@/components/Footer";
import Header from "@/components/template-4/Header";
import loadingProductList from "../../../components/lotties/loadingProductList.json";
import Lottie from "react-lottie";

export default function HomePage({ params }) {
  const [account, setAccount] = useState();
  const [categories, setCategories] = useState([]);
  const [templateTheme, setTemplateTheme] = useState();
  const [currentImg, setCurrentImg] = useState(0);
  const [loadingText, setLoadingText] = useState();
  const imgs = [
    "https://images.unsplash.com/photo-1561948951-04b3ef46c681",
    "https://images.pexels.com/photos/2884775/pexels-photo-2884775.jpeg",
    "https://cdn.pixabay.com/photo/2015/09/18/19/03/children-945380_960_720.jpg",
  ];
  const interval = 3000; // Görsel değiştirme süresi (ms)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingProductList,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Görsel geçiş efekti
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % imgs.length);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Veri çekme ve state güncelleme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const theme = await settingsProvider(params?.id);
        setTemplateTheme(theme);
        store.dispatch(accountActions.updateState({ theme }));

        const accountDetail = await getAccount(params?.id);
        store.dispatch(
          authActions.updateState({ account: accountDetail?.message })
        );
        setAccount(accountDetail?.message);

        const response = await accountCategories(params?.id);
        if (response?.success) {
          setCategories(response?.message);
          store.dispatch(
            productActions.updateState({ categories: response?.message })
          );
        } else {
          setLoadingText(response?.message);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [params?.id]);

  return (
    <PageContainer theme={templateTheme}>
      <div id="__next">
        <Header account={account} list={categories} paramsId={params?.id} />
        <section className="mb-2">
          <div className="my-4">
            <div className="abouts">
              <div className="about-3">
                <div className="slider">
                  {imgs.map((img, index) => (
                    <img
                      key={index}
                      className={`slider-img ${currentImg === index ? "active" : ""}`}
                      src={img}
                      alt={`Image ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="navigation-button">
                  {imgs.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentImg === index ? "active" : ""}`}
                      onClick={() => setCurrentImg(index)}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="marka">
                <h1 className="name">{account?.account_name}</h1>
                <button type="button" className="a-btn">
                  Hakkımızda
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="my-4 hidden md:flex md:flex-col">
          <h2 className="menu-title">Menü kategorileri</h2>
          <div className="grid-menu">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/template-4/${params?.id}/menu/${category?.id}`}
              >
                <div className="rounded bg-white p-1 pb-0 shadow-all">
                  <div
                    style={{
                      backgroundImage: `url(${category?.image_url})`,
                      backgroundSize: "cover",
                    }}
                    className="menu-dep"
                  >
                    <div className="relative top-full flex h-full transform flex-col items-center justify-center gap-2 bg-gradient-to-t from-black text-white transition-all duration-500 ease-out group-hover:top-0">
                      <div className="text-sm font-light">{category?.name}</div>
                    </div>
                  </div>
                  <div className="py-4 text-center">
                    <div className="group">
                      <span className="relative pb-1 text-lg font-light text-black after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-pardon after:transition-transform after:duration-500 after:ease-out after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">
                        {category?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}
