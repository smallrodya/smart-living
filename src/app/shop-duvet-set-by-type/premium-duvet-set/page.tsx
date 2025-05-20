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
    single: boolean;    // 135cm X 200cm
    double: boolean;    // 200cm X 200cm
    king: boolean;      // 220cm X 235cm
    superKing: boolean; // 220cm X 260cm
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "Alford Duvet Cover and Pillowcase Set – Aubergine",
    price: "£17.29 – £26.81",
    image: '/premium-duvet4.jpg',
    hoverImage: '/premium-duvet4-hover.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Aubergine',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 2,
    name: "Alford Duvet Cover and Pillowcase Set – Black",
    price: "£17.29 – £26.81",
    image: '/premium-duvet5.jpg',
    hoverImage: '/premium-duvet5-hover.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Black',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 3,
    name: "Alford Duvet Cover and Pillowcase Set – Charcoal",
    price: "£17.29 – £26.81",
    image: '/premium-duvet6.jpg',
    hoverImage: '/premium-duvet6.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 4,
    name: "Alford Duvet Cover and Pillowcase Set – Cream",
    price: "£17.29 – £26.81",
    image: '/premium-duvet7.jpg',
    hoverImage: '/premium-duvet7.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 5,
    name: "Alford Duvet Cover and Pillowcase Set – Duck Egg",
    price: "£17.29 – £26.81",
    image: '/premium-duvet8.jpg',
    hoverImage: '/premium-duvet8.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Duck Egg',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 6,
    name: "Alford Duvet Cover and Pillowcase Set – Latte",
    price: "£17.29 – £26.81",
    image: '/premium-duvet9.jpg',
    hoverImage: '/premium-duvet9-hover.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Latte',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 7,
    name: "Alford Duvet Cover and Pillowcase Set – Navy",
    price: "£17.29 – £26.81",
    image: '/premium-duvet10.jpg',
    hoverImage: '/premium-duvet10-hover.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true,
    }
  },
  {
    id: 8,
    name: "Alford Duvet Cover and Pillowcase Set – Ochre",
    price: "£17.29 – £26.81",
    image: '/premium-duvet11.jpg',
    hoverImage: '/premium-duvet11.jpg',
    discount: '-65%',
    isSoldOut: true,
    color: 'Ochre',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 9,
    name: "Alford Duvet Cover and Pillowcase Set – Silver",
    price: "£17.29 – £26.81",
    image: '/premium-duvet12.jpg',
    hoverImage: '/premium-duvet12.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 10,
    name: "Alford Duvet Cover and Pillowcase Set – Soft Pink",
    price: "£17.29 – £26.81",
    image: '/premium-duvet13.jpg',
    hoverImage: '/premium-duvet13.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'Soft Pink',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 11,
    name: "Alford Duvet Cover and Pillowcase Set – White",
    price: "£17.29 – £26.81",
    image: '/premium-duvet14.jpg',
    hoverImage: '/premium-duvet14.jpg',
    discount: '-65%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 12,
    name: "Alina Duvet Cover and Pillowcase Set – Black",
    price: "£15.56 – £19.89",
    image: '/premium-duvet15.jpg',
    hoverImage: '/premium-duvet15.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'Black',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 13,
    name: "Alina Duvet Cover and Pillowcase Set – Red",
    price: "£15.56 – £19.89",
    image: '/premium-duvet16.jpg',
    hoverImage: '/premium-duvet16.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'Red',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 14,
    name: "Aura Duvet Cover and Pillowcase Set – Oyster",
    price: "£13.40 – £20.98",
    image: '/premium-duvet17.jpg',
    hoverImage: '/premium-duvet17.jpg',
    discount: '-74%',
    isSoldOut: false,
    color: 'Oyster',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 15,
    name: "Aura Duvet Cover and Pillowcase Set – Silver",
    price: "£13.40 – £20.98",
    image: '/premium-duvet18.jpg',
    hoverImage: '/premium-duvet18.jpg',
    discount: '-74%',
    isSoldOut: false,
    color: 'Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 16,
    name: "Aura Duvet Cover and Pillowcase Set – White",
    price: "£13.40 – £20.98",
    image: '/premium-duvet19.jpg',
    hoverImage: '/premium-duvet19.jpg',
    discount: '-74%',
    isSoldOut: true,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 17,
    name: "Devore Duvet Cover and Pillowcase Set – White/Black",
    price: "£21.62 – £32.43",
    image: '/premium-duvet25.jpg',
    hoverImage: '/premium-duvet25.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'White/Black',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 18,
    name: "Devore Duvet Cover and Pillowcase Set – White/Charcoal",
    price: "£21.62 – £32.43",
    image: '/premium-duvet26.jpg',
    hoverImage: '/premium-duvet26.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'White/Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 19,
    name: "Devore Duvet Cover and Pillowcase Set – White/Grey",
    price: "£21.62 – £32.43",
    image: '/premium-duvet27.jpg',
    hoverImage: '/premium-duvet27.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'White/Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 20,
    name: "Devore Duvet Cover and Pillowcase Set – White/Latte",
    price: "£21.62 – £32.43",
    image: '/premium-duvet28.jpg',
    hoverImage: '/premium-duvet28.jpg',
    discount: '-62%',
    isSoldOut: true,
    color: 'White/Latte',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 21,
    name: "Devore Duvet Cover and Pillowcase Set – White/Navy",
    price: "£21.62 – £32.43",
    image: '/premium-duvet29.jpg',
    hoverImage: '/premium-duvet29.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'White/Navy',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 22,
    name: "Devore Duvet Cover and Pillowcase Set – White/Pink",
    price: "£21.62 – £32.43",
    image: '/premium-duvet30.jpg',
    hoverImage: '/premium-duvet30.jpg',
    discount: '-62%',
    isSoldOut: true,
    color: 'White/Pink',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 23,
    name: "Devore Duvet Cover and Pillowcase Set – White/White",
    price: "£21.62 – £32.43",
    image: '/premium-duvet31.jpg',
    hoverImage: '/premium-duvet31.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'White/White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 24,
    name: "Embossed Seersucker Duvet Cover and Pillowcase Set – Charcoal",
    price: "£19.02 – £29.99",
    image: '/premium-duvet32.jpg',
    hoverImage: '/premium-duvet32.jpg',
    discount: '-60%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 25,
    name: "Floral Leaf Velvet Cuff Duvet Cover and Pillowcase Set – Ivory",
    price: "£14.70 – £19.02",
    image: '/premium-duvet33.jpg',
    hoverImage: '/premium-duvet33.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'Ivory',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 26,
    name: "Glamorous Duvet Cover and Pillowcase Set – Aubergine",
    price: "£17.29 – £79.99",
    image: '/premium-duvet34.jpg',
    hoverImage: '/premium-duvet34.jpg',
    discount: '-66%',
    isSoldOut: true,
    color: 'Aubergine',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 27,
    name: "Glamorous Duvet Cover and Pillowcase Set – Black",
    price: "£17.29 – £79.99",
    image: '/premium-duvet35.jpg',
    hoverImage: '/premium-duvet35.jpg',
    discount: '-66%',
    isSoldOut: true,
    color: 'Black',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 28,
    name: "Glamorous Duvet Cover and Pillowcase Set – Chambray",
    price: "£17.29 – £79.99",
    image: '/premium-duvet36.jpg',
    hoverImage: '/premium-duvet36.jpg',
    discount: '-66%',
    isSoldOut: false,
    color: 'Chambray',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 29,
    name: "Glamorous Duvet Cover and Pillowcase Set – Cream",
    price: "£17.29 – £79.99",
    image: '/premium-duvet37.jpg',
    hoverImage: '/premium-duvet37.jpg',
    discount: '-66%',
    isSoldOut: false,
    color: 'Cream',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 30,
    name: "Glamorous Duvet Cover and Pillowcase Set – Natural",
    price: "£17.29 – £79.99",
    image: '/premium-duvet38.jpg',
    hoverImage: '/premium-duvet38.jpg',
    discount: '-66%',
    isSoldOut: false,
    color: 'Natural',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 31,
    name: "Glamorous Duvet Cover and Pillowcase Set – Silver",
    price: "£17.29 – £79.99",
    image: '/premium-duvet39.jpg',
    hoverImage: '/premium-duvet39.jpg',
    discount: '-66%',
    isSoldOut: true,
    color: 'Silver',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 32,
    name: "Glamorous Duvet Cover and Pillowcase Set – White",
    price: "£17.29 – £79.99",
    image: '/premium-duvet40.jpg',
    hoverImage: '/premium-duvet40.jpg',
    discount: '-66%',
    isSoldOut: true,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 33,
    name: "Katie Duvet Cover and Pillowcase Set – Chambray Silver",
    price: "£17.29 – £79.99",
    image: '/premium-duvet44.jpg',
    hoverImage: '/premium-duvet44.jpg',
    discount: '-67%',
    isSoldOut: false,
    color: 'Chambray Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 34,
    name: "Katie Duvet Cover and Pillowcase Set – Cream Gold",
    price: "£17.29 – £79.99",
    image: '/premium-duvet45.jpg',
    hoverImage: '/premium-duvet45.jpg',
    discount: '-67%',
    isSoldOut: false,
    color: 'Cream Gold',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 35,
    name: "Lush Duvet Cover and Pillowcase Set – Oyster",
    price: "£15.56 – £79.99",
    image: '/premium-duvet46.jpg',
    hoverImage: '/premium-duvet46.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'Oyster',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 36,
    name: "Lush Duvet Cover and Pillowcase Set – Silver",
    price: "£49.99 – £79.99",
    image: '/premium-duvet47.jpg',
    hoverImage: '/premium-duvet47.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Silver',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 37,
    name: "Lush Duvet Cover and Pillowcase Set – White",
    price: "£49.99 – £79.99",
    image: '/premium-duvet48.jpg',
    hoverImage: '/premium-duvet48.jpg',
    discount: '',
    isSoldOut: true,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 38,
    name: "Luxury Block Check Print Reversible Duvet Set- Blue",
    price: "£9.51 – £19.02",
    image: '/premium-duvet49.jpg',
    hoverImage: '/premium-duvet49.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'Blue',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 39,
    name: "Luxury Block Check Print Reversible Duvet Set- Grey",
    price: "£9.51 – £19.02",
    image: '/premium-duvet50.jpg',
    hoverImage: '/premium-duvet50.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 40,
    name: "Luxury Fleece Polka Dot Duvet Cover with Pillowcases- Grey",
    price: "£18.16 – £24.21",
    image: '/premium-duvet51.jpg',
    hoverImage: '/premium-duvet51.jpg',
    discount: '-57%',
    isSoldOut: false,
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 41,
    name: "Luxury Hotel Quality Boho Embroidered Tassels Duvet Cover with Pillowcases – Blush",
    price: "£16.43 – £22.48",
    image: '/premium-duvet52.jpg',
    hoverImage: '/premium-duvet52.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Blush',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 42,
    name: "Luxury Hotel Quality Boho Embroidered Tassels Duvet Cover with Pillowcases – Charcoal",
    price: "£17.29 – £22.48",
    image: '/premium-duvet53.jpg',
    hoverImage: '/premium-duvet53.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 43,
    name: "Luxury Hotel Quality Boho Embroidered Tassels Duvet Cover with Pillowcases – White",
    price: "£16.43 – £22.48",
    image: '/premium-duvet54.jpg',
    hoverImage: '/premium-duvet54.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 44,
    name: "Luxury Hotel Quality Diamonte Embellished Duvet Cover with Pillowcases – Blush",
    price: "£16.43 – £22.48",
    image: '/premium-duvet55.jpg',
    hoverImage: '/premium-duvet55.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Blush',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 45,
    name: "Luxury Hotel Quality Diamonte Embellished Duvet Cover with Pillowcases – Charcoal",
    price: "£16.43 – £22.48",
    image: '/premium-duvet56.jpg',
    hoverImage: '/premium-duvet56.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 46,
    name: "Luxury Hotel Quality Lurex Jacquard Geometric Deco Duvet Cover with Pillowcases – Natural",
    price: "£16.43 – £22.48",
    image: '/premium-duvet57.jpg',
    hoverImage: '/premium-duvet57.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Natural',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 47,
    name: "Luxury Hotel Quality Lurex Jacquard Geometric Deco Duvet Cover with Pillowcases – Silver",
    price: "£16.43 – £22.48",
    image: '/premium-duvet58.jpg',
    hoverImage: '/premium-duvet58.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 48,
    name: "Luxury Hotel Quality Lurex Jacquard Swirl Duvet Cover with Pillowcases",
    price: "£24.44 – £32.43",
    image: '/premium-duvet59.jpg',
    hoverImage: '/premium-duvet59.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 49,
    name: "Luxury Hotel Quality Lurex Stripe Jacquard Duvet Cover with Pillowcases – White/Mink",
    price: "£12.97 – £32.43",
    image: '/premium-duvet60.jpg',
    hoverImage: '/premium-duvet60.jpg',
    discount: '-74%',
    isSoldOut: false,
    color: 'White/Mink',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 50,
    name: "Luxury Hotel Quality Lurex Stripe Jacquard Duvet Cover with Pillowcases – White/Silver",
    price: "£12.97 – £32.43",
    image: '/premium-duvet61.jpg',
    hoverImage: '/premium-duvet61.jpg',
    discount: '-74%',
    isSoldOut: false,
    color: 'White/Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 51,
    name: "Luxury Hotel Quality Reversible Ribbed Velvet Duvet Cover with Pillowcases – Blue",
    price: "£16.95 – £22.48",
    image: '/premium-duvet62.jpg',
    hoverImage: '/premium-duvet62.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'Blue',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 52,
    name: "Luxury Hotel Quality Reversible Ribbed Velvet Duvet Cover with Pillowcases – Blush",
    price: "£12.97 – £22.48",
    image: '/premium-duvet63.jpg',
    hoverImage: '/premium-duvet63.jpg',
    discount: '0%',
    color: 'Blush',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 53,
    name: "Luxury Hotel Quality Reversible Tufted Arch Duvet Cover with Pillowcases – Champagne",
    price: "£21.62 – £32.43",
    image: '/premium-duvet64.jpg',
    hoverImage: '/premium-duvet64.jpg',
    discount: '0%',
    color: 'Champagne',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 54,
    name: "Luxury Hotel Quality Reversible Tufted Arch Duvet Cover with Pillowcases – White",
    price: "£24.99 – £37.49",
    image: '/premium-duvet65.jpg',
    hoverImage: '/premium-duvet65.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 55,
    name: "Luxury Hotel Quality Tufted Circles Duvet Cover with Pillowcases – Blush",
    price: "£16.43 – £21.62",
    image: '/premium-duvet66.jpg',
    hoverImage: '/premium-duvet66.jpg',
    discount: '0%',
    color: 'Blush',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 56,
    name: "Luxury Hotel Quality Tufted Circles Duvet Cover with Pillowcases – White",
    price: "£15.56 – £21.62",
    image: '/premium-duvet67.jpg',
    hoverImage: '/premium-duvet67.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 57,
    name: "Luxury Hotel Quality Tufted Wave Duvet Cover with Pillowcases",
    price: "£18.16 – £32.43",
    image: '/premium-duvet68.jpg',
    hoverImage: '/premium-duvet68.jpg',
    discount: '0%',
    color: 'Wave',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 58,
    name: "Luxury Satin Stripe Reversible Duvet Cover Quilt Bedding Set with Pillowcase – Black",
    price: "£12.97 – £15.99",
    image: '/premium-duvet69.jpg',
    hoverImage: '/premium-duvet69.jpg',
    discount: '0%',
    color: 'Black',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 59,
    name: "Luxury Satin Stripe Reversible Duvet Cover Quilt Bedding Set with Pillowcase – Grey",
    price: "£12.97 – £15.99",
    image: '/premium-duvet70.jpg',
    hoverImage: '/premium-duvet70.jpg',
    discount: '0%',
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 60,
    name: "Luxury Satin Stripe Reversible Duvet Cover Quilt Bedding Set with Pillowcase – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet71.jpg',
    hoverImage: '/premium-duvet71.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 61,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – Black",
    price: "£12.97 – £15.99",
    image: '/premium-duvet72.jpg',
    hoverImage: '/premium-duvet72.jpg',
    discount: '0%',
    color: 'Black',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 62,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – Blush",
    price: "£12.97 – £15.99",
    image: '/premium-duvet73.jpg',
    hoverImage: '/premium-duvet73.jpg',
    discount: '0%',
    color: 'Blush',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 63,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – Grey",
    price: "£12.97 – £15.99",
    image: '/premium-duvet74.jpg',
    hoverImage: '/premium-duvet74.jpg',
    discount: '0%',
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 64,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – Navy",
    price: "£12.97 – £15.99",
    image: '/premium-duvet75.jpg',
    hoverImage: '/premium-duvet75.jpg',
    discount: '0%',
    color: 'Navy',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 65,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet76.jpg',
    hoverImage: '/premium-duvet76.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 66,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet77.jpg',
    hoverImage: '/premium-duvet77.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 67,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet78.jpg',
    hoverImage: '/premium-duvet78.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 68,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet79.jpg',
    hoverImage: '/premium-duvet79.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 69,
    name: "Luxury Velvet Duvet Cover and Pillowcase Set – White",
    price: "£12.97 – £15.99",
    image: '/premium-duvet80.jpg',
    hoverImage: '/premium-duvet80.jpg',
    discount: '0%',
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 70,
    name: "Luxury Super Soft Stylish Lace Panel Duvet Cover with Pillowcases – White",
    price: "£15.56 – £19.02",
    image: '/premium-duvet81.jpg',
    hoverImage: '/premium-duvet81.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 71,
    name: "Luxury Super Soft Stylish Lace Panel Duvet Cover with Pillowcases- Blush Pink",
    price: "£15.56 – £19.02",
    image: '/premium-duvet82.jpg',
    hoverImage: '/premium-duvet82.jpg',
    discount: '-73%',
    isSoldOut: false,
    color: 'Blush Pink',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 72,
    name: "Magical Winter Duvet Cover and Pillowcase Set",
    price: "£13.49",
    image: '/premium-duvet83.jpg',
    hoverImage: '/premium-duvet83.jpg',
    discount: '-81%',
    isSoldOut: true,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 73,
    name: "Onyx Duvet Cover and Pillowcase Set – Aubergine",
    price: "£8.99 – £17.29",
    image: '/premium-duvet91.jpg',
    hoverImage: '/premium-duvet91.jpg',
    discount: '-78%',
    isSoldOut: false,
    color: 'Aubergine',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 74,
    name: "Onyx Duvet Cover and Pillowcase Set – Black",
    price: "£8.99 – £17.29",
    image: '/premium-duvet92.jpg',
    hoverImage: '/premium-duvet92.jpg',
    discount: '-78%',
    isSoldOut: true,
    color: 'Black',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 75,
    name: "Onyx Duvet Cover and Pillowcase Set – Cream",
    price: "£8.99 – £17.29",
    image: '/premium-duvet93.jpg',
    hoverImage: '/premium-duvet93.jpg',
    discount: '-78%',
    isSoldOut: false,
    color: 'Cream',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 76,
    name: "Onyx Duvet Cover and Pillowcase Set – Latte",
    price: "£8.99 – £17.29",
    image: '/premium-duvet94.jpg',
    hoverImage: '/premium-duvet94.jpg',
    discount: '-78%',
    isSoldOut: false,
    color: 'Latte',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 77,
    name: "Onyx Duvet Cover and Pillowcase Set – Silver",
    price: "£12.97 – £17.29",
    image: '/premium-duvet95.jpg',
    hoverImage: '/premium-duvet95.jpg',
    discount: '-75%',
    isSoldOut: true,
    color: 'Silver',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 78,
    name: "Polycotton Jersey Melange Duvet Cover With Pillowcases – Beige",
    price: "£18.16 – £19.89",
    image: '/premium-duvet96.jpg',
    hoverImage: '/premium-duvet96.jpg',
    discount: '-56%',
    isSoldOut: false,
    color: 'Beige',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 79,
    name: "Polycotton Jersey Melange Duvet Cover With Pillowcases – CHARCOAL",
    price: "£18.16 – £19.89",
    image: '/premium-duvet97.jpg',
    hoverImage: '/premium-duvet97.jpg',
    discount: '-56%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 80,
    name: "Polycotton Jersey Melange Duvet Cover With Pillowcases – White",
    price: "£18.16 – £19.89",
    image: '/premium-duvet98.jpg',
    hoverImage: '/premium-duvet98.jpg',
    discount: '-64%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 81,
    name: "Polycotton Pintuck Duvet Cover With Pillowcases – Blush Pink",
    price: "£12.10 – £17.29",
    image: '/premium-duvet99.jpg',
    hoverImage: '/premium-duvet99.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'Blush Pink',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 82,
    name: "Polycotton Pintuck Duvet Cover With Pillowcases – Silver",
    price: "£12.10 – £17.29",
    image: '/premium-duvet100.jpg',
    hoverImage: '/premium-duvet100.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'Silver',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 83,
    name: "Polycotton Pintuck Duvet Cover With Pillowcases – White",
    price: "£12.10 – £17.29",
    image: '/premium-duvet101.jpg',
    hoverImage: '/premium-duvet101.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 84,
    name: "Pom Pom Duvet Cover and Pillowcase Set – Charcoal",
    price: "£18.99 – £31.99",
    image: '/premium-duvet102.jpg',
    hoverImage: '/premium-duvet102.jpg',
    discount: '-62%',
    isSoldOut: false,
    color: 'Charcoal',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 85,
    name: "Pom Pom Duvet Cover and Pillowcase Set – Grey",
    price: "£16.43 – £30.27",
    image: '/premium-duvet103.jpg',
    hoverImage: '/premium-duvet103.jpg',
    discount: '-67%',
    isSoldOut: false,
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 86,
    name: "Pom Pom Duvet Cover and Pillowcase Set – Natural",
    price: "£16.43 – £30.27",
    image: '/premium-duvet104.jpg',
    hoverImage: '/premium-duvet104.jpg',
    discount: '-67%',
    isSoldOut: true,
    color: 'Natural',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 87,
    name: "Pom Pom Duvet Cover and Pillowcase Set – White",
    price: "£16.43 – £30.27",
    image: '/premium-duvet105.jpg',
    hoverImage: '/premium-duvet105.jpg',
    discount: '-67%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 88,
    name: "Reversible Polycotton Fern Rouched Duvet Cover and Pillowcase Set",
    price: "£10.37 – £12.97",
    image: '/premium-duvet113.jpg',
    hoverImage: '/premium-duvet113.jpg',
    discount: '-81%',
    isSoldOut: false,
    isHot: true,
    color: 'Green',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 89,
    name: "Soft & Elegant Cosy Velvet Cuff Panel Duvet Cover Set with Pillowcases",
    price: "£17.29 – £19.89",
    image: '/premium-duvet121.jpg',
    hoverImage: '/premium-duvet121.jpg',
    discount: '-72%',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 90,
    name: "Stags Duvet Cover and Pillowcase Set – Beige",
    price: "£13.49 – £69.99",
    image: '/premium-duvet125.jpg',
    hoverImage: '/premium-duvet125.jpg',
    discount: '-78%',
    isSoldOut: false,
    color: 'Beige',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 91,
    name: "Stags Duvet Cover and Pillowcase Set – Black",
    price: "£49.99 – £69.99",
    image: '/premium-duvet126.jpg',
    hoverImage: '/premium-duvet126.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Black',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 92,
    name: "Stags Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/premium-duvet127.jpg',
    hoverImage: '/premium-duvet127.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Grey',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 93,
    name: "Stags Duvet Cover and Pillowcase Set – Red",
    price: "£13.49 – £69.99",
    image: '/premium-duvet128.jpg',
    hoverImage: '/premium-duvet128.jpg',
    discount: '-73%',
    isSoldOut: true,
    color: 'Red',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 94,
    name: "Stags in Jumper Duvet Cover and Pillowcase Set",
    price: "£49.99 – £69.99",
    image: '/premium-duvet129.jpg',
    hoverImage: '/premium-duvet129.jpg',
    discount: '',
    isSoldOut: false,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 95,
    name: "Venice Duvet Cover and Pillowcase Set – Black",
    price: "£49.99 – £79.99",
    image: '/premium-duvet130.jpg',
    hoverImage: '/premium-duvet130.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Black',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 96,
    name: "Venice Duvet Cover and Pillowcase Set – Cream",
    price: "£49.99 – £79.99",
    image: '/premium-duvet131.jpg',
    hoverImage: '/premium-duvet131.jpg',
    discount: '',
    isSoldOut: false,
    color: 'Cream',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 97,
    name: "Venice Duvet Cover and Pillowcase Set – Gold",
    price: "£49.99 – £79.99",
    image: '/premium-duvet132.jpg',
    hoverImage: '/premium-duvet132.jpg',
    discount: '',
    isSoldOut: false,
    color: 'Gold',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 98,
    name: "Venice Duvet Cover and Pillowcase Set – Natural",
    price: "£49.99 – £79.99",
    image: '/premium-duvet133.jpg',
    hoverImage: '/premium-duvet133.jpg',
    discount: '',
    isSoldOut: false,
    color: 'Natural',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 99,
    name: "Venice Duvet Cover and Pillowcase Set – Silver",
    price: "£49.99 – £79.99",
    image: '/premium-duvet134.jpg',
    hoverImage: '/premium-duvet134.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Silver',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 100,
    name: "Venice Duvet Cover and Pillowcase Set – White",
    price: "£49.99 – £79.99",
    image: '/premium-duvet135.jpg',
    hoverImage: '/premium-duvet135.jpg',
    discount: '',
    isSoldOut: false,
    color: 'White',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 101,
    name: "Verina Duvet Cover and Pillowcase Set – Aubergine",
    price: "£49.99 – £79.99",
    image: '/premium-duvet136.jpg',
    hoverImage: '/premium-duvet136.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Aubergine',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 102,
    name: "Verina Duvet Cover and Pillowcase Set – Black",
    price: "£49.99 – £79.99",
    image: '/premium-duvet137.jpg',
    hoverImage: '/premium-duvet137.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Black',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 103,
    name: "Verina Duvet Cover and Pillowcase Set – Cream",
    price: "£15.49 – £19.99",
    image: '/premium-duvet138.jpg',
    hoverImage: '/premium-duvet138.jpg',
    discount: '-75%',
    isSoldOut: false,
    color: 'Cream',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 104,
    name: "Verina Duvet Cover and Pillowcase Set – Oyster",
    price: "£49.99 – £79.99",
    image: '/premium-duvet139.jpg',
    hoverImage: '/premium-duvet139.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Oyster',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 105,
    name: "Verina Duvet Cover and Pillowcase Set – Red",
    price: "£49.99 – £79.99",
    image: '/premium-duvet140.jpg',
    hoverImage: '/premium-duvet140.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Red',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 106,
    name: "Verina Duvet Cover and Pillowcase Set – Silver",
    price: "£49.99 – £79.99",
    image: '/premium-duvet141.jpg',
    hoverImage: '/premium-duvet141.jpg',
    discount: '',
    isSoldOut: true,
    color: 'Silver',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 107,
    name: "Verina Duvet Cover and Pillowcase Set – White",
    price: "£49.99 – £79.99",
    image: '/premium-duvet142.jpg',
    hoverImage: '/premium-duvet142.jpg',
    discount: '',
    isSoldOut: true,
    color: 'White',
    sizes: { single: false, double: false, king: false, superKing: false }
  },
  {
    id: 108,
    name: "Winter Berry Stag Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/premium-duvet151.jpg',
    hoverImage: '/premium-duvet151.jpg',
    discount: '',
    isSoldOut: false,
    color: 'Grey',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 109,
    name: "Winter Berry Stag Duvet Cover and Pillowcase Set – Purple",
    price: "£49.99 – £69.99",
    image: '/premium-duvet152.jpg',
    hoverImage: '/premium-duvet152.jpg',
    discount: '',
    isSoldOut: false,
    color: 'Purple',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 110,
    name: "Xmas Slogan Duvet Cover and Pillowcase Set",
    price: "£13.49",
    image: '/premium-duvet153.jpg',
    hoverImage: '/premium-duvet153.jpg',
    discount: '-81%',
    isSoldOut: false,
    color: 'Red',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 111,
    name: "Xmas Sloth Duvet Cover and Pillowcase Set – White/Red",
    price: "£13.49",
    image: '/premium-duvet154.jpg',
    hoverImage: '/premium-duvet154.jpg',
    discount: '-81%',
    isSoldOut: false,
    color: 'White/Red',
    sizes: { single: true, double: true, king: true, superKing: true }
  },
  {
    id: 112,
    name: "Xmas Snow Globe Duvet Cover and Pillowcase Set",
    price: "£49.99 – £69.99",
    image: '/premium-duvet155.jpg',
    hoverImage: '/premium-duvet155.jpg',
    discount: '',
    isSoldOut: false,
    color: 'White/Red',
    sizes: { single: true, double: true, king: true, superKing: true }
  }
];

const PremiumDuvetSetPage = () => {
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
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => 
      size === 'single' ? product.sizes.single :
      size === 'double' ? product.sizes.double :
      size === 'king' ? product.sizes.king :
      size === 'superKing' ? product.sizes.superKing : false
    );
    return price >= minPrice && price <= maxPrice && colorMatch && sizeMatch;
  });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlist(items.map((item: any) => item.id));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const prefixedId = `premium_duvet_${id}`;
      const newWishlist = prev.includes(prefixedId) 
        ? prev.filter(i => i !== prefixedId)
        : [...prev, prefixedId];
      
      try {
        const existingItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const validItems = Array.isArray(existingItems) 
          ? existingItems.filter(item => 
              item && 
              typeof item === 'object' && 
              'id' in item && 
              typeof item.id === 'string' && 
              !item.id.startsWith('premium_duvet_')
            )
          : [];
        
        const newItems = products
          .filter((_, i) => newWishlist.includes(`premium_duvet_${i + 1}`))
          .map((item) => ({
            id: `premium_duvet_${item.id}`,
            src: item.image,
            hoverSrc: item.hoverImage,
            title: item.name,
            price: item.price,
            discount: item.discount,
            sizes: {
              single: item.sizes.single,
              double: item.sizes.double,
              king: item.sizes.king,
              superKing: item.sizes.superKing
            }
          }));
        
        const wishlistItems = [...validItems, ...newItems];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        return newWishlist;
      }
    });
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
            src="/EMBOSSED-SEERSUCKER-CHARCOAL-2-scaled-1536x1536.jpg"
            alt="Premium Duvet Set Category"
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
              }}>Premium Duvet Set</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of premium duvet sets, perfect for adding luxury and comfort to your bedroom
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
                        appearance: 'none',
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
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
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
                      { id: 'single', label: 'Single (135cm X 200cm)' },
                      { id: 'double', label: 'Double (200cm X 200cm)' },
                      { id: 'king', label: 'King (220cm X 235cm)' },
                      { id: 'superKing', label: 'Super King (220cm X 260cm)' }
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
                          padding: '8px 16px',
                          borderRadius: '6px',
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
                          gap: '6px',
                          textAlign: 'left'
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
                      transform: wishlist.includes(`premium_duvet_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`premium_duvet_${product.id}`) ? '#e53935' : 'none'}
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
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
                    marginBottom: '20px'
                  }}>{product.price}</div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    {Object.entries(product.sizes).map(([size, available]) => (
                      <span
                        key={size}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: available ? '#f5f5f5' : '#eee',
                          color: available ? '#444' : '#999',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {available ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
                        )}
                        {size === 'single' && 'Single (135cm X 200cm)'}
                        {size === 'double' && 'Double (200cm X 200cm)'}
                        {size === 'king' && 'King (220cm X 235cm)'}
                        {size === 'superKing' && 'Super King (220cm X 260cm)'}
                      </span>
                    ))}
                  </div>
                  {!product.isSoldOut && (
                    <button
                      onClick={() => {/* Add to basket logic */}}
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
                      onMouseEnter={() => setHoveredButton(product.id)}
                      onMouseLeave={() => setHoveredButton(null)}
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
                  )}
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

export default PremiumDuvetSetPage; 