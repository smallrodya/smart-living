'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  hoverImage: string;
  discount: string;
  isHot?: boolean;
  isSoldOut?: boolean;
  color: string;
  sizes: {
    single: boolean;
    double: boolean;
    king: boolean;
    superKing: boolean;
  };
}

const products: Product[] = [
  { 
    id: 1, 
    name: 'Arcade Teddy Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-blush-pink.jpg', 
    hoverImage: '/teddy-blush-pink-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 2, 
    name: 'Arcade Teddy Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-charcoal.jpg', 
    hoverImage: '/teddy-charcoal-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 3, 
    name: 'Arcade Teddy Duvet Cover and Pillowcase Set – Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-grey.jpg', 
    hoverImage: '/teddy-grey-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 4, 
    name: 'Arcade Teddy Duvet Cover and Pillowcase Set – Purple', 
    price: '£49.99 – £69.99', 
    image: '/teddy-purple.jpg', 
    hoverImage: '/teddy-purple-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 5, 
    name: 'Arcade Teddy Duvet Cover and Pillowcase Set – White', 
    price: '£49.99 – £69.99', 
    image: '/teddy-white.jpg', 
    hoverImage: '/teddy-white-hover.jpg', 
    discount: '',
    color: 'White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 6, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-blush.jpg', 
    hoverImage: '/teddy-chiswick-blush-hover.jpg', 
    discount: '-56%',
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 7, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-charcoal.jpg', 
    hoverImage: '/teddy-chiswick-charcoal-hover.jpg', 
    discount: '-56%',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 8, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Cream', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-cream.jpg', 
    hoverImage: '/teddy-chiswick-cream-hover.jpg', 
    discount: '-56%',
    isSoldOut: true,
    color: 'Cream',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 9, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Grey', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-grey.jpg', 
    hoverImage: '/teddy-chiswick-grey-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 10, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Navy', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-navy.jpg', 
    hoverImage: '/teddy-chiswick-navy-hover.jpg', 
    discount: '-56%',
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 11, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – Purple', 
    price: '£22.05 – £31.13', 
    image: '/teddy-chiswick-purple.jpg', 
    hoverImage: '/teddy-chiswick-purple-hover.jpg', 
    discount: '-56%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 12, 
    name: 'Chiswick Pintuck Duvet Cover and Pillowcase Set – White', 
    price: '£22.05 – £26.37', 
    image: '/teddy-chiswick-white.jpg', 
    hoverImage: '/teddy-chiswick-white-hover.jpg', 
    discount: '-56%',
    color: 'White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 13, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-emb-charcoal.jpg', 
    hoverImage: '/teddy-emb-charcoal-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 14, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Cream', 
    price: '£20.75 – £49.99', 
    image: '/teddy-emb-cream.jpg', 
    hoverImage: '/teddy-emb-cream-hover.jpg', 
    discount: '-65%',
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 15, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Natural', 
    price: '£49.99 – £69.99', 
    image: '/teddy-emb-natural.jpg', 
    hoverImage: '/teddy-emb-natural-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Natural',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 16, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Navy', 
    price: '£49.99 – £69.99', 
    image: '/teddy-emb-navy.jpg', 
    hoverImage: '/teddy-emb-navy-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Navy',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 17, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Purple', 
    price: '£49.99 – £69.99', 
    image: '/teddy-emb-purple.jpg', 
    hoverImage: '/teddy-emb-purple-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 18, 
    name: 'EMB Stag Duvet Cover and Pillowcase Set – Silver', 
    price: '£24.21 – £59.99', 
    image: '/teddy-emb-silver.jpg', 
    hoverImage: '/teddy-emb-silver-hover.jpg', 
    discount: '-65%',
    isSoldOut: true,
    color: 'Silver',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 19, 
    name: 'Flannelette Duvet Cover and Pillowcase Set – Polar Bear', 
    price: '£15.56 – £19.02', 
    image: '/teddy-flannelette-polar.jpg', 
    hoverImage: '/teddy-flannelette-polar-hover.jpg', 
    discount: '-62%',
    color: 'Polar Bear',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 20, 
    name: 'Flannelette Duvet Cover and Pillowcase Set – Snow Reindeer', 
    price: '£15.56 – £19.02', 
    image: '/teddy-flannelette-reindeer.jpg', 
    hoverImage: '/teddy-flannelette-reindeer-hover.jpg', 
    discount: '-62%',
    color: 'Snow Reindeer',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 21, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-charcoal.jpg', 
    hoverImage: '/teddy-fleece-charcoal-hover.jpg', 
    discount: '-65%',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 22, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Coral', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-coral.jpg', 
    hoverImage: '/teddy-fleece-coral-hover.jpg', 
    discount: '-65%',
    isSoldOut: true,
    color: 'Coral',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 23, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Grey', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-grey.jpg', 
    hoverImage: '/teddy-fleece-grey-hover.jpg', 
    discount: '-65%',
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 24, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Natural', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-natural.jpg', 
    hoverImage: '/teddy-fleece-natural-hover.jpg', 
    discount: '-65%',
    isSoldOut: true,
    color: 'Natural',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 25, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Ochre', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-ochre.jpg', 
    hoverImage: '/teddy-fleece-ochre-hover.jpg', 
    discount: '-65%',
    color: 'Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 26, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Pink', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-pink.jpg', 
    hoverImage: '/teddy-fleece-pink-hover.jpg', 
    discount: '-65%',
    isSoldOut: true,
    color: 'Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 27, 
    name: 'Fleece Pom Pom Duvet Cover and Pillowcase Set – Purple', 
    price: '£17.29 – £24.21', 
    image: '/teddy-fleece-purple.jpg', 
    hoverImage: '/teddy-fleece-purple-hover.jpg', 
    discount: '-65%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 28, 
    name: 'Heart Foil Duvet Cover and Pillowcase Set – Cream', 
    price: '£49.99 – £69.99', 
    image: '/teddy-heart-cream.jpg', 
    hoverImage: '/teddy-heart-cream-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Cream',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 29, 
    name: 'Heart Foil Duvet Cover and Pillowcase Set – Deep Red', 
    price: '£49.99 – £69.99', 
    image: '/teddy-heart-red.jpg', 
    hoverImage: '/teddy-heart-red-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Deep Red',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 30, 
    name: 'Heart Foil Duvet Cover and Pillowcase Set – Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-heart-grey.jpg', 
    hoverImage: '/teddy-heart-grey-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 31, 
    name: 'Heart Foil Duvet Cover and Pillowcase Set – Purple', 
    price: '£49.99 – £69.99', 
    image: '/teddy-heart-purple.jpg', 
    hoverImage: '/teddy-heart-purple-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 32, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£26.49 – £33.99', 
    image: '/teddy-hug-blush.jpg', 
    hoverImage: '/teddy-hug-blush-hover.jpg', 
    discount: '-51%Hot',
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 33, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£26.49 – £33.99', 
    image: '/teddy-hug-charcoal.jpg', 
    hoverImage: '/teddy-hug-charcoal-hover.jpg', 
    discount: '-51%Hot',
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 34, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Mink', 
    price: '£26.49 – £33.99', 
    image: '/teddy-hug-mink.jpg', 
    hoverImage: '/teddy-hug-mink-hover.jpg', 
    discount: '-51%',
    isSoldOut: true,
    color: 'Mink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 35, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Silver-Grey', 
    price: '£26.49 – £33.99', 
    image: '/teddy-hug-silver.jpg', 
    hoverImage: '/teddy-hug-silver-hover.jpg', 
    discount: '-51%',
    isSoldOut: true,
    color: 'Silver-Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 36, 
    name: 'Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Blush', 
    price: '£19.02 – £30.70', 
    image: '/teddy-geo-blush.jpg', 
    hoverImage: '/teddy-geo-blush-hover.jpg', 
    discount: '-56%',
    color: 'Blush',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 37, 
    name: 'Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Charcoal', 
    price: '£19.02 – £30.70', 
    image: '/teddy-geo-charcoal.jpg', 
    hoverImage: '/teddy-geo-charcoal-hover.jpg', 
    discount: '-56%',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 38, 
    name: 'Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Teal', 
    price: '£19.02 – £30.70', 
    image: '/teddy-geo-teal.jpg', 
    hoverImage: '/teddy-geo-teal-hover.jpg', 
    discount: '-56%',
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 39, 
    name: 'Luxurious Geo Shaggy Faux Fur Fleece Duvet Cover with Pillowcases', 
    price: '£19.02 – £30.70', 
    image: '/teddy-geo-shaggy.jpg', 
    hoverImage: '/teddy-geo-shaggy-hover.jpg', 
    discount: '-52%',
    color: 'Shaggy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 40, 
    name: 'Luxurious GEO Triangle Fleece Duvet Cover with Pillowcases – Blush Pink', 
    price: '£23.78 – £30.70', 
    image: '/teddy-geo-triangle-blush.jpg', 
    hoverImage: '/teddy-geo-triangle-blush-hover.jpg', 
    discount: '-52%',
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 41, 
    name: 'Luxurious GEO Triangle Fleece Duvet Cover with Pillowcases – Navy', 
    price: '£23.78 – £30.70', 
    image: '/teddy-geo-triangle-navy.jpg', 
    hoverImage: '/teddy-geo-triangle-navy-hover.jpg', 
    discount: '-52%',
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 42, 
    name: 'Luxurious Pom Pom Fleece Duvet Cover with Pillowcases – Ice Pink', 
    price: '£23.78 – £30.70', 
    image: '/teddy-pom-ice-pink.jpg', 
    hoverImage: '/teddy-pom-ice-pink-hover.jpg', 
    discount: '-56%',
    color: 'Ice Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 43, 
    name: 'Luxurious Pom Pom Fleece Duvet Cover with Pillowcases – Silver', 
    price: '£19.02 – £30.70', 
    image: '/teddy-pom-silver.jpg', 
    hoverImage: '/teddy-pom-silver-hover.jpg', 
    discount: '-56%',
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 44, 
    name: 'Luxurious Reversible Sparkle Ribbed Fleece Duvet Cover with Pillowcases', 
    price: '£19.02 – £30.70', 
    image: '/teddy-sparkle-ribbed.jpg', 
    hoverImage: '/teddy-sparkle-ribbed-hover.jpg', 
    discount: '-52%',
    color: 'Sparkle',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 45, 
    name: 'Luxurious ROUCHED FAUX FUR Fleece Duvet Cover with Pillowcases – Grey', 
    price: '£19.02 – £30.70', 
    image: '/teddy-rouched-grey.jpg', 
    hoverImage: '/teddy-rouched-grey-hover.jpg', 
    discount: '-52%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 46, 
    name: 'Luxurious ROUCHED FAUX FUR Fleece Duvet Cover with Pillowcases – Natural', 
    price: '£19.02 – £30.70', 
    image: '/teddy-rouched-natural.jpg', 
    hoverImage: '/teddy-rouched-natural-hover.jpg', 
    discount: '-52%',
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 47, 
    name: 'Luxury Super Soft & Reversible Teddy Fleece Duvet Cover and Pillowcase', 
    price: '£23.78 – £30.70', 
    image: '/teddy-super-soft.jpg', 
    hoverImage: '/teddy-super-soft-hover.jpg', 
    discount: '-62%',
    color: 'Teddy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 48, 
    name: 'Luxury Super Soft & Reversible Waffle Teddy Fleece Duvet Set- Black', 
    price: '£23.78 – £33.29', 
    image: '/teddy-waffle-black.jpg', 
    hoverImage: '/teddy-waffle-black-hover.jpg', 
    discount: '-60%',
    color: 'Black',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 49, 
    name: 'Luxury Super Soft & Reversible Waffle Teddy Fleece Duvet Set- Rust', 
    price: '£28.97 – £30.70', 
    image: '/teddy-waffle-rust.jpg', 
    hoverImage: '/teddy-waffle-rust-hover.jpg', 
    discount: '-62%',
    color: 'Rust',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 50, 
    name: 'Teddy Dazzling Star Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-blush.jpg', 
    hoverImage: '/teddy-star-blush-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 51, 
    name: 'Teddy Dazzling Star Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-charcoal.jpg', 
    hoverImage: '/teddy-star-charcoal-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 52, 
    name: 'Teddy Dazzling Star Duvet Cover and Pillowcase Set – Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-grey.jpg', 
    hoverImage: '/teddy-star-grey-hover.jpg', 
    discount: '',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 53, 
    name: 'Teddy Highland Check Duvet Cover and Pillowcase Set – Grey/Ochre', 
    price: '£23.78 – £49.99', 
    image: '/teddy-highland-grey-ochre.jpg', 
    hoverImage: '/teddy-highland-grey-ochre-hover.jpg', 
    discount: '-60%',
    color: 'Grey/Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 54, 
    name: 'Teddy Highland Check Duvet Cover and Pillowcase Set – Grey/Pink', 
    price: '£19.02 – £28.97', 
    image: '/teddy-highland-grey-pink.jpg', 
    hoverImage: '/teddy-highland-grey-pink-hover.jpg', 
    discount: '-62%',
    color: 'Grey/Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 55, 
    name: 'Teddy Highland Check Duvet Cover and Pillowcase Set – Navy/Red', 
    price: '£19.02 – £28.97', 
    image: '/teddy-highland-navy-red.jpg', 
    hoverImage: '/teddy-highland-navy-red-hover.jpg', 
    discount: '-62%',
    isSoldOut: true,
    color: 'Navy/Red',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 56, 
    name: 'Teddy Lincoln Check Duvet Cover and Pillowcase Set – Grey/Red', 
    price: '£19.02 – £28.97', 
    image: '/teddy-lincoln-grey-red.jpg', 
    hoverImage: '/teddy-lincoln-grey-red-hover.jpg', 
    discount: '-62%',
    color: 'Grey/Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 57, 
    name: 'Teddy Lincoln Check Duvet Cover and Pillowcase Set – Natural', 
    price: '£19.02 – £28.97', 
    image: '/teddy-lincoln-natural.jpg', 
    hoverImage: '/teddy-lincoln-natural-hover.jpg', 
    discount: '-62%',
    isSoldOut: true,
    color: 'Natural',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 58, 
    name: 'Teddy Lincoln Check Duvet Cover and Pillowcase Set – Navy/Red', 
    price: '£19.02 – £28.97', 
    image: '/teddy-lincoln-navy-red.jpg', 
    hoverImage: '/teddy-lincoln-navy-red-hover.jpg', 
    discount: '-62%',
    isSoldOut: true,
    color: 'Navy/Red',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 59, 
    name: 'Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-nuevo-blush.jpg', 
    hoverImage: '/teddy-nuevo-blush-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 60, 
    name: 'Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-nuevo-charcoal.jpg', 
    hoverImage: '/teddy-nuevo-charcoal-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 61, 
    name: 'Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-nuevo-grey.jpg', 
    hoverImage: '/teddy-nuevo-grey-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 62, 
    name: 'Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Purple', 
    price: '£49.99 – £69.99', 
    image: '/teddy-nuevo-purple.jpg', 
    hoverImage: '/teddy-nuevo-purple-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 63, 
    name: 'Teddy OCO Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-oco-charcoal.jpg', 
    hoverImage: '/teddy-oco-charcoal-hover.jpg', 
    discount: '',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 64, 
    name: 'Teddy OCO Duvet Cover and Pillowcase Set – Pink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-oco-pink.jpg', 
    hoverImage: '/teddy-oco-pink-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Pink',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 65, 
    name: 'Teddy OCO Duvet Cover and Pillowcase Set – Silver', 
    price: '£49.99 – £69.99', 
    image: '/teddy-oco-silver.jpg', 
    hoverImage: '/teddy-oco-silver-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Silver',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 66, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Aubergine', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-aubergine.jpg', 
    hoverImage: '/teddy-plain-aubergine-hover.jpg', 
    discount: '-62%',
    color: 'Aubergine',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 67, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Black', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-black.jpg', 
    hoverImage: '/teddy-plain-black-hover.jpg', 
    discount: '-62%',
    color: 'Black',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 68, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-charcoal.jpg', 
    hoverImage: '/teddy-plain-charcoal-hover.jpg', 
    discount: '-62%',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 69, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Cream', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-cream.jpg', 
    hoverImage: '/teddy-plain-cream-hover.jpg', 
    discount: '-62%',
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 70, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Mink', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-mink.jpg', 
    hoverImage: '/teddy-plain-mink-hover.jpg', 
    discount: '-62%',
    color: 'Mink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 71, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Ochre', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-ochre.jpg', 
    hoverImage: '/teddy-plain-ochre-hover.jpg', 
    discount: '-62%',
    color: 'Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 72, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Pink', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-pink.jpg', 
    hoverImage: '/teddy-plain-pink-hover.jpg', 
    discount: '-62%',
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 73, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Red', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-red.jpg', 
    hoverImage: '/teddy-plain-red-hover.jpg', 
    discount: '-62%',
    color: 'Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 74, 
    name: 'Teddy Plain Duvet Cover and Pillowcase Set – Silver', 
    price: '£19.02 – £28.97', 
    image: '/teddy-plain-silver.jpg', 
    hoverImage: '/teddy-plain-silver-hover.jpg', 
    discount: '-62%',
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 75, 
    name: 'Teddy Popcorn Duvet Cover and Pillowcase Set – Coral', 
    price: '£49.99 – £69.99', 
    image: '/teddy-popcorn-coral.jpg', 
    hoverImage: '/teddy-popcorn-coral-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Coral',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 76, 
    name: 'Teddy Popcorn Duvet Cover and Pillowcase Set – Cream', 
    price: '£49.99 – £69.99', 
    image: '/teddy-popcorn-cream.jpg', 
    hoverImage: '/teddy-popcorn-cream-hover.jpg', 
    discount: '',
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 77, 
    name: 'Teddy Popcorn Duvet Cover and Pillowcase Set – Mink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-popcorn-mink.jpg', 
    hoverImage: '/teddy-popcorn-mink-hover.jpg', 
    discount: '',
    color: 'Mink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 78, 
    name: 'Teddy Popcorn Duvet Cover and Pillowcase Set – Ochre', 
    price: '£49.99 – £69.99', 
    image: '/teddy-popcorn-ochre.jpg', 
    hoverImage: '/teddy-popcorn-ochre-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Ochre',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 79, 
    name: 'Teddy Popcorn Duvet Cover and Pillowcase Set – Rust', 
    price: '£49.99 – £69.99', 
    image: '/teddy-popcorn-rust.jpg', 
    hoverImage: '/teddy-popcorn-rust-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Rust',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 80, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Blue/Light Blue', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-blue.jpg', 
    hoverImage: '/teddy-reversible-blue-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Blue/Light Blue',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 81, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Blush Pink/Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-blush-grey.jpg', 
    hoverImage: '/teddy-reversible-blush-grey-hover.jpg', 
    discount: '',
    color: 'Blush Pink/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 82, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Charcoal/Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-charcoal-grey.jpg', 
    hoverImage: '/teddy-reversible-charcoal-grey-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Charcoal/Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 83, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Dark Pink/Pink', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-dark-pink.jpg', 
    hoverImage: '/teddy-reversible-dark-pink-hover.jpg', 
    discount: '',
    color: 'Dark Pink/Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 84, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Deep Red/Charcoal', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-red-charcoal.jpg', 
    hoverImage: '/teddy-reversible-red-charcoal-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Deep Red/Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 85, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Green/Light Green', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-green.jpg', 
    hoverImage: '/teddy-reversible-green-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Green/Light Green',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 86, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Lilac/Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-lilac.jpg', 
    hoverImage: '/teddy-reversible-lilac-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Lilac/Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 87, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Ochre/Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-ochre.jpg', 
    hoverImage: '/teddy-reversible-ochre-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Ochre/Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 88, 
    name: 'Teddy Reversible Duvet Cover and Pillowcase Set – Rust/Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-reversible-rust.jpg', 
    hoverImage: '/teddy-reversible-rust-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Rust/Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 89, 
    name: 'Teddy Star Duvet Cover and Pillowcase Set – Grey', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-grey.jpg', 
    hoverImage: '/teddy-star-grey-hover.jpg', 
    discount: '',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 90, 
    name: 'Teddy Star Duvet Cover and Pillowcase Set – Navy', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-navy.jpg', 
    hoverImage: '/teddy-star-navy-hover.jpg', 
    discount: '',
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 91, 
    name: 'Teddy Star Duvet Cover and Pillowcase Set – Red', 
    price: '£49.99 – £69.99', 
    image: '/teddy-star-red.jpg', 
    hoverImage: '/teddy-star-red-hover.jpg', 
    discount: '',
    isSoldOut: true,
    color: 'Red',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 92, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-charcoal.jpg', 
    hoverImage: '/unicorn-star-charcoal-hover.jpg', 
    discount: '-62%',
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 93, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Cream', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-cream.jpg', 
    hoverImage: '/unicorn-star-cream-hover.jpg', 
    discount: '-62%',
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 94, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Grey', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-grey.jpg', 
    hoverImage: '/unicorn-star-grey-hover.jpg', 
    discount: '-62%',
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  { 
    id: 95, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Natural', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-natural.jpg', 
    hoverImage: '/unicorn-star-natural-hover.jpg', 
    discount: '-62%',
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 96, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Pink', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-pink.jpg', 
    hoverImage: '/unicorn-star-pink-hover.jpg', 
    discount: '-62%',
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  { 
    id: 97, 
    name: 'Unicorn Star Foil Duvet Cover and Pillowcase Set – Purple', 
    price: '£19.02 – £28.97', 
    image: '/unicorn-star-purple.jpg', 
    hoverImage: '/unicorn-star-purple-hover.jpg', 
    discount: '-62%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  }
];

const TeddyDuvetSetPage = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();

  // Extract unique colors from products
  const uniqueColors = Array.from(new Set(products.map(p => p.color)));

  // Filter products based on price, color and size
  const filteredProducts = products.filter(product => {
    const [minPrice, maxPrice] = priceRange;
    const price = parseFloat(product.price.split('£')[1].split('–')[0].trim());
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes[size as keyof typeof product.sizes]);
    return price >= minPrice && price <= maxPrice && colorMatch && sizeMatch;
  });

  const isInWishlist = (productId: number) => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const items = JSON.parse(savedWishlist);
        return Array.isArray(items) && items.some(item => item.id === `teddy_${productId}`);
      }
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
    return false;
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        if (Array.isArray(items)) {
          setWishlist(items.map((item: any) => item.id));
        }
      } catch (error) {
        console.error('Error parsing wishlist:', error);
        setWishlist([]);
      }
    }
  }, []);

  const toggleWishlist = (id: number) => {
    try {
      const prefixedId = `teddy_${id}`;
      const savedWishlist = localStorage.getItem('wishlist');
      const existingItems = savedWishlist ? JSON.parse(savedWishlist) : [];
      
      if (!Array.isArray(existingItems)) {
        throw new Error('Invalid wishlist format');
      }

      const product = products.find(p => p.id === id);
      if (!product) return;

      const newItem = {
        id: prefixedId,
        name: product.name,
        price: product.price,
        image: product.image,
        hoverImage: product.hoverImage,
        discount: product.discount,
        color: product.color,
        sizes: {
          single: product.sizes.single,
          double: product.sizes.double,
          king: product.sizes.king,
          superKing: product.sizes.superKing
        }
      };

      const isCurrentlyInWishlist = existingItems.some(item => item.id === prefixedId);
      const updatedItems = isCurrentlyInWishlist
        ? existingItems.filter(item => item.id !== prefixedId)
        : [...existingItems, newItem];

      localStorage.setItem('wishlist', JSON.stringify(updatedItems));
      setWishlist(updatedItems.map(item => item.id));
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Category Image Section */}
        <div style={{
          width: '100%',
          height: '700px',
          position: 'relative',
          marginBottom: '60px'
        }}>
          <Image
            src="/TEDDY.jpg"
            alt="Teddy Duvet Sets Category"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              zIndex: 10
            }}>
              <button
                onClick={() => router.push('/shop-duvet-set-by-type')}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#222" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </div>
            <div style={{
              textAlign: 'center',
              maxWidth: '1000px',
              padding: '0 20px'
            }}>
              <h1 style={{
                color: '#fff',
                fontSize: '72px',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2',
                marginBottom: '20px'
              }}>Teddy Duvet Sets</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of premium teddy duvet sets, perfect for creating a cozy and stylish bedroom
              </p>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          minHeight: '100vh'
        }}>
          {/* Filters Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 50px'
          }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                padding: '0 10px',
                cursor: 'pointer'
              }}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#222',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                Filters
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: isFiltersOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </h2>
              <div style={{
                height: '1px',
                flex: 1,
                background: 'linear-gradient(to right, #eee, transparent)'
              }} />
            </div>

            {isFiltersOpen && (
              <div style={{
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap',
                padding: '0 10px',
                animation: 'slideDown 0.3s ease'
              }}>
                {/* Price Range Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Price Range</span>
                  </div>
                  <div style={{
                    padding: '0 10px'
                  }}>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      style={{
                        width: '100%',
                        height: '2px',
                        WebkitAppearance: 'none',
                        background: '#ddd',
                        outline: 'none',
                        marginBottom: '15px'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#666',
                      fontSize: '15px'
                    }}>
                      <span>£{priceRange[0]}</span>
                      <span>£{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Color Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Colors</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {uniqueColors.map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColors(prev =>
                            prev.includes(color)
                              ? prev.filter(c => c !== color)
                              : [...prev, color]
                          );
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedColors.includes(color) ? '#222' : '#eee',
                          background: selectedColors.includes(color) ? '#222' : 'transparent',
                          color: selectedColors.includes(color) ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedColors.includes(color)) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedColors.includes(color)) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedColors.includes(color) && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M3 12h18M3 18h18"/>
                    </svg>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Sizes</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {[
                      { id: 'single', label: 'Single (135cm x 200cm)' },
                      { id: 'double', label: 'Double (200cm x 200cm)' },
                      { id: 'king', label: 'King (220cm x 235cm)' },
                      { id: 'superKing', label: 'Super King (220cm x 260cm)' }
                    ].map(size => (
                      <button
                        key={size.id}
                        onClick={() => {
                          setSelectedSizes(prev =>
                            prev.includes(size.id)
                              ? prev.filter(s => s !== size.id)
                              : [...prev, size.id]
                          );
                        }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSizes.includes(size.id) ? '#222' : '#eee',
                          background: selectedSizes.includes(size.id) ? '#222' : 'transparent',
                          color: selectedSizes.includes(size.id) ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          textAlign: 'left',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedSizes.includes(size.id)) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedSizes.includes(size.id)) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedSizes.includes(size.id) && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Count */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            padding: '0 10px',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            <div style={{
              fontSize: '16px',
              color: '#666',
              fontWeight: 500
            }}>
              {filteredProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  boxShadow: hoveredItem === product.id 
                    ? '0 8px 32px rgba(34,34,34,0.12)' 
                    : '0 2px 16px rgba(34,34,34,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredItem === product.id ? 'translateY(-4px)' : 'none'
                }}
                onMouseEnter={() => setHoveredItem(product.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={hoveredItem === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredItem === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isInWishlist(product.id) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isInWishlist(product.id) ? '#e53935' : 'none'}
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => {/* Add to cart functionality */}}
                    style={{
                      position: 'absolute',
                      top: '64px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
                  {product.discount && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#e53935',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '50%',
                      width: '47px',
                      height: '47px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(229,57,53,0.2)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {product.discount}
                    </span>
                  )}
                  {product.isHot && (
                    <span style={{
                      position: 'absolute',
                      top: '67px',
                      left: '12px',
                      background: '#000',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '50%',
                      width: '47px',
                      height: '47px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      HOT
                    </span>
                  )}
                  {product.isSoldOut && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: 600,
                      backdropFilter: 'blur(2px)'
                    }}>
                      Sold Out
                    </div>
                  )}
                </div>
                <div style={{
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#222',
                    lineHeight: '1.4'
                  }}>{product.name}</h3>
                  <div style={{
                    color: '#e53935',
                    fontWeight: 700,
                    fontSize: '20px',
                    marginBottom: '12px'
                  }}>{product.price}</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {Object.entries(product.sizes).map(([size, available]) => (
                      <div
                        key={size}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          color: available ? '#444' : '#999'
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={available ? '#222' : '#999'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {available ? (
                            <path d="M20 6L9 17l-5-5"/>
                          ) : (
                            <path d="M18 6L6 18M6 6l12 12"/>
                          )}
                        </svg>
                        {size === 'single' && 'Single (135cm x 200cm)'}
                        {size === 'double' && 'Double (200cm x 200cm)'}
                        {size === 'king' && 'King (220cm x 235cm)'}
                        {size === 'superKing' && 'Super King (220cm x 260cm)'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TeddyDuvetSetPage; 