import { useSelector } from "react-redux";

const Product = ({
  id,
  adi,
  resim_url,
  icerik,
  aciklama,
  fiyat,
  setOpenModal,
  alerjan,
  setSelectedProduct,
}) => {
  const account = useSelector(({ auth }) => auth.account);

  const formatPrice = (price) => {
    // Fiyatı binlik formata dönüştürme
    const formattedPrice = price.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });

    // Binlik ayrımı için noktayı değiştirme
    const priceWithDot = formattedPrice.replace(",", ".");

    return priceWithDot;
  };
  const productSelectHandler = () => {
    setSelectedProduct({
      product_name: adi,
      urun_id: id,
      icerik: icerik,
      fiyat: fiyat,
      aciklama: aciklama,
      resim_url: resim_url,
      alerjen: alerjan,
      brand_logo: account?.brand_logo,
    });
    setOpenModal(true);
  };
  return (
    <div
      key={id}
      className="grid grid-cols-4 gap-4 p-5 text-black cursor-pointer"
      onClick={() => productSelectHandler()}
    >
      <div className="col-span-1">
        <img
          src={resim_url ? resim_url : account?.brand_logo}
          alt={adi}
          className="w-full h-full object-fill sm:h-auto rounded-md"
        />
      </div>
      <div className="col-span-3">
        <div className="mb-2 font-bold">{adi}</div>
        <div className="text-sm mb-2">{icerik ? icerik : ""}</div>
        <div className="text-gray-700 font-bold">
          {formatPrice(parseInt(fiyat))}₺
        </div>
      </div>
    </div>
  );
};

export default Product;
