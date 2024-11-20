"use client";
import { authActions } from "@/app/Redux/features/auth-slice";
import store from "@/app/Redux/store";
import { accountCategories, categoryProducts, getAccount } from "@/app/services/axios";
import Footer from "@/components/Footer";
import Header from "@/components/template-4/Header";
import { productActions } from "@/app/Redux/features/product-slice";
import ProductDetailModal from "@/components/template-2/ProductDetailModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useRef } from "react";
import PageContainer from "@/components/projectTemplates/PageContainer";
import { settingsProvider } from "@/components/theme";
import { accountActions } from "@/app/Redux/features/account-slice";
import "../../index.css";

export default function MenuPage({ params }) {
  const [products, setProducts] = useState([]);  // Tüm ürünler burada tutulacak
  const [categories, setCategories] = useState([]);  // Kategoriler
  const [selectedProduct, setSelectedProduct] = useState();  // Seçilen ürün
  const [templateTheme, setTemplateTheme] = useState();  // Tema bilgisi
  const [open, setOpen] = useState(false);  // Modal durumu
  const router = useRouter();
  const [account, setAccount] = useState();
  const categoryRefs = useRef({});  // Kategori referansları

  // Kategoriyi seçtiğinde o kategoriye scroll yapılmasını sağla
  const scrollToCategory = (categoryId) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Ürünleri kategorilere göre grupla
  const productsByCategory = useMemo(() => {
    // Kategorilere göre ürünleri grupla
    const groupedProducts = categories.map((category) => {
      return {
        category,
        products: products.filter((product) => product.group_id === category.id),
      };
    });
    return groupedProducts;
  }, [products, categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tema bilgilerini al
        const theme = await settingsProvider(params?.id);
        setTemplateTheme(theme);
        store.dispatch(accountActions.updateState({ theme: theme }));

        // İşletme bilgileri için API isteği
        const getAccountDetail = await getAccount(params?.id);
        store.dispatch(
          authActions.updateState({ account: getAccountDetail?.message })
        );
        setAccount(getAccountDetail?.message);

        // Kategoriler için API isteği
        const responseCategories = await accountCategories(params?.id);
        if (responseCategories?.success) {
          setCategories(responseCategories?.message);
          store.dispatch(productActions.updateState({ categories: responseCategories?.message }));
        } else {
          console.error("Kategori verisi alınamadı:", responseCategories?.message);
        }

        // Ürünler için API isteği - Tüm ürünler alınacak
        const responseProducts = await categoryProducts(params?.id);
        
        if (responseProducts?.success) {
          setProducts(responseProducts?.message);  // Tüm ürünler burada tutulacak
          console.log("Tüm Ürünler API Yanıtı: ", responseProducts?.message);
        } else {
          console.error("Ürün verisi alınamadı:", responseProducts?.message);
        }
      } catch (error) {
        console.error("API Hatası: ", error);
      }
    };

    fetchData();
  }, [params?.id]); // Sadece account ID değiştiğinde tekrar veri al

  const openProductModal = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const formatPrice = (price) => {
    const formattedPrice = price?.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });
    return formattedPrice?.replace(",", ".");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <PageContainer>
      <div id="__next">
        <div dir="ltr" className="container">
          <div style={{ backgroundColor: templateTheme?.website?.bgColor }} className="min-h-screen">
            <Header />
            <div id="slider" className="flex items-center overflow-x-scroll border-b" style={{ backgroundColor: '#3977db' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="px-4 x"
                  onClick={() => {
                    scrollToCategory(category.id); // Kategoriyi seçtiğinde scroll yap
                  }}
                >
                  {category?.name}
                </button>
              ))}
            </div>
            <div className="p-4">
              {/* Kategorilere göre ürünleri listele */}
              {productsByCategory.map(({ category, products }) => (
                <div key={category.id} id={`category-${category.id}`} ref={(el) => (categoryRefs.current[category.id] = el)} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 cat" >{category.name}</h2>
                  <div className="grid grid-cols-4 gap-6">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.id} className="relative shadow-custom">
                          <img
                            src={product.image_url}
                            alt={product.product_name}
                            className="h-full w-full rounded-md"
                            onClick={() => openProductModal(product)}
                          />
                          <div className="absolute bottom-2 right-2 bg-white px-2 shadow-custom3">
                            {formatPrice(product.price)}₺
                          </div>
                          <h5 className="text-center font-medium p-2">{product.product_name}</h5>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-3 text-center">Bu kategoriye ait ürün bulunmamaktadır.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Footer />
          </div>
          <ProductDetailModal
            open={open}
            setOpen={setOpen}
            product={selectedProduct}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </PageContainer>
  );
}
