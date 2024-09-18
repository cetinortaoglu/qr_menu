"use client";
import { useEffect, useState } from "react";
import Product from "./Product";
import ProductModal from "./ProductModal";

const ProductGroup = ({
  category,
  selectedSubCategoryId,
  selectedCategoryId,
  templateTheme,
}) => {
  const [showProducts, setShowProducts] = useState(selectedCategoryId);
  const [showSubCategories, setShowSubCategories] =
    useState(selectedCategoryId);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    setTimeout(() => {
      setShowSubCategories(selectedCategoryId);
      setShowProducts(selectedCategoryId);
      setTimeout(() => {
        const element = document.getElementById(selectedCategoryId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }, 100);
  }, [selectedCategoryId]);

  const openProducts = (subCatId) => {
    if (subCatId == showProducts) {
      setShowProducts();
    } else {
      setShowProducts(subCatId);
      setTimeout(() => {
        const element = document.getElementById(subCatId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };
  const openSubCategories = (catId) => {
    if (catId == showSubCategories) {
      setShowSubCategories();
    } else {
      setShowSubCategories(catId);
      setTimeout(() => {
        const element = document.getElementById(catId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  };

  const getMenuProducts = (categoryId) => {
    return (
      <div className="mb-16">
        {category?.urunler?.map((product, index) => (
          <div
            key={product?.id}
            className={ 
              index % 2 === 0 ? templateTheme?.website?.bgColor : "bg-gray-100"
            }
            id={category?.id}
          >
            <Product 
            setSelectedProduct={setSelectedProduct}
            setOpenModal={setOpenModal}
             {...product} />
          </div>
        ))}
      </div>
    );
  };
  const getSubMenuProducts = (grup) => {
    return (
      <div className="mb-16">
        {grup?.urunler?.map((urun, index) => (
          <div
            key={urun?.id}
            className={
              index % 2 === 0 ? templateTheme?.website?.bgColor : "bg-gray-100"
            }
            id={category?.id}
          >
            <Product
              setSelectedProduct={setSelectedProduct}
              setOpenModal={setOpenModal}
              key={urun?.id}
              {...urun}
            />
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <div className="px-5 py-2">
        <div
          id={category?.id}
          style={{
            color: templateTheme?.menuSection?.fontColor,
            fontSize: `${templateTheme?.menuSection?.fontSize}px`,
            fontFamily: templateTheme?.menuSection?.fontStyle,
          }}
          className={`cursor-pointer font-bold text-center rounded-lg ${
            selectedCategoryId == category?.id ? "bg-hm-Normal" : "bg-hm-darker"
          } p-2`}
          onClick={() =>
            category?.urunler.length > 0 && category?.alt_gruplar?.length < 1
              ? openProducts(category?.id)
              : openSubCategories(category?.id)
          }
        >
          {category?.adi?.toUpperCase()}
        </div>
      </div>
      {category?.urunler.length > 0 && category?.alt_gruplar?.length < 1
        ? showProducts == category?.id && getMenuProducts(category?.id)
        : showSubCategories === category?.id &&
          category?.alt_gruplar?.map((grup) => (
            <div className="" id={grup?.id} key={grup?.id}>
              <div className="px-16 pt-5">
                <div
                  className={`cursor-pointer font-bold text-center rounded-lg bg-hm-Light-active p-1 
                    ${
                      /*
                      selectedSubCategoryId === grup?.id
                        ? "text-hm-Light"
                        : "text-hm-Normal"*/ ""
                    }
                    `}
                  style={{
                    color: templateTheme?.menuSubSection?.fontColor,
                    fontSize: `${templateTheme?.menuSubSection?.fontSize}px`,
                    fontFamily: templateTheme?.menuSubSection?.fontStyle,
                  }}
                  onClick={() => openProducts(grup?.id)}
                >
                  {grup?.adi?.toUpperCase()}
                </div>
              </div>
              {showProducts == grup?.id && getSubMenuProducts(grup)}
            </div>
          ))}

      <ProductModal
        open={openModal}
        setOpen={setOpenModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductGroup;
