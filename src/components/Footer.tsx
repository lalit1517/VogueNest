import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { WavyLink } from "react-wavy-transitions";

const Footer = () => {
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

  return (
    <>
      <footer>
        <div>
          <div className="newsletter fading-newsletter bg-[url('/newsletter-bg.jpeg')] bg-cover bg-center w-full py-40">
            <div className="container container-xl-custom flex items-center py-10 justify-center">
              <div className="flex flex-col items-center w-3/4 md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-snug text-white text-center">
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
        <div className="footer-elements bg-black fading-footer">
          <div className="container container-xl-custom pt-28">
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
                <div className="flex flex-col gap-2 text-gray-400 items-center md:items-start text-center md:text-start font-medium">
                  <div>
                    <WavyLink to="/products" color="#E53935">
                      <div className="underline-hover w-fit text-sm md:text-lg">
                        Products
                      </div>
                    </WavyLink>
                  </div>
                  <div>
                    <WavyLink to="/cart" color="#E53935">
                    <div className="underline-hover w-fit text-sm md:text-lg">
                        Cart
                      </div>
                    </WavyLink>
                  </div>
                  <div>
                    <WavyLink to="/orders" color="#E53935">
                    <div className="underline-hover w-fit text-sm md:text-lg">
                        Orders
                      </div>
                    </WavyLink>
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
                      <WavyLink
                        color="#E53935"
                        className="text-gray-400"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-facebook-f opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li className="flex items-center justify-center">
                      <WavyLink
                        color="#E53935"
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-x-twitter opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li>
                      <WavyLink
                        color="#E53935"
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-instagram opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li>
                      <WavyLink
                        color="#E53935"
                        className="text-gray-400 text-[0.8rem] md:text-[1rem]"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-linkedin-in opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-12 md:pb-0">
              <div className="row opacity-[0.2]">
                <div className=" bg-gray-200 h-[0.01rem]" />
              </div>
              <div className="w-full py-6 md:flex text-xs md:text-sm font-medium items-center text-gray-400 justify-center">
                <div className="text-center md:text-start mb-2 md:mb-0">
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
    </>
  );
};

export default Footer;
