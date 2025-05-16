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
    name: "Aubrey Duvet Cover and Pillowcase Set – Grey",
    price: "£39.99 – £49.99",
    image: '/printed-duvet1.jpg',
    hoverImage: '/printed-duvet1-hover.jpg',
    discount: "",
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
    id: 2,
    name: "Aubrey Duvet Cover and Pillowcase Set – Pink",
    price: "£39.99 – £49.99",
    image: '/printed-duvet2.jpg',
    hoverImage: '/printed-duvet2-hover.jpg',
    discount: "",
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
    id: 3,
    name: "Aubrey Duvet Cover and Pillowcase Set – Purple",
    price: "£39.99 – £49.99",
    image: '/printed-duvet3.jpg',
    hoverImage: '/printed-duvet3-hover.jpg',
    discount: "",
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
    id: 4,
    name: "AVA Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet4.jpg',
    hoverImage: '/printed-duvet4-hover.jpg',
    discount: "-65%",
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
    name: "AVA Duvet Cover and Pillowcase Set – Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet5.jpg',
    hoverImage: '/printed-duvet5-hover.jpg',
    discount: "-65%",
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
    id: 6,
    name: "Bardsley Check Duvet Cover and Pillowcase Set – Grey",
    price: "£14.70 – £19.02",
    image: '/printed-duvet6.jpg',
    hoverImage: '/printed-duvet6-hover.jpg',
    discount: "-63%",
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
    id: 7,
    name: "Bardsley Check Duvet Cover and Pillowcase Set – Red",
    price: "£14.70 – £19.02",
    image: '/printed-duvet7.jpg',
    hoverImage: '/printed-duvet7-hover.jpg',
    discount: "-63%",
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
    id: 8,
    name: "Bardsley Check Duvet Cover and Pillowcase Set – Teal",
    price: "£14.70 – £19.02",
    image: '/printed-duvet8.jpg',
    hoverImage: '/printed-duvet8-hover.jpg',
    discount: "-63%",
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
    id: 9,
    name: "Bee Happy Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet9.jpg',
    hoverImage: '/printed-duvet9-hover.jpg',
    discount: "-65%",
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
    id: 10,
    name: "Bee Happy Duvet Cover and Pillowcase Set – Green",
    price: "£13.83 – £18.16",
    image: '/printed-duvet10.jpg',
    hoverImage: '/printed-duvet10-hover.jpg',
    discount: "-65%",
    isSoldOut: true,
    color: 'Green',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 11,
    name: "Bee Happy Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet11.jpg',
    hoverImage: '/printed-duvet11-hover.jpg',
    discount: "-65%",
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
    id: 12,
    name: "Bee Happy Duvet Cover and Pillowcase Set – Ochre",
    price: "£13.83 – £18.16",
    image: '/printed-duvet12.jpg',
    hoverImage: '/printed-duvet12-hover.jpg',
    discount: "-65%",
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
    id: 13,
    name: "Bellerose Duvet Cover and Pillowcase Set – Duck Egg",
    price: "£13.83 – £18.16",
    image: '/printed-duvet13.jpg',
    hoverImage: '/printed-duvet13-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Duck Egg',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 14,
    name: "Bellerose Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet14.jpg',
    hoverImage: '/printed-duvet14-hover.jpg',
    discount: "-65%",
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
    id: 15,
    name: "Bellerose Duvet Cover and Pillowcase Set – Ochre",
    price: "£13.83 – £18.16",
    image: '/printed-duvet15.jpg',
    hoverImage: '/printed-duvet15-hover.jpg',
    discount: "-65%",
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
    id: 16,
    name: "Bellerose Duvet Cover and Pillowcase Set – Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet16.jpg',
    hoverImage: '/printed-duvet16-hover.jpg',
    discount: '-28%',
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 17,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Blue",
    price: "£13.83 – £18.16",
    image: '/printed-duvet17.jpg',
    hoverImage: '/printed-duvet17-hover.jpg',
    discount: '-30%',
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 18,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Duck Egg",
    price: "£13.83 – £18.16",
    image: '/printed-duvet18.jpg',
    hoverImage: '/printed-duvet18-hover.jpg',
    discount: '-32%',
    color: 'Duck Egg',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 19,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet19.jpg',
    hoverImage: '/printed-duvet19-hover.jpg',
    discount: '-35%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 20,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Natural",
    price: "£13.83 – £18.16",
    image: '/printed-duvet20.jpg',
    hoverImage: '/printed-duvet20-hover.jpg',
    discount: '-38%',
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 21,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Ochre",
    price: "£13.83 – £18.16",
    image: '/printed-duvet21.jpg',
    hoverImage: '/printed-duvet21-hover.jpg',
    discount: '-40%',
    color: 'Ochre',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 22,
    name: "Birdie Blossom Duvet Cover and Pillowcase Set – Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet22.jpg',
    hoverImage: '/printed-duvet22-hover.jpg',
    discount: '-42%',
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 23,
    name: "Blake Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet23.jpg',
    hoverImage: '/printed-duvet23-hover.jpg',
    discount: '-45%',
    color: 'Blush Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 24,
    name: "Blake Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet24.jpg',
    hoverImage: '/printed-duvet24-hover.jpg',
    discount: '-48%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 25,
    name: "Blake Duvet Cover and Pillowcase Set – Purple",
    price: "£13.83 – £18.16",
    image: '/printed-duvet25.jpg',
    hoverImage: '/printed-duvet25-hover.jpg',
    discount: '-50%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 26,
    name: "Camila Duvet Cover and Pillowcase Set – Teal",
    price: "£13.49",
    image: '/printed-duvet26.jpg',
    hoverImage: '/printed-duvet26-hover.jpg',
    discount: '-52%',
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 27,
    name: "Cara Carle Duvet Cover and Pillowcase Set",
    price: "£13.49",
    image: '/printed-duvet27.jpg',
    hoverImage: '/printed-duvet27-hover.jpg',
    discount: '-55%',
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 28,
    name: "Denim Check Duvet Cover and Pillowcase Set – Blue",
    price: "£14.70 – £19.02",
    image: '/printed-duvet28.jpg',
    hoverImage: '/printed-duvet28-hover.jpg',
    discount: '-58%',
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 29,
    name: "Denim Check Duvet Cover and Pillowcase Set – Grey",
    price: "£14.70 – £19.02",
    image: '/printed-duvet29.jpg',
    hoverImage: '/printed-duvet29-hover.jpg',
    discount: '-60%',
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
    name: "Denim Check Duvet Cover and Pillowcase Set – Red",
    price: "£14.70 – £19.02",
    image: '/printed-duvet30.jpg',
    hoverImage: '/printed-duvet30-hover.jpg',
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
    id: 31,
    name: "ECO Duvet Cover and Pillowcase Set – Choco/Cream",
    price: "£39.99 – £49.99",
    image: '/printed-duvet31.jpg',
    hoverImage: '/printed-duvet31-hover.jpg',
    discount: '-65%',
    color: 'Choco/Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 32,
    name: "Empire Damask Duvet Cover and Pillowcase Set – Black",
    price: "£13.49 – £49.99",
    image: '/printed-duvet32.jpg',
    hoverImage: '/printed-duvet32-hover.jpg',
    discount: '-68%',
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
    name: "Empire Damask Duvet Cover and Pillowcase Set – Cream",
    price: "£39.99 – £49.99",
    image: '/printed-duvet33.jpg',
    hoverImage: '/printed-duvet33-hover.jpg',
    discount: '-70%',
    color: 'Cream',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 34,
    name: "Empire Damask Duvet Cover and Pillowcase Set – Purple",
    price: "£39.99 – £49.99",
    image: '/printed-duvet34.jpg',
    hoverImage: '/printed-duvet34-hover.jpg',
    discount: '-72%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 35,
    name: "Fashion Animal Duvet Cover and Pillowcase Set",
    price: "£39.99 – £49.99",
    image: '/printed-duvet35.jpg',
    hoverImage: '/printed-duvet35-hover.jpg',
    discount: '-75%',
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 36,
    name: "Feathers Duvet Cover and Pillowcase Set – Duck Egg",
    price: "£14.70 – £19.02",
    image: '/printed-duvet36.jpg',
    hoverImage: '/printed-duvet36-hover.jpg',
    discount: '-78%',
    color: 'Duck Egg',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 37,
    name: "Feathers Duvet Cover and Pillowcase Set – Grey",
    price: "£14.70 – £22.48",
    image: '/printed-duvet37.jpg',
    hoverImage: '/printed-duvet37-hover.jpg',
    discount: '-80%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 38,
    name: "Feathers Duvet Cover and Pillowcase Set – Navy",
    price: "£16.99 – £21.99",
    image: '/printed-duvet38.jpg',
    hoverImage: '/printed-duvet38-hover.jpg',
    discount: '-82%',
    color: 'Navy',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 39,
    name: "Feathers Duvet Cover and Pillowcase Set – Pink",
    price: "£16.99 – £25.99",
    image: '/printed-duvet39.jpg',
    hoverImage: '/printed-duvet39-hover.jpg',
    discount: '-85%',
    color: 'Pink',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 40,
    name: "Feathers Duvet Cover and Pillowcase Set – Purple",
    price: "£16.99 – £25.99",
    image: '/printed-duvet40.jpg',
    hoverImage: '/printed-duvet40-hover.jpg',
    discount: '-88%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 41,
    name: "Feathers Duvet Cover and Pillowcase Set – White",
    price: "£16.99 – £25.99",
    image: '/printed-duvet41.jpg',
    hoverImage: '/printed-duvet41-hover.jpg',
    discount: '-90%',
    color: 'White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 42,
    name: "Feathers Duvet Cover and Pillowcase Set – Yellow",
    price: "£16.99 – £25.99",
    image: '/printed-duvet42.jpg',
    hoverImage: '/printed-duvet42-hover.jpg',
    discount: '-92%',
    color: 'Yellow',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 43,
    name: "Flutter Duvet Cover and Pillowcase Set – Multi",
    price: "£39.99 – £49.99",
    image: '/printed-duvet43.jpg',
    hoverImage: '/printed-duvet43-hover.jpg',
    discount: '-94%',
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 44,
    name: "Halloween Mix Fleece Reversible Duvet Cover with Pillowcase",
    price: "£19.02 – £22.91",
    image: '/printed-duvet44.jpg',
    hoverImage: '/printed-duvet44-hover.jpg',
    discount: '-96%',
    color: 'Multi',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 45,
    name: "Honesty Leaf Duvet Cover and Pillowcase Set",
    price: "£13.83 – £18.16",
    image: '/printed-duvet45.jpg',
    hoverImage: '/printed-duvet45-hover.jpg',
    discount: '-98%',
    color: 'Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 46,
    name: "Inspire Duvet Cover and Pillowcase Set – Red",
    price: "£13.49",
    image: '/printed-duvet46.jpg',
    hoverImage: '/printed-duvet46-hover.jpg',
    discount: '-40%',
    color: 'Red',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 47,
    name: "Inspire Duvet Cover and Pillowcase Set – Teal",
    price: "£13.49",
    image: '/printed-duvet47.jpg',
    hoverImage: '/printed-duvet47-hover.jpg',
    discount: '-42%',
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 48,
    name: "IOLA Duvet Cover and Pillowcase Set – Black",
    price: "£13.49",
    image: '/printed-duvet48.jpg',
    hoverImage: '/printed-duvet48-hover.jpg',
    discount: '-45%',
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
    name: "IOLA Duvet Cover and Pillowcase Set – Teal",
    price: "£13.49",
    image: '/printed-duvet49.jpg',
    hoverImage: '/printed-duvet49-hover.jpg',
    discount: '-48%',
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 50,
    name: "Leopard Duvet Cover and Pillowcase Set – Red",
    price: "£39.99 – £49.99",
    image: '/printed-duvet50.jpg',
    hoverImage: '/printed-duvet50-hover.jpg',
    discount: "",
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
    id: 51,
    name: "Linear Duvet Cover and Pillowcase Set – Red",
    price: "£44.99 – £49.99",
    image: '/printed-duvet51.jpg',
    hoverImage: '/printed-duvet51-hover.jpg',
    discount: "",
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
    id: 52,
    name: "Luxury Fleece Unicorn Foil Duvet Cover with Pillowcase- Ivory",
    price: "£41.99",
    image: '/printed-duvet52.jpg',
    hoverImage: '/printed-duvet52-hover.jpg',
    discount: "",
    isSoldOut: false,
    color: 'Ivory',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 53,
    name: "Luxury Soft Reversible Artisan Blockprint Duvet Cover & Pillowcases",
    price: "£9.51 – £12.10",
    image: '/printed-duvet53.jpg',
    hoverImage: '/printed-duvet53-hover.jpg',
    discount: "-83%",
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
    id: 54,
    name: "Luxury Soft Reversible Camping Retreat Duvet Cover & Pillowcases",
    price: "£9.51 – £12.10",
    image: '/printed-duvet54.jpg',
    hoverImage: '/printed-duvet54-hover.jpg',
    discount: "-83%",
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
    id: 55,
    name: "Luxury Soft Reversible Celestial Halloween Duvet Cover with Pillowcases – Lilac",
    price: "£8.64 – £9.51",
    image: '/printed-duvet55.jpg',
    hoverImage: '/printed-duvet55-hover.jpg',
    discount: "-76%",
    isSoldOut: false,
    color: 'Lilac',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 56,
    name: "Luxury Soft Reversible Elegant Blooms Duvet Cover & Pillowcases – Blush Pink",
    price: "£14.70 – £19.02",
    image: '/printed-duvet56.jpg',
    hoverImage: '/printed-duvet56-hover.jpg',
    discount: "-73%",
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
    id: 57,
    name: "Luxury Soft Reversible Elegant Blooms Duvet Cover & Pillowcases – Green",
    price: "£14.70 – £19.02",
    image: '/printed-duvet57.jpg',
    hoverImage: '/printed-duvet57-hover.jpg',
    discount: "-73%",
    isSoldOut: false,
    color: 'Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 58,
    name: "Luxury Soft Reversible Folk Floral Duvet Cover & Pillowcases – Blue",
    price: "£33.99 Original price was: £33.99.£14.70Current price is: £14.70.",
    image: '/printed-duvet58.jpg',
    hoverImage: '/printed-duvet58-hover.jpg',
    discount: "-57%",
    isSoldOut: false,
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 59,
    name: "Luxury Soft Reversible Folk Floral Duvet Cover & Pillowcases – Mustard",
    price: "£33.99 Original price was: £33.99.£14.70Current price is: £14.70.",
    image: '/printed-duvet59.jpg',
    hoverImage: '/printed-duvet59-hover.jpg',
    discount: "-57%",
    isSoldOut: false,
    color: 'Mustard',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 60,
    name: "Luxury Soft Reversible Forest Mushrooms Duvet Cover & Pillowcases – Green",
    price: "£33.99 Original price was: £33.99.£14.70Current price is: £14.70.",
    image: '/printed-duvet60.jpg',
    hoverImage: '/printed-duvet60-hover.jpg',
    discount: "-57%",
    isSoldOut: false,
    color: 'Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 61,
    name: "Luxury Soft Reversible Frosted Foliage Duvet Cover & Pillowcases – Natural",
    price: "£9.51 – £10.37",
    image: '/printed-duvet61.jpg',
    hoverImage: '/printed-duvet61-hover.jpg',
    discount: "-74%",
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
    id: 62,
    name: "Luxury Soft Reversible Haunted House Duvet Cover & Pillowcases – Charcoal",
    price: "£8.64 – £8.99",
    image: '/printed-duvet62.jpg',
    hoverImage: '/printed-duvet62-hover.jpg',
    discount: "-78%",
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
    id: 63,
    name: "Luxury Soft Reversible Highland Cow Duvet Cover & Pillowcases – Green",
    price: "£9.51 – £11.24",
    image: '/printed-duvet63.jpg',
    hoverImage: '/printed-duvet63-hover.jpg',
    discount: "-75%",
    isSoldOut: false,
    color: 'Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 64,
    name: "Luxury Soft Reversible Holiday Postcard Duvet Cover & Pillowcases",
    price: "£9.51 – £12.10",
    image: '/printed-duvet64.jpg',
    hoverImage: '/printed-duvet64-hover.jpg',
    discount: "-83%",
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
    id: 65,
    name: "Luxury Soft Reversible Mystical Gothic Duvet Cover & Pillowcases – Charcoal",
    price: "£8.64 – £10.37",
    image: '/printed-duvet65.jpg',
    hoverImage: '/printed-duvet65-hover.jpg',
    discount: "-77%",
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
    id: 66,
    name: "Luxury Soft Reversible Oiled Swirl Duvet Cover & Pillowcases",
    price: "£9.51 – £12.97",
    image: '/printed-duvet66.jpg',
    hoverImage: '/printed-duvet66-hover.jpg',
    discount: "-81%",
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
    id: 67,
    name: "Luxury Soft Reversible Pastel Waves Duvet Cover & Pillowcases",
    price: "£9.51 – £12.10",
    image: '/printed-duvet67.jpg',
    hoverImage: '/printed-duvet67-hover.jpg',
    discount: "-83%",
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
    id: 68,
    name: "Luxury Soft Reversible Tropical Leaf Duvet Cover with Pillowcases – Green",
    price: "£33.99 Original price was: £33.99.£9.59Current price is: £9.59.",
    image: '/printed-duvet68.jpg',
    hoverImage: '/printed-duvet68-hover.jpg',
    discount: "-72%",
    isSoldOut: true,
    color: 'Green',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 69,
    name: "Luxury Soft Reversible Wild Flowers Duvet Cover & Pillowcases",
    price: "£9.51 – £12.10",
    image: '/printed-duvet69.jpg',
    hoverImage: '/printed-duvet69-hover.jpg',
    discount: "-83%",
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
    id: 70,
    name: "Luxury Super Soft & Elegant Reversible PARTY SANTA Duvet Cover with Pillowcase",
    price: "£14.70 – £19.02",
    image: '/printed-duvet70.jpg',
    hoverImage: '/printed-duvet70-hover.jpg',
    discount: "-58%",
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
    id: 71,
    name: "Luxury Super Soft & Elegant Reversible Winter Woodland Duvet Cover Set",
    price: "£9.51 – £12.10",
    image: '/printed-duvet71.jpg',
    hoverImage: '/printed-duvet71-hover.jpg',
    discount: "-73%",
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
    id: 72,
    name: "Luxury Super Soft & Reversible Festive Christmas Puddings Duvet Set",
    price: "£8.64 – £10.37",
    image: '/printed-duvet72.jpg',
    hoverImage: '/printed-duvet72-hover.jpg',
    discount: "-77%",
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
    id: 73,
    name: "Luxury Super Soft Crosshatch Check Duvet Cover with Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet73.jpg',
    hoverImage: '/printed-duvet73-hover.jpg',
    discount: "",
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
    id: 74,
    name: "Luxury Super Soft Reversible Abstract Floral Duvet Cover With Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet74.jpg',
    hoverImage: '/printed-duvet74-hover.jpg',
    discount: "",
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
    id: 75,
    name: "Luxury Super Soft Reversible Bright Leaves Duvet Cover With Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet75.jpg',
    hoverImage: '/printed-duvet75-hover.jpg',
    discount: "",
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
    id: 76,
    name: "Luxury Super Soft Reversible Celestial Cats Duvet Cover with Pillowcase",
    price: "£9.51 – £19.02",
    image: '/printed-duvet76.jpg',
    hoverImage: '/printed-duvet76-hover.jpg',
    discount: "-73%",
    isSoldOut: true,
    color: 'Multi',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 77,
    name: "Luxury Super Soft Reversible Christmas Town House Duvet Cover Set",
    price: "£14.70 – £19.02",
    image: '/printed-duvet77.jpg',
    hoverImage: '/printed-duvet77-hover.jpg',
    discount: "-58%",
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
    id: 78,
    name: "Luxury Super Soft Reversible Elemental Geo Duvet Cover with Pillowcase",
    price: "£9.51 – £19.02",
    image: '/printed-duvet78.jpg',
    hoverImage: '/printed-duvet78-hover.jpg',
    discount: "-73%",
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
    id: 79,
    name: "Luxury Super Soft Reversible Exotic Palms Duvet Cover with Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet79.jpg',
    hoverImage: '/printed-duvet79-hover.jpg',
    discount: "",
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
    id: 80,
    name: "Luxury Super Soft Reversible Floral Toile Duvet Cover with Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet80.jpg',
    hoverImage: '/printed-duvet80-hover.jpg',
    discount: "",
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
    id: 81,
    name: "Luxury Super Soft Reversible Hawaiian Tropic Duvet Cover with Pillowcase",
    price: "£39.99 – £49.99",
    image: '/printed-duvet81.jpg',
    hoverImage: '/printed-duvet81-hover.jpg',
    discount: "",
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
    id: 82,
    name: "Luxury Super Soft Reversible Misty Forest Duvet Cover with Pillowcase- Green",
    price: "£9.51 – £12.10",
    image: '/printed-duvet82.jpg',
    hoverImage: '/printed-duvet82-hover.jpg',
    discount: "-73%",
    isSoldOut: false,
    color: 'Green',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 83,
    name: "Luxury Super Soft Reversible Misty Forest Duvet Cover with Pillowcase- Navy",
    price: "£9.51 – £12.10",
    image: '/printed-duvet83.jpg',
    hoverImage: '/printed-duvet83-hover.jpg',
    discount: "-73%",
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
    id: 84,
    name: "Meander Duvet Cover and Pillowcase Set – Black/White",
    price: "£14.70 – £18.16",
    image: '/printed-duvet84.jpg',
    hoverImage: '/printed-duvet84-hover.jpg',
    discount: "-58%",
    isSoldOut: false,
    color: 'Black/White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 85,
    name: "Mila Duvet Cover and Pillowcase Set – Charcoal/Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet85.jpg',
    hoverImage: '/printed-duvet85-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Charcoal/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 86,
    name: "Mila Duvet Cover and Pillowcase Set – Ochre/Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet86.jpg',
    hoverImage: '/printed-duvet86-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Ochre/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 87,
    name: "Mila Duvet Cover and Pillowcase Set – Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet87.jpg',
    hoverImage: '/printed-duvet87-hover.jpg',
    discount: "-65%",
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
    id: 88,
    name: "Mila Duvet Cover and Pillowcase Set – Purple/Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet88.jpg',
    hoverImage: '/printed-duvet88-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Purple/Grey',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 89,
    name: "Moxie Duvet Cover and Pillowcase Set – Black/White",
    price: "£13.83 – £18.16",
    image: '/printed-duvet89.jpg',
    hoverImage: '/printed-duvet89-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Black/White',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 90,
    name: "Moxie Duvet Cover and Pillowcase Set – Blue",
    price: "£13.83 – £18.16",
    image: '/printed-duvet90.jpg',
    hoverImage: '/printed-duvet90-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 91,
    name: "Moxie Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet91.jpg',
    hoverImage: '/printed-duvet91-hover.jpg',
    discount: "-65%",
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
    id: 92,
    name: "Oooh Lala Duvet Cover and Pillowcase Set – Teal",
    price: "£13.49 – £39.99",
    image: '/printed-duvet92.jpg',
    hoverImage: '/printed-duvet92-hover.jpg',
    discount: "-65%",
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
    id: 93,
    name: "Poppy Duvet Cover and Pillowcase Set – Aubergine",
    price: "£13.83 – £18.16",
    image: '/printed-duvet93.jpg',
    hoverImage: '/printed-duvet93-hover.jpg',
    discount: "-65%",
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
    id: 94,
    name: "Poppy Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£13.83 – £18.16",
    image: '/printed-duvet94.jpg',
    hoverImage: '/printed-duvet94-hover.jpg',
    discount: "-65%",
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
    id: 95,
    name: "Poppy Duvet Cover and Pillowcase Set – Red",
    price: "£13.83 – £18.16",
    image: '/printed-duvet95.jpg',
    hoverImage: '/printed-duvet95-hover.jpg',
    discount: "-65%",
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
    id: 96,
    name: "Poppy Duvet Cover and Pillowcase Set – Yellow",
    price: "£13.83 – £18.16",
    image: '/printed-duvet96.jpg',
    hoverImage: '/printed-duvet96-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Yellow',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 97,
    name: "Printed Metallic Floral Duvet with Pillowcases – Blush Pink",
    price: "£15.99 – £23.99",
    image: '/printed-duvet97.jpg',
    hoverImage: '/printed-duvet97-hover.jpg',
    discount: "-65%",
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
    id: 98,
    name: "Printed Metallic Marble Reversible Duvet Cover with Pillowcases – Blush Pink",
    price: "£13.83 – £20.75",
    image: '/printed-duvet98.jpg',
    hoverImage: '/printed-duvet98-hover.jpg',
    discount: "-65%",
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
    id: 99,
    name: "Printed Nellie Duvet Cover and Pillowcase Set – Multi",
    price: "£44.99 Original price was: £44.99.£16.99Current price is: £16.99.",
    image: '/printed-duvet99.jpg',
    hoverImage: '/printed-duvet99-hover.jpg',
    discount: "-65%",
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
    id: 100,
    name: "Printed Ombre Metallic Deco Duvet with Pillowcases – Blush Pink",
    price: "£13.83 – £20.75",
    image: '/printed-duvet100.jpg',
    hoverImage: '/printed-duvet100-hover.jpg',
    discount: "-65%",
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
    id: 101,
    name: "Printed Ombre Metallic Deco Duvet with Pillowcases ? Grey",
    price: "£13.83 – £20.75",
    image: '/printed-duvet101.jpg',
    hoverImage: '/printed-duvet101-hover.jpg',
    discount: "-65%",
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
    id: 102,
    name: "Reversible Polycotton Connected Geo Duvet Cover and Pillowcase Set",
    price: "£13.83 – £20.75",
    image: '/printed-duvet102.jpg',
    hoverImage: '/printed-duvet102-hover.jpg',
    discount: "-65%",
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
    id: 103,
    name: "Reversible Polycotton Decorative Hearts Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £20.75",
    image: '/printed-duvet103.jpg',
    hoverImage: '/printed-duvet103-hover.jpg',
    discount: "-65%",
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
    id: 104,
    name: "Reversible Polycotton Elephant Mandala Duvet Cover and Pillowcase Set ? Pink/Blue",
    price: "£10.49 – £12.97",
    image: '/printed-duvet104.jpg',
    hoverImage: '/printed-duvet104-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Pink/Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 105,
    name: "Reversible Polycotton Elephant Mandala Duvet Cover and Pillowcase Set ? Purple",
    price: "£10.49 – £12.97",
    image: '/printed-duvet105.jpg',
    hoverImage: '/printed-duvet105-hover.jpg',
    discount: "-65%",
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
    id: 106,
    name: "Reversible Polycotton Elephant Mandala Duvet Cover and Pillowcase Set ? Teal",
    price: "£10.49 – £12.97",
    image: '/printed-duvet106.jpg',
    hoverImage: '/printed-duvet106-hover.jpg',
    discount: "-65%",
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
    id: 107,
    name: "Reversible Polycotton Flamingo Stripe Duvet Cover and Pillowcase Set",
    price: "£15.99 – £20.99",
    image: '/printed-duvet107.jpg',
    hoverImage: '/printed-duvet107-hover.jpg',
    discount: "-65%",
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
    id: 108,
    name: "Reversible Polycotton Grid Check Duvet Cover and Pillowcase Set",
    price: "£17.99 – £18.49",
    image: '/printed-duvet108.jpg',
    hoverImage: '/printed-duvet108-hover.jpg',
    discount: "-65%",
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
    id: 109,
    name: "Reversible Polycotton Inky Floral Duvet Cover and Pillowcase Set – Blue",
    price: "£13.83 – £18.16",
    image: '/printed-duvet109.jpg',
    hoverImage: '/printed-duvet109-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 110,
    name: "Reversible Polycotton Inky Floral Duvet Cover and Pillowcase Set – Grey",
    price: "£13.83 – £18.16",
    image: '/printed-duvet110.jpg',
    hoverImage: '/printed-duvet110-hover.jpg',
    discount: "-75%",
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
    id: 111,
    name: "Reversible Polycotton Jersey Melange Stripe Duvet Cover and Pillowcase Set ? Grey/Charcoal",
    price: "£18.99 – £20.99",
    image: '/printed-duvet111.jpg',
    hoverImage: '/printed-duvet111-hover.jpg',
    discount: "-58%",
    isSoldOut: true,
    color: 'Grey/Charcoal',
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 112,
    name: "Reversible Polycotton Paisley Duvet Cover and Pillowcase Set ? Blush Pink",
    price: "£13.83 – £20.75",
    image: '/printed-duvet112.jpg',
    hoverImage: '/printed-duvet112-hover.jpg',
    discount: "-65%",
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
    id: 113,
    name: "Reversible Polycotton Paisley Mandala Duvet Cover and Pillowcase Set ? Black",
    price: "£13.83 – £20.75",
    image: '/printed-duvet113.jpg',
    hoverImage: '/printed-duvet113-hover.jpg',
    discount: "-65%",
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
    id: 114,
    name: "Reversible Polycotton Paisley Mandala Duvet Cover and Pillowcase Set ? Blue",
    price: "£13.83 – £20.75",
    image: '/printed-duvet114.jpg',
    hoverImage: '/printed-duvet114-hover.jpg',
    discount: "-65%",
    isSoldOut: false,
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 115,
    name: "Reversible Polycotton Textured Stripe Duvet Cover and Pillowcase Set ? Purple",
    price: "£11.24 – £14.26",
    image: '/printed-duvet115.jpg',
    hoverImage: '/printed-duvet115-hover.jpg',
    discount: '-88%',
    color: 'Purple',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 116,
    name: "Reversible Polycotton Textured Stripe Duvet Cover and Pillowcase Set ? Teal",
    price: "£11.24 – £14.26",
    image: '/printed-duvet116.jpg',
    hoverImage: '/printed-duvet116-hover.jpg',
    discount: '-90%',
    color: 'Teal',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 117,
    name: "Reversible Polycotton Tiedye Tassel Trim Duvet Cover and Pillowcase Set ? Blue",
    price: "£13.83 – £20.75",
    image: '/printed-duvet117.jpg',
    hoverImage: '/printed-duvet117-hover.jpg',
    discount: '-92%',
    color: 'Blue',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 118,
    name: "Reversible Polycotton Tiedye Tassel Trim Duvet Cover and Pillowcase Set ? Mono",
    price: "£13.83 – £20.75",
    image: '/printed-duvet118.jpg',
    hoverImage: '/printed-duvet118-hover.jpg',
    discount: '-94%',
    color: 'Mono',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 119,
    name: "Reversible Polycotton Tribal Elephant Duvet Cover and Pillowcase Set ? Natural",
    price: "£10.37 – £14.70",
    image: '/printed-duvet119.jpg',
    hoverImage: '/printed-duvet119-hover.jpg',
    discount: '-96%',
    color: 'Natural',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 120,
    name: "Reversible Polycotton Tribal Elephant Duvet Cover and Pillowcase Set ? Rust",
    price: "£10.37 – £14.70",
    image: '/printed-duvet120.jpg',
    hoverImage: '/printed-duvet120-hover.jpg',
    discount: '-98%',
    color: 'Rust',
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 121,
    name: "Reversible Polycotton Tropical Monkey Duvet Cover and Pillowcase Set – Natural",
    price: "£9.51 – £18.16",
    image: "/images/printed-duvet-set/121.jpg",
    hoverImage: "/images/printed-duvet-set/121-hover.jpg",
    discount: "-76%",
    isSoldOut: true,
    color: "Natural",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 122,
    name: "Reversible Polycotton Wolf Panel Duvet Cover and Pillowcase Set",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/122.jpg",
    hoverImage: "/images/printed-duvet-set/122-hover.jpg",
    discount: "-60%",
    isSoldOut: true,
    color: "Grey",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 123,
    name: "Rex Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/123.jpg",
    hoverImage: "/images/printed-duvet-set/123-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Blush Pink",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 124,
    name: "Rex Duvet Cover and Pillowcase Set – Green",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/124.jpg",
    hoverImage: "/images/printed-duvet-set/124-hover.jpg",
    discount: "-60%",
    isSoldOut: true,
    color: "Green",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 125,
    name: "Rex Duvet Cover and Pillowcase Set – Grey",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/125.jpg",
    hoverImage: "/images/printed-duvet-set/125-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Grey",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 126,
    name: "Rex Duvet Cover and Pillowcase Set – Ochre",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/126.jpg",
    hoverImage: "/images/printed-duvet-set/126-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Ochre",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 127,
    name: "Romorus Duvet Cover and Pillowcase Set",
    price: "£13.49",
    image: "/images/printed-duvet-set/127.jpg",
    hoverImage: "/images/printed-duvet-set/127-hover.jpg",
    discount: "-73%",
    isSoldOut: false,
    color: "Grey",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 128,
    name: "Rosettes Duvet Cover and Pillowcase Set – Pink",
    price: "£13.49 – £44.99",
    image: "/images/printed-duvet-set/128.jpg",
    hoverImage: "/images/printed-duvet-set/128-hover.jpg",
    discount: "-73%",
    isSoldOut: false,
    color: "Pink",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 129,
    name: "Rural Italy Duvet Cover and Pillowcase Set – Multi",
    price: "£13.49 – £39.99",
    image: "/images/printed-duvet-set/129.jpg",
    hoverImage: "/images/printed-duvet-set/129-hover.jpg",
    discount: "-73%",
    isSoldOut: false,
    color: "Multi",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 130,
    name: "Rural Italy Duvet Cover and Pillowcase Set – Teal",
    price: "£39.99 – £49.99",
    image: "/images/printed-duvet-set/130.jpg",
    hoverImage: "/images/printed-duvet-set/130-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Teal",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 131,
    name: "Safari Duvet Cover and Pillowcase Set – Red",
    price: "£13.49 – £49.99",
    image: "/images/printed-duvet-set/131.jpg",
    hoverImage: "/images/printed-duvet-set/131-hover.jpg",
    discount: "-70%",
    isSoldOut: false,
    color: "Red",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 132,
    name: "Selfie For Christmas Duvet Cover and Pillowcase Set",
    price: "£59.99 – £69.99",
    image: "/images/printed-duvet-set/132.jpg",
    hoverImage: "/images/printed-duvet-set/132-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Multi",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 133,
    name: "Super Soft & Reversible Dino Skiing Printed Duvet Cover with Pillowcase",
    price: "£16.99 – £19.99",
    image: "/images/printed-duvet-set/133.jpg",
    hoverImage: "/images/printed-duvet-set/133-hover.jpg",
    discount: "-51%",
    isSoldOut: false,
    color: "Multi",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 134,
    name: "The Real Boss Duvet Cover and Pillowcase Set – Green/Cream",
    price: "£11.67",
    image: "/images/printed-duvet-set/134.jpg",
    hoverImage: "/images/printed-duvet-set/134-hover.jpg",
    discount: "-77%",
    isSoldOut: false,
    color: "Green/Cream",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 135,
    name: "Tribal Zebra Duvet Cover and Pillowcase Set",
    price: "£39.99 – £49.99",
    image: "/images/printed-duvet-set/135.jpg",
    hoverImage: "/images/printed-duvet-set/135-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Black/White",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 136,
    name: "Tribute Duvet Cover and Pillowcase Set",
    price: "£13.49",
    image: "/images/printed-duvet-set/136.jpg",
    hoverImage: "/images/printed-duvet-set/136-hover.jpg",
    discount: "-73%",
    isSoldOut: false,
    color: "Grey",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 137,
    name: "Tropical Leaf Duvet Cover and Pillowcase Set",
    price: "£13.83 – £18.16",
    image: "/images/printed-duvet-set/137.jpg",
    hoverImage: "/images/printed-duvet-set/137-hover.jpg",
    discount: "-65%",
    isSoldOut: false,
    color: "Green",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 138,
    name: "Urban Ombre Duvet Cover and Pillowcase Set – Grey",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/138.jpg",
    hoverImage: "/images/printed-duvet-set/138-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Grey",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 139,
    name: "Urban Ombre Duvet Cover and Pillowcase Set – Pink",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/139.jpg",
    hoverImage: "/images/printed-duvet-set/139-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Pink",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 140,
    name: "Urban Ombre Duvet Cover and Pillowcase Set – Purple",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/140.jpg",
    hoverImage: "/images/printed-duvet-set/140-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Purple",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 141,
    name: "Urban Ombre Duvet Cover and Pillowcase Set – Teal",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/141.jpg",
    hoverImage: "/images/printed-duvet-set/141-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Teal",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 142,
    name: "Vibrance Duvet Cover and Pillowcase Set – Lime/Green",
    price: "£44.99 – £49.99",
    image: "/images/printed-duvet-set/142.jpg",
    hoverImage: "/images/printed-duvet-set/142-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Lime/Green",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 143,
    name: "Wave Ombre Duvet Cover and Pillowcase Set – Grey",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/143.jpg",
    hoverImage: "/images/printed-duvet-set/143-hover.jpg",
    discount: "-60%",
    isSoldOut: true,
    color: "Grey",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 144,
    name: "Wave Ombre Duvet Cover and Pillowcase Set – Purple",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/144.jpg",
    hoverImage: "/images/printed-duvet-set/144-hover.jpg",
    discount: "-60%",
    isSoldOut: true,
    color: "Purple",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 145,
    name: "Waverly Duvet Cover and Pillowcase Set – Grey",
    price: "£39.99 – £49.99",
    image: "/images/printed-duvet-set/145.jpg",
    hoverImage: "/images/printed-duvet-set/145-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Grey",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 146,
    name: "Waverly Duvet Cover and Pillowcase Set – Purple",
    price: "£39.99 – £49.99",
    image: "/images/printed-duvet-set/146.jpg",
    hoverImage: "/images/printed-duvet-set/146-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Purple",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 147,
    name: "Waverly Duvet Cover and Pillowcase Set – Red",
    price: "£39.99 – £49.99",
    image: "/images/printed-duvet-set/147.jpg",
    hoverImage: "/images/printed-duvet-set/147-hover.jpg",
    discount: "",
    isSoldOut: true,
    color: "Red",
    sizes: {
      single: false,
      double: false,
      king: false,
      superKing: false
    }
  },
  {
    id: 148,
    name: "Zander Duvet Cover and Pillowcase Set – Aqua",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/148.jpg",
    hoverImage: "/images/printed-duvet-set/148-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Aqua",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 149,
    name: "Zander Duvet Cover and Pillowcase Set – Blush Pink",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/149.jpg",
    hoverImage: "/images/printed-duvet-set/149-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Blush Pink",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  },
  {
    id: 150,
    name: "Zander Duvet Cover and Pillowcase Set – Grey",
    price: "£15.99 – £20.99",
    image: "/images/printed-duvet-set/150.jpg",
    hoverImage: "/images/printed-duvet-set/150-hover.jpg",
    discount: "-60%",
    isSoldOut: false,
    color: "Grey",
    sizes: {
      single: true,
      double: true,
      king: true,
      superKing: true
    }
  }
];

export default function PrintedDuvetSet() {
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
    try {
      const prefixedId = `printed_${id}`;
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
            src="/Bardsley_Check_Grey-scaled-2.jpg"
            alt="Printed Duvet Set Category"
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
              }}>Printed Duvet Set</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of printed duvet sets, perfect for adding personality to your bedroom
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
                      transform: wishlist.includes(`printed_duvet_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`printed_duvet_${product.id}`) ? '#e53935' : 'none'}
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
        // ... existing styles ...
      `}</style>
    </>
  );
}