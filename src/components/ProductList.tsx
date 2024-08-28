import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import Product from "./Product";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

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
                containerClassName="w-full h-[360px] sm:h-[154px] md:h-[210px] lg:h-[280px] xl:h-[388px]"
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

  if (products?.length) {
    pageContent = products.map((product) => {
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
  }

  const content = (
    <main className="main main--products container container-xl-custom py-20">
      {pageContent}
    </main>
  );

  return content;
};
export default ProductList;
