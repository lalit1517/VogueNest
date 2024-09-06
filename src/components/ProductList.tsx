import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement, useState } from "react";
import Product from "./Product";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let pageContent: ReactElement | ReactElement[] = (
    <>
      {Array.from({ length: 51 }, (_, index) => (
        <article key={index} className="product">
          <div className="flex flex-col items-center justify-between mb-12 sm:mb-16 md:mb-16">
            <div className="sm:h-16 md:h-20 lg:h-24 mb-3 sm:mb-4 lg:mb-0 text-[#E53935] text-xl sm:text-sm md:text-xl italic w-full flex items-center justify-center font-bold">
              <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E5E4E2">
                <Skeleton
                  borderRadius={0}
                  width="100%"
                  height="100%"
                  containerClassName="w-full h-[28px] sm:h-[40px] md:h-[56px] xl:h-[28px]"
                />
              </SkeletonTheme>
            </div>
            <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E5E4E2">
              <Skeleton
                borderRadius={0}
                height="100%"
                width="100%"
                containerClassName="w-full h-[340px] sm:h-[154px] md:h-[210px] lg:h-[280px] xl:h-[335px] 2xl:h-[388px]"
              />
            </SkeletonTheme>
            <SkeletonTheme baseColor="#A9A9A9" highlightColor="#E5E4E2">
              <Skeleton
                borderRadius={0}
                width="100%"
                height="100%"
                containerClassName="w-full h-[75px] sm:h-[55px] md:h-[62px] lg:h-[73px] xl:h-[81px] 2xl:h-[89px]"
              />
            </SkeletonTheme>
          </div>
        </article>
      ))}
    </>
  );

  if (filteredProducts?.length) {
    pageContent = filteredProducts.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  } else if (products?.length && searchTerm) {
    pageContent = (
      <div className="w-full flex items-center justify-center">
        <p className="text-center text-gray-500 font-extrabold">
          No products found for "{searchTerm}".
        </p>
      </div>
    );
  }

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const content = (
    <>
      <Helmet>
        <title>Shop with VogueNest</title>
        <meta
          name="description"
          content="At VogueNest, we bring you the latest fashion trends along with quality home essentials. Shop stylish clothing, wooden tables, kitchen appliances, and more."
        />
        <meta
          name="keywords"
          content="VogueNest, fashion, online shopping, clothing, accessories, men's fashion, women's fashion, trendy clothes, stylish accessories, fashion store, home decor"
        />
      </Helmet>

      <main>
        <div className="background-body"></div>
        <div>
          <div className="search-bar container w-full flex items-end justify-end mt-28 md:mt-36">
            <div className="relative w-full md:w-2/5 lg:w-1/3 xl:w-[30%] 2xl:w-1/4 flex items-center">
              <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-black focus:outline-none rounded"
              />
              <i
                className={`absolute right-1 text-gray-500 cursor-pointer bg-white px-3 py-2 ${
                  searchTerm
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-magnifying-glass"
                }`}
                onClick={searchTerm ? handleClearSearch : undefined}
              />
            </div>
          </div>
          <main className="main main--products container container-xl-custom pt-10 pb-20">
            {pageContent}
          </main>
        </div>
      </main>
    </>
  );

  return content;
};

export default ProductList;
