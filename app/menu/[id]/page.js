"use client";
import {
  accountCategories,
  categoryProducts,
  getInputProducts,
} from "@/app/services/axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HorizontalSlideList from "@/components/HorizontalSlideList";
import HorizontalSlideTextItem from "@/components/HorizontalSlideTextItem";
import SingleProductItem from "@/components/SingleProductItem";
import SearchInput from "@/components/search";
import React, { useEffect, useState } from "react";

export default function MenuPage({ params }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(params?.id);
  const [query, setQuery] = useState("");
  const [inputProducts, setInputProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseCategories = await accountCategories(673);
      setCategories(responseCategories?.message?.data);
      await changeMenuHandler(params?.id);
      const responseProducts = getInputProducts(673, query.toLocaleUpperCase());
      responseProducts
        .then((response) => {
          // `response` içindeki veriye eriş
          const data = response.message.data;
          setInputProducts(data);
        })
        .catch((error) => {
          // hata durumunda işlemler
          console.error(error);
        });
    };
    fetchData();
  }, []);

  const changeMenuHandler = async (id) => {
    const response = await categoryProducts(673, id);
    setProducts(response?.message?.data);

    setSelectedCategory(id);
  };
  const getProducts = () => {
    const response = getInputProducts(673, query.toLocaleUpperCase());
    response
      .then((response) => {
        // `response` içindeki veriye eriş
        const data = response.message.data;
        setInputProducts(data);
      })
      .catch((error) => {
        // hata durumunda işlemler
        console.error(error);
      });
  };
  return (
    <main>
      <div className="bg-white">
        <div className="px-4 mx-auto sm:px-6 text-black sm:py-8 rounded-xl bg-hm-Light pb-2">
          <Header />
          <HorizontalSlideList>
            {categories?.map((category) => (
              <HorizontalSlideTextItem
                key={category?.id}
                category={category}
                onClickHandler={() => changeMenuHandler(category?.id)}
                title={category?.name}
                underline={category?.id == selectedCategory}
              />
            ))}
          </HorizontalSlideList>
          <SearchInput
            searchOnClick={getProducts}
            query={query}
            setQuery={setQuery}
            inputProducts={inputProducts}
            setInputProducts={setInputProducts}
            menuId={params?.id}
          />
        </div>
        {products?.map((product) => (
          <SingleProductItem
            key={product?.product_id}
            id={selectedCategory}
            product={product}
          />
        ))}
        <Footer />
      </div>
    </main>
  );
}
