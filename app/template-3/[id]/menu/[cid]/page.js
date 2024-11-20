"use client";
import { authActions } from "@/app/Redux/features/auth-slice";
import store from "@/app/Redux/store";
import { categoryProducts, getAccount } from "@/app/services/axios";
import Footer from "@/components/Footer";
import Header from "@/components/template-2/Header";
import ProductDetailModal from "@/components/template-2/ProductDetailModal";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import list from "../../../../../components/lotties/list.json";
import Lottie from "react-lottie";
import PageContainer from "@/components/projectTemplates/PageContainer";
import { settingsProvider } from "@/components/theme";
import { accountActions } from "@/app/Redux/features/account-slice";

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
 

  const filteredProducts = useMemo(() => {
    return query === ""
      ? products
      : products?.filter((product) => {
          return product?.product_name
            .toLocaleUpperCase()
            .includes(query.toLocaleUpperCase());
        });
  }, [products, query]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: list,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const theme = await settingsProvider(params?.id);
      setTemplateTheme(theme);
      store.dispatch(
        accountActions.updateState({ theme: theme })
      );
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
    <PageContainer>
      <div style={{backgroundColor:templateTheme?.website?.bgColor}} className="min-h-screen">
        <Header
          leftIcon={
            <ArrowUturnLeftIcon
              onClick={handleGoBack}
              className="w-10 h-10 backdrop-blur-3xl m-2 bg-transparent text-hm-Light my-2 rounded-lg"
              size={30}
            />
          }
          account={account}
          list={products}
        />
        <div className="mt-2">
          <div className="max-w-4xl mx-auto">
            <ul className="px-4">
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((product, index) => (
                  <li
                    key={product?.id}
                    onClick={() => openProductModal(product)}
                    className="flex justify-between items-center py-4"
                  >
                    <div>
                      <p
                       style={{
                        color: templateTheme?.menuSubSection?.fontColor,
                        fontSize: `${templateTheme?.menuSubSection?.fontSize}px`,
                        fontFamily: templateTheme?.menuSubSection?.fontStyle,
                      }}
                      >
                        {product?.product_name}
                      </p>
                      <p className="text-sm ">
                        {product?.description}
                      </p>
                    </div>
                    <div>
                      {formatPrice(product?.price)}₺
                    </div>
                  </li>
                ))
              ) : (
                <Lottie options={defaultOptions} />
              )}
            </ul>
          </div>
        </div>
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
