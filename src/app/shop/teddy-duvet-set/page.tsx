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
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£22.05 – £31.13",
    image: '/teddy-duvet1.jpg',
    hoverImage: '/teddy-duvet1-hover.jpg',
    discount: "-56%",
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 2,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Charcoal",
    price: "£22.05 – £31.13",
    image: '/teddy-duvet2.jpg',
    hoverImage: '/teddy-duvet2-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 3,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Cream",
    price: "£69.99 Original price was: £69.99.£31.13Current price is: £31.13.",
    image: '/teddy-duvet3.jpg',
    hoverImage: '/teddy-duvet3-hover.jpg',
    discount: "-56%",
    isSoldOut: true,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 4,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Grey",
    price: "£22.05 – £31.13",
    image: '/teddy-duvet4.jpg',
    hoverImage: '/teddy-duvet4-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 5,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Navy",
    price: "£22.05 – £31.13",
    image: '/teddy-duvet5.jpg',
    hoverImage: '/teddy-duvet5-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 6,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – Purple",
    price: "£22.05 – £31.13",
    image: '/teddy-duvet6.jpg',
    hoverImage: '/teddy-duvet6-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 7,
    name: "Chiswick Pintuck Duvet Cover and Pillowcase Set – White",
    price: "£22.05 – £26.37",
    image: '/teddy-duvet7.jpg',
    hoverImage: '/teddy-duvet7-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 8,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Charcoal",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet8.jpg',
    hoverImage: '/teddy-duvet8-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 9,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Cream",
    price: "£20.75 – £49.99",
    image: '/teddy-duvet9.jpg',
    hoverImage: '/teddy-duvet9-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 10,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Natural",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet10.jpg',
    hoverImage: '/teddy-duvet10-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 11,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Navy",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet11.jpg',
    hoverImage: '/teddy-duvet11-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 12,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Purple",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet12.jpg',
    hoverImage: '/teddy-duvet12-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 13,
    name: "EMB Stag Duvet Cover and Pillowcase Set – Silver",
    price: "£24.21 – £59.99",
    image: '/teddy-duvet13.jpg',
    hoverImage: '/teddy-duvet13-hover.jpg',
    discount: "-65%",
    isSoldOut: true,
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 14,
    name: "Flannelette Duvet Cover and Pillowcase Set – Polar Bear",
    price: "£15.56 – £19.02",
    image: '/teddy-duvet14.jpg',
    hoverImage: '/teddy-duvet14-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Polar Bear',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 15,
    name: "Flannelette Duvet Cover and Pillowcase Set – Snow Reindeer",
    price: "£15.56 – £19.02",
    image: '/teddy-duvet15.jpg',
    hoverImage: '/teddy-duvet15-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Snow Reindeer',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 16,
    name: "Heart Foil Duvet Cover and Pillowcase Set – Cream",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet16.jpg',
    hoverImage: '/teddy-duvet16-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 17,
    name: "Heart Foil Duvet Cover and Pillowcase Set – Deep Red",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet17.jpg',
    hoverImage: '/teddy-duvet17-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Deep Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 18,
    name: "Heart Foil Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet18.jpg',
    hoverImage: '/teddy-duvet18-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 19,
    name: "Heart Foil Duvet Cover and Pillowcase Set – Purple",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet19.jpg',
    hoverImage: '/teddy-duvet19-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 20,
    name: "Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Blush",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet20.jpg',
    hoverImage: '/teddy-duvet20-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Blush',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 21,
    name: "Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Charcoal",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet21.jpg',
    hoverImage: '/teddy-duvet21-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
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
    name: "Luxurious GEO JACQUARD Fleece Duvet Cover with Pillowcases – Teal",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet22.jpg',
    hoverImage: '/teddy-duvet22-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 23,
    name: "Luxurious Geo Shaggy Faux Fur Fleece Duvet Cover with Pillowcases",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet23.jpg',
    hoverImage: '/teddy-duvet23-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 24,
    name: "Luxurious GEO Triangle Fleece Duvet Cover with Pillowcases – Blush Pink",
    price: "£23.78 – £30.70",
    image: '/teddy-duvet24.jpg',
    hoverImage: '/teddy-duvet24-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 25,
    name: "Luxurious GEO Triangle Fleece Duvet Cover with Pillowcases – Navy",
    price: "£23.78 – £30.70",
    image: '/teddy-duvet25.jpg',
    hoverImage: '/teddy-duvet25-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 26,
    name: "Luxurious Pom Pom Fleece Duvet Cover with Pillowcases – Ice Pink",
    price: "£23.78 – £30.70",
    image: '/teddy-duvet26.jpg',
    hoverImage: '/teddy-duvet26-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Ice Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 27,
    name: "Luxurious Pom Pom Fleece Duvet Cover with Pillowcases – Silver",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet27.jpg',
    hoverImage: '/teddy-duvet27-hover.jpg',
    discount: "-56%",
    isSoldOut: false,
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 28,
    name: "Luxurious Reversible Sparkle Ribbed Fleece Duvet Cover with Pillowcases",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet28.jpg',
    hoverImage: '/teddy-duvet28-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 29,
    name: "Luxurious ROUCHED FAUX FUR Fleece Duvet Cover with Pillowcases – Grey",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet29.jpg',
    hoverImage: '/teddy-duvet29-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 30,
    name: "Luxurious ROUCHED FAUX FUR Fleece Duvet Cover with Pillowcases – Natural",
    price: "£19.02 – £30.70",
    image: '/teddy-duvet30.jpg',
    hoverImage: '/teddy-duvet30-hover.jpg',
    discount: "-52%",
    isSoldOut: false,
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 31,
    name: "Luxury Super Soft & Reversible Teddy Fleece Duvet Cover and Pillowcase",
    price: "£23.78 – £30.70",
    image: '/teddy-duvet31.jpg',
    hoverImage: '/teddy-duvet31-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 32,
    name: "Luxury Super Soft & Reversible Waffle Teddy Fleece Duvet Set- Black",
    price: "£23.78 – £33.29",
    image: '/teddy-duvet32.jpg',
    hoverImage: '/teddy-duvet32-hover.jpg',
    discount: "-60%",
    isSoldOut: false,
    color: 'Black',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 33,
    name: "Luxury Super Soft & Reversible Waffle Teddy Fleece Duvet Set- Rust",
    price: "£28.97 – £30.70",
    image: '/teddy-duvet33.jpg',
    hoverImage: '/teddy-duvet33-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Rust',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 34,
    name: "Teddy Dazzling Star Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet34.jpg',
    hoverImage: '/teddy-duvet34-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 35,
    name: "Teddy Dazzling Star Duvet Cover and Pillowcase Set – Charcoal",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet35.jpg',
    hoverImage: '/teddy-duvet35-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 36,
    name: "Teddy Dazzling Star Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet36.jpg',
    hoverImage: '/teddy-duvet36-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 37,
    name: "Teddy Highland Check Duvet Cover and Pillowcase Set – Grey/Ochre",
    price: "£23.78 – £49.99",
    image: '/teddy-duvet37.jpg',
    hoverImage: '/teddy-duvet37-hover.jpg',
    discount: "-60%",
    isSoldOut: false,
    color: 'Grey/Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 38,
    name: "Teddy Highland Check Duvet Cover and Pillowcase Set – Grey/Pink",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet38.jpg',
    hoverImage: '/teddy-duvet38-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Grey/Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 39,
    name: "Teddy Highland Check Duvet Cover and Pillowcase Set – Navy/Red",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet39.jpg',
    hoverImage: '/teddy-duvet39-hover.jpg',
    discount: "-62%",
    isSoldOut: true,
    color: 'Navy/Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 40,
    name: "Teddy Lincoln Check Duvet Cover and Pillowcase Set – Grey/Red",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet40.jpg',
    hoverImage: '/teddy-duvet40-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Grey/Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 41,
    name: "Teddy Lincoln Check Duvet Cover and Pillowcase Set – Natural",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet41.jpg',
    hoverImage: '/teddy-duvet41-hover.jpg',
    discount: "-62%",
    isSoldOut: true,
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 42,
    name: "Teddy Lincoln Check Duvet Cover and Pillowcase Set – Navy/Red",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet42.jpg',
    hoverImage: '/teddy-duvet42-hover.jpg',
    discount: "-62%",
    isSoldOut: true,
    color: 'Navy/Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 43,
    name: "Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet43.jpg',
    hoverImage: '/teddy-duvet43-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 44,
    name: "Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Charcoal",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet44.jpg',
    hoverImage: '/teddy-duvet44-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 45,
    name: "Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet45.jpg',
    hoverImage: '/teddy-duvet45-hover.jpg',
    discount: "",
    isSoldOut: true,
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
    name: "Teddy Nuevo Geo Duvet Cover and Pillowcase Set – Purple",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet46.jpg',
    hoverImage: '/teddy-duvet46-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 47,
    name: "Teddy OCO Duvet Cover and Pillowcase Set – Charcoal",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet47.jpg',
    hoverImage: '/teddy-duvet47-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 48,
    name: "Teddy OCO Duvet Cover and Pillowcase Set – Pink",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet48.jpg',
    hoverImage: '/teddy-duvet48-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 49,
    name: "Teddy OCO Duvet Cover and Pillowcase Set – Silver",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet49.jpg',
    hoverImage: '/teddy-duvet49-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 50,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Aubergine",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet50.jpg',
    hoverImage: '/teddy-duvet50-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Aubergine',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 51,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Black",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet51.jpg',
    hoverImage: '/teddy-duvet51-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Black',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 52,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Charcoal",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet52.jpg',
    hoverImage: '/teddy-duvet52-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 53,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Cream",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet53.jpg',
    hoverImage: '/teddy-duvet53-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 54,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Mink",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet54.jpg',
    hoverImage: '/teddy-duvet54-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Mink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 55,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Ochre",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet55.jpg',
    hoverImage: '/teddy-duvet55-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 56,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Pink",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet56.jpg',
    hoverImage: '/teddy-duvet56-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 57,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Red",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet57.jpg',
    hoverImage: '/teddy-duvet57-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 58,
    name: "Teddy Plain Duvet Cover and Pillowcase Set – Silver",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet58.jpg',
    hoverImage: '/teddy-duvet58-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Silver',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 59,
    name: "Teddy Popcorn Duvet Cover and Pillowcase Set – Coral",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet59.jpg',
    hoverImage: '/teddy-duvet59-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Coral',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 60,
    name: "Teddy Popcorn Duvet Cover and Pillowcase Set – Cream",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet60.jpg',
    hoverImage: '/teddy-duvet60-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 61,
    name: "Teddy Popcorn Duvet Cover and Pillowcase Set – Mink",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet61.jpg',
    hoverImage: '/teddy-duvet61-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Mink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 62,
    name: "Teddy Popcorn Duvet Cover and Pillowcase Set – Ochre",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet62.jpg',
    hoverImage: '/teddy-duvet62-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 63,
    name: "Teddy Popcorn Duvet Cover and Pillowcase Set – Rust",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet63.jpg',
    hoverImage: '/teddy-duvet63-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Rust',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 64,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Blue/Light Blue",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet64.jpg',
    hoverImage: '/teddy-duvet64-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Blue/Light Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 65,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Blush Pink/Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet65.jpg',
    hoverImage: '/teddy-duvet65-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Blush Pink/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 66,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Charcoal/Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet66.jpg',
    hoverImage: '/teddy-duvet66-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Charcoal/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 67,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Dark Pink/Pink",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet67.jpg',
    hoverImage: '/teddy-duvet67-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Dark Pink/Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 68,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Deep Red/Charcoal",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet68.jpg',
    hoverImage: '/teddy-duvet68-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Deep Red/Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 69,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Green/Light Green",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet69.jpg',
    hoverImage: '/teddy-duvet69-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Green/Light Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 70,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Lilac/Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet70.jpg',
    hoverImage: '/teddy-duvet70-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Lilac/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 71,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Ochre/Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet71.jpg',
    hoverImage: '/teddy-duvet71-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Ochre/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 72,
    name: "Teddy Reversible Duvet Cover and Pillowcase Set – Rust/Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet72.jpg',
    hoverImage: '/teddy-duvet72-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Rust/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 73,
    name: "Teddy Star Duvet Cover and Pillowcase Set – Grey",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet73.jpg',
    hoverImage: '/teddy-duvet73-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 74,
    name: "Teddy Star Duvet Cover and Pillowcase Set – Navy",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet74.jpg',
    hoverImage: '/teddy-duvet74-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 75,
    name: "Teddy Star Duvet Cover and Pillowcase Set – Red",
    price: "£49.99 – £69.99",
    image: '/teddy-duvet75.jpg',
    hoverImage: '/teddy-duvet75-hover.jpg',
    discount: "",
    isSoldOut: true,
    color: 'Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 76,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Charcoal",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet76.jpg',
    hoverImage: '/teddy-duvet76-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Charcoal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 77,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Cream",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet77.jpg',
    hoverImage: '/teddy-duvet77-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 78,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Grey",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet78.jpg',
    hoverImage: '/teddy-duvet78-hover.jpg',
    discount: "-62%",
    isSoldOut: true,
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 79,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Natural",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet79.jpg',
    hoverImage: '/teddy-duvet79-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 80,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Pink",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet80.jpg',
    hoverImage: '/teddy-duvet80-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 81,
    name: "Unicorn Star Foil Duvet Cover and Pillowcase Set – Purple",
    price: "£19.02 – £28.97",
    image: '/teddy-duvet81.jpg',
    hoverImage: '/teddy-duvet81-hover.jpg',
    discount: "-62%",
    isSoldOut: false,
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