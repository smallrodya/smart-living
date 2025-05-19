import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import Banner from "../components/Banner";
import ReduceSpaceCarousel from "../components/ReduceSpaceCarousel";
import BestSellersSlider from "../components/BestSellersSlider";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import Blog from "../components/Blog";
import ThrowAndCurtainSection from "../components/BeddingAndRugsSection";
export default function Home() {
  return (
    <>
      <Header />
      <CategoriesSection />
      <Banner />
      <ReduceSpaceCarousel />
      <ThrowAndCurtainSection />
      <BestSellersSlider />
      <Blog />
      <SubscribeSection />
      <Footer />
      <CookieBanner />
    </>
  );
}