import { Helmet } from "react-helmet";
import { WavyLink } from "react-wavy-transitions";

const Home = () => {
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
      <main className="home-main ">
        <div className="bg-home"></div>
        <div className="">
          <section>
            <div className="container flex flex-col h-[calc(100dvh+80px)] md:h-[calc(100dvh+64px)] items-center justify-center text-white">
              <div className="text-[3.2rem] md:text-[5rem] text-center font-bold mix-blend-difference">
                VOGUENEST
              </div>
              <div className="font-medium mix-blend-difference">
                FASHION COLLECTION
              </div>
            </div>

            <div className="container flex flex-col justify-between items-center gap-40 pb-28 md:pb-40">
              <div className="">
                <img src="/home.png" alt="" />
              </div>
              <div className="w-full flex items-end justify-end">
                <div className="flex flex-col w-full md:w-1/2 2xl:w-2/5 items-start gap-8 mb-10 justify-between text-[#E53935]">
                  <div className="font-extrabold text-[2.3rem] md:text-[3rem]">
                    OUR COLLECTION
                  </div>
                  <div className="font-semibold text-[1.1rem] md:text-[1.4rem] text-justify">
                    Our collection features timeless pieces designed for the
                    modern individual. Quality over quantity is our mantra.
                    Discover a wardrobe that reflects your essence.
                  </div>
                  <div className="mt-4">
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
