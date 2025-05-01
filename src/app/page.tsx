import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import Banner from "../components/Banner";
import ReduceSpaceCarousel from "../components/ReduceSpaceCarousel";
import BestSellersSlider from "../components/BestSellersSlider";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <CategoriesSection />
      <Banner />
      <ReduceSpaceCarousel />
      <BestSellersSlider />
      <SubscribeSection />
      <Footer />
    </>
  );
}
