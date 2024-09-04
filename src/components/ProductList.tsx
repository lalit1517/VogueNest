import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement, useState } from "react";
import Product from "./Product";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WavyLink } from "react-wavy-transitions";
import { Helmet } from "react-helmet";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setShowPopup(true);
      setEmail("");
    } else {
      console.error("Email is required");
    }
  };

  const year = new Date().getFullYear();

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

      <div className="bg-[url('/bg-home.png')] bg-cover bg-center bg-fixed">
        <div className="search-bar container w-full flex items-end justify-end mt-36">
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
        <footer className="bg-transparent">
          <div>
            <div className="newsletter w-full py-28">
              <div className="container container-xl-custom flex items-center py-10 justify-center">
                <div className="flex flex-col items-center w-3/4 md:w-2/3 xl:w-1/2">
                  <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-snug mix-blend-difference text-white text-center">
                    SUBSCRIBE TO OUR NEWSLETTER
                  </h2>
                  <form
                    className="w-full"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubscribe();
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-6 py-4 border border-gray-300 mb-6 w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-4 w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-elements">
            <div className="container container-xl-custom pt-10 md:pt-28">
              <div className="w-full md:flex items-start justify-between">
                <div className="flex flex-col items-center md:items-start gap-8 mb-12 md:mb-0 md:w-1/3">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <WavyLink to="/" color="#E53935">
                          <img src="/logo.svg" alt="" />
                        </WavyLink>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center md:text-start gap-2 text-white mix-blend-difference text-sm md:text-lg font-medium">
                    <div>
                      VogueNest: Where fashion meets sophistication. Explore our
                      curated collections and find your next style statement.
                      Shop now for exclusive deals and timeless designs.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-8 mb-12 md:mb-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="text-lg md:text-xl font-semibold text-white mix-blend-difference">
                        QUICK LINKS
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:items-start md:justify-normal">
                      <div className="w-[60px] bg-[#E53935] h-1"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-white items-center md:items-start text-center md:text-start font-medium">
                    <div>
                      <WavyLink to="/shop" color="#E53935">
                        <div className="underline-hover w-fit text-sm md:text-lg mix-blend-difference">
                          Products
                        </div>
                      </WavyLink>
                    </div>
                    <div>
                      <WavyLink to="/cart" color="#E53935">
                        <div className="underline-hover w-fit text-sm md:text-lg mix-blend-difference">
                          Cart
                        </div>
                      </WavyLink>
                    </div>
                    <div>
                      <WavyLink to="/orders" color="#E53935">
                        <div className="underline-hover w-fit text-sm md:text-lg mix-blend-difference">
                          Orders
                        </div>
                      </WavyLink>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="text-lg md:text-xl font-semibold text-white mix-blend-difference">
                        FOLLOW US
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:items-start md:justify-normal">
                      <div className="w-[60px] bg-[#E53935] h-1"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-white text-sm md:text-lg  font-medium">
                    <ul className="flex gap-10 justify-between">
                      <li>
                        <WavyLink color="#E53935" className="text-white" to="">
                          <i className="text-[0.8rem] mix-blend-difference md:text-[1rem] fa-brands fa-facebook-f opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                        </WavyLink>
                      </li>
                      <li className="flex items-center justify-center">
                        <WavyLink
                          color="#E53935"
                          className="text-white text-[0.8rem] md:text-[1rem]"
                          to=""
                        >
                          <i className="text-[0.8rem] mix-blend-difference md:text-[1rem] fa-brands fa-x-twitter opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                        </WavyLink>
                      </li>
                      <li>
                        <WavyLink
                          color="#E53935"
                          className="text-white text-[0.8rem] md:text-[1rem]"
                          to=""
                        >
                          <i className="text-[0.8rem] mix-blend-difference md:text-[1rem] fa-brands fa-instagram opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                        </WavyLink>
                      </li>
                      <li>
                        <WavyLink
                          color="#E53935"
                          className="text-white text-[0.8rem] md:text-[1rem]"
                          to=""
                        >
                          <i className="text-[0.8rem] md:text-[1rem] mix-blend-difference fa-brands fa-linkedin-in opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                        </WavyLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-12 md:pb-0">
                <div className="row opacity-[0.2]">
                  <div className="bg-gray-200 h-[0.01rem]" />
                </div>
                <div className="w-full py-6 md:flex text-xs md:text-sm font-medium items-center text-white justify-center">
                  <div className="text-center md:text-start mb-2 md:mb-0 ">
                    ©️ {year} VogueNest
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">
                Thank you for subscribing!
              </h3>
              <p className="mb-4">
                You have successfully subscribed to our newsletter.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return content;
};

export default ProductList;
