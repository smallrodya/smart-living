import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import Banner from "../components/Banner";
import ReduceSpaceCarousel from "../components/ReduceSpaceCarousel";
import BestSellersSlider from "../components/BestSellersSlider";
import BigCategory from "../components/BigCategory";
import MobileBigCategory from "../components/MobileBigCategory";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import Blog from "../components/Blog";
export default function Home() {
  return (
    <>
      <Header />
      <CategoriesSection />
      <Banner />
      <ReduceSpaceCarousel />
      <BestSellersSlider />
      <BigCategory />
      <MobileBigCategory />
      <Blog />
      <SubscribeSection />
      <Footer />
      <CookieBanner />
    </>
  );
}