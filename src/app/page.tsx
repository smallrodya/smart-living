'use client';
import { useEffect } from 'react';
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
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <main>
      <Header />
      <CategoriesSection />
      <Banner />
      <ReduceSpaceCarousel />
      <FeaturesSection />
      <ThrowAndCurtainSection />
      <BestSellersSlider />
      <Blog />
      <SubscribeSection />
      <Footer />
      <CookieBanner />
    </main>
  );
}