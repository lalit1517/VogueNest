import { Helmet } from "react-helmet";
import { WavyLink } from "react-wavy-transitions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {

    const words = document.querySelectorAll(".main-title");
    const words2 = document.querySelectorAll(".sub-title");
    const words3 = document.querySelectorAll(".content-1");

    gsap.fromTo(
      words,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 3,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      words2,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1,
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".heading-1",
        start: "top 60%",
      },
    });

    tl.fromTo(
      words3,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }
    );

    tl.fromTo(
      ".content-2",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }, 0.2
    ); 

    tl.fromTo(
      ".content-3",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 2 }, 0.4
    );

  }, []);

  const splitSentenceIntoWords = (sentence: string) => {
    return sentence.split(" ").map((word, index) => (
      <React.Fragment key={index}>
        <span className="inline-block main-title">{word}</span>
        {index < sentence.split(" ").length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    ));
  };

  const splitSentenceIntoWords2 = (sentence: string) => {
    return sentence.split(" ").map((word, index) => (
      <React.Fragment key={index}>
        <span className="inline-block sub-title">{word}</span>
        {index < sentence.split(" ").length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    ));
  };

  const splitSentenceIntoWords3 = (sentence: string) => {
    return sentence.split(" ").map((word, index) => (
      <React.Fragment key={index}>
        <span className="inline-block content-1">{word}</span>
        {index < sentence.split(" ").length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    ));
  };

  return (
    <>
      <Helmet>
        <title>VogueNest - Redefine Your Style & Home</title>
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
          <section>
            <div className="container home-page flex flex-col h-[calc(100svh+60px)] md:h-[calc(100svh+56px)] items-center justify-center text-white">
              <div className="text-[3.2rem] md:text-[5rem] overflow-hidden text-center font-bold mix-blend-difference">
                {splitSentenceIntoWords("VOGUENEST")}
              </div>
              <div className="font-medium mix-blend-difference overflow-hidden">
                {splitSentenceIntoWords2("FASHION COLLECTION")}
              </div>
            </div>

            <div className="container flex flex-col justify-between items-center gap-40 pb-28 md:pb-40">
              <div className="">
                <img src="/home.png" alt="" />
              </div>
              <div className="w-full flex items-end justify-end heading-1">
                <div className="flex flex-col w-full md:w-1/2 2xl:w-2/5 items-start gap-8 mb-10 justify-between text-[#E53935]">
                  <div className="font-extrabold text-[2.3rem] md:text-[3rem] overflow-hidden">
                  {splitSentenceIntoWords3("OUR COLLECTION")}
                  </div>
                  <div className="font-semibold text-[1.1rem] md:text-[1.4rem] overflow-hidden text-justify content-2">
                    Our collection features timeless pieces designed for the
                    modern individual. Quality over quantity is our mantra.
                    Discover a wardrobe that reflects your essence.
                  </div>
                  <div className="mt-4 content-3 overflow-hidden">
                    <WavyLink to="/shop" color="#E53935">
                      <div className=" hover:bg-black font-semibold text-sm text-white px-2 py-2 bg-[#E53935] transition-all duration-300">
                        SHOP NOW
                      </div>
                    </WavyLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
