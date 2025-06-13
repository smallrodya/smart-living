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

export default function Home() {
  useEffect(() => {
    // Отправляем данные о посещении
    fetch('/api/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        page: '/',
        userAgent: navigator.userAgent
      })
    }).catch(console.error);
  }, []);

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