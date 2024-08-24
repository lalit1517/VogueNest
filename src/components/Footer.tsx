import "@fortawesome/fontawesome-free/css/all.min.css";

type ViewType = "products" | "cart" | "orders";

type PropsType = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

const Footer = ({ view, setView }: PropsType) => {
  return (
    <>
      <footer>
        <div>
          <div className="newsletter fading-newsletter bg-[url('/newsletter-bg.jpeg')] bg-cover bg-center w-full py-40">
            <div className="container container-xl-custom flex items-center py-10 justify-center">
              <div className="flex flex-col items-center w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-snug text-white text-center">
                  SUBSCRIBE TO OUR NEWSLETTER
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="px-6 py-4 border border-gray-300 mb-6 w-full"
                />
                <button className="px-6 py-4 w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-elements bg-black fading-footer">
          <div className="container container-xl-custom pt-28">
            <div className="w-full md:flex items-start justify-between">
              <div className="flex flex-col items-center md:items-start gap-8 mb-12 md:mb-0 md:w-1/3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src="/logo.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-center md:text-start gap-2 text-gray-400 text-sm md:text-lg font-medium">
                  <div>
                    VogueNest: Where fashion meets sophistication. Explore our
                    curated collections and find your next style statement. Shop
                    now for exclusive deals and timeless designs.
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-8 mb-12 md:mb-0">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-lg md:text-xl font-semibold text-white">
                      QUICK LINKS
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:items-start md:justify-normal">
                    <div className="w-[60px] bg-red-600 h-1"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-lg text-center md:text-start font-medium">
                  <div>
                    <button
                      onClick={() => setView("products")}
                      className={view === "products" ? "active" : ""}
                    >
                      Products
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setView("cart")}
                      className={view === "cart" ? "active" : ""}
                    >
                      Cart
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setView("orders")}
                      className={view === "orders" ? "active" : ""}
                    >
                      Orders
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-lg md:text-xl font-semibold text-white">
                      FOLLOW US
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:items-start md:justify-normal">
                    <div className="w-[60px] bg-red-600 h-1"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-lg  font-medium">
                  <ul className="flex gap-10 justify-between">
                    <li>
                      <a
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        href=""
                        target="_blank"
                      >
                        <i className="fa-brands fa-facebook-f opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </a>
                    </li>
                    <li className="flex items-center justify-center">
                      
                      <a
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        href=""
                        target="_blank"
                      >
                        <i className="fa-brands fa-x-twitter opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </a>
                    </li>
                    <li>
                      
                      <a
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        href=""
                        target="_blank"
                      >
                        <i className="fa-brands fa-instagram opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </a>
                    </li>
                    <li>
                      
                      <a
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        href=""
                        target="_blank"
                      >
                        <i className="fa-brands fa-linkedin-in opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-12 md:pb-0">
              <div className="row opacity-[0.2]">
                  <div className=" bg-gray-200 h-[0.01rem]" />
              </div>
              <div className="w-full py-6 md:flex text-sm md:text-base font-medium items-center text-gray-400 justify-center md:justify-between">
                <div className="text-center md:text-start mb-2 md:mb-0">&copy; Created By VogueNest</div>
                <div className="text-center md:text-end">All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
