import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WavyLink } from "react-wavy-transitions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {

    const words = document.querySelectorAll(".newsletter-main-title");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".newsletter",
        start: "top 70%",
      },
    });

    tl.fromTo(
      words,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }
    );

    tl.fromTo(
      ".newsletter-content1",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }, 0.4
    ); 

    tl.fromTo(
      ".newsletter-content2",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }, 0.6
    );

  }, [])

  const splitSentenceIntoWords = (sentence: string) => {
    return sentence.split(" ").map((word, index) => (
      <React.Fragment key={index}>
        <span className="inline-block newsletter-main-title">{word}</span>
        {index < sentence.split(" ").length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    ));
  };

  return (
    <>
      <footer>
        <div>
          <div className="w-full py-28">
            <div className="newsletter container container-xl-custom flex items-center py-10 justify-center">
              <div className="flex flex-col items-center w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
                <h2 className="text-4xl overflow-hidden md:text-5xl font-bold mb-10 leading-snug mix-blend-difference text-white text-center">
                {splitSentenceIntoWords("SUBSCRIBE TO OUR NEWSLETTER")}
                </h2>
                <form
                  className="w-full overflow-hidden"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubscribe();
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-6 py-4 border newsletter-content1 overflow-hidden border-gray-300 mb-6 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 newsletter-content2 overflow-hidden w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
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
                <div className="flex flex-col text-center md:text-start gap-2 text-white md:text-black text-sm md:text-lg font-medium">
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
                    <div className="text-lg md:text-xl font-semibold text-white md:text-black">
                      QUICK LINKS
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:items-start md:justify-normal">
                    <div className="w-[60px] bg-[#E53935] h-1"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-white md:text-black items-center md:items-start text-center md:text-start font-medium">
                  <div>
                    <WavyLink to="/shop" color="#E53935">
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
                    <div className="text-lg md:text-xl font-semibold text-white md:text-black">
                      FOLLOW US
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:items-start md:justify-normal">
                    <div className="w-[60px] bg-[#E53935] h-1"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-white md:text-black text-sm md:text-lg  font-medium">
                  <ul className="flex gap-10 justify-between">
                    <li>
                      <WavyLink color="#E53935" className="text-white md:text-black" to="">
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-facebook-f opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li className="flex items-center justify-center">
                      <WavyLink
                        color="#E53935"
                        className="text-white md:text-black text-[0.8rem] md:text-[1rem]"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-x-twitter opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li>
                      <WavyLink
                        color="#E53935"
                        className="text-white md:text-black text-[0.8rem] md:text-[1rem]"
                        to=""
                      >
                        <i className="text-[0.8rem] md:text-[1rem] fa-brands fa-instagram opacity-75 hover:scale-150 hover:opacity-100 transition-all"></i>
                      </WavyLink>
                    </li>
                    <li>
                      <WavyLink
                        color="#E53935"
                        className="text-white md:text-black text-[0.8rem] md:text-[1rem]"
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
                <div className="bg-gray-200 h-[0.01rem]" />
              </div>
              <div className="w-full py-4 md:flex text-xs md:text-sm font-medium items-center text-white justify-center">
                <div className="text-center md:text-start mb-0">
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
