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
    size1: boolean; // 60cm X 220cm
    size2: boolean; // 120cm X 170cm
    size3: boolean; // 160cm X 230cm
    size4: boolean; // 200cm X 290cm
  };
}

const products: Product[] = [
  { 
    id: 1, 
    name: 'Carved Rug Abstract – Beige Brown', 
    price: '£17.49 – £97.99', 
    image: '/carved1.jpg', 
    hoverImage: '/carved1-hover.jpg', 
    discount: '-91%',
    isSoldOut: true,
    color: 'Beige Brown',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 2, 
    name: 'Carved Rug Abstract – Brown Beige', 
    price: '£17.49 – £97.99', 
    image: '/carved2.jpg', 
    hoverImage: '/carved2-hover.jpg', 
    discount: '-91%',
    isSoldOut: true,
    color: 'Brown Beige',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 3, 
    name: 'Carved Rug Contemporary – Beige Black', 
    price: '£17.49 – £97.99', 
    image: '/carved3.jpg', 
    hoverImage: '/carved3-hover.jpg', 
    discount: '-91%',
    isSoldOut: true,
    color: 'Beige Black',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 4, 
    name: 'Carved Rug Contemporary – Beige Red', 
    price: '£17.49 – £97.99', 
    image: '/carved4.jpg', 
    hoverImage: '/carved4-hover.jpg', 
    discount: '-91%',
    isSoldOut: true,
    color: 'Beige Red',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 5, 
    name: 'Carved Rug Contemporary – Brown Beige', 
    price: '£17.49 – £97.99', 
    image: '/carved5.jpg', 
    hoverImage: '/carved5-hover.jpg', 
    discount: '-91%',
    isSoldOut: true,
    color: 'Brown Beige',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 6, 
    name: 'Carved Rug Contemporary – Grey Black', 
    price: '£32.99 – £117.49', 
    image: '/carved6.jpg', 
    hoverImage: '/carved6-hover.jpg', 
    discount: '-49%',
    isSoldOut: true,
    color: 'Grey Black',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 7, 
    name: 'Carved Rug Emperor 310 – Onyx Aqua', 
    price: '£28.54 – £116.77', 
    image: '/carved7.jpg', 
    hoverImage: '/carved7-hover.jpg', 
    discount: '-56%',
    color: 'Onyx Aqua',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 8, 
    name: 'Carved Rug Emperor 310 – Onyx Beige', 
    price: '£28.54 – £116.77', 
    image: '/carved8.jpg', 
    hoverImage: '/carved8-hover.jpg', 
    discount: '-56%',
    color: 'Onyx Beige',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 9, 
    name: 'Carved Rug Emperor 310 – Onyx Gold', 
    price: '£28.54 – £116.77', 
    image: '/carved9.jpg', 
    hoverImage: '/carved9-hover.jpg', 
    discount: '-56%',
    color: 'Onyx Gold',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 10, 
    name: 'Carved Rug Emperor 310 – Onyx Pink', 
    price: '£28.54 – £116.77', 
    image: '/carved10.jpg', 
    hoverImage: '/carved10-hover.jpg', 
    discount: '-56%',
    color: 'Onyx Pink',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 11, 
    name: 'Carved Rug Emperor 310 – Onyx Silver', 
    price: '£28.54 – £116.77', 
    image: '/carved11.jpg', 
    hoverImage: '/carved11-hover.jpg', 
    discount: '-56%',
    color: 'Onyx Silver',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 12, 
    name: 'Carved Rug Emperor 315 – Aqua', 
    price: '£28.54 – £116.77', 
    image: '/carved12.jpg', 
    hoverImage: '/carved12-hover.jpg', 
    discount: '-56%',
    color: 'Aqua',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 13, 
    name: 'Carved Rug Emperor 315 – Beige', 
    price: '£28.54 – £116.77', 
    image: '/carved13.jpg', 
    hoverImage: '/carved13-hover.jpg', 
    discount: '-56%',
    color: 'Beige',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 14, 
    name: 'Carved Rug Emperor 315 – Gold', 
    price: '£28.54 – £116.77', 
    image: '/carved14.jpg', 
    hoverImage: '/carved14-hover.jpg', 
    discount: '-56%',
    color: 'Gold',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 15, 
    name: 'Carved Rug Emperor 315 – Navy', 
    price: '£28.54 – £116.77', 
    image: '/carved15.jpg', 
    hoverImage: '/carved15-hover.jpg', 
    discount: '-56%',
    color: 'Navy',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 16, 
    name: 'Carved Rug Emperor 315 – Pink', 
    price: '£28.54 – £116.77', 
    image: '/carved16.jpg', 
    hoverImage: '/carved16-hover.jpg', 
    discount: '-56%',
    color: 'Pink',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 17, 
    name: 'Carved Rug Emperor 315 – Silver', 
    price: '£28.54 – £116.77', 
    image: '/carved17.jpg', 
    hoverImage: '/carved17-hover.jpg', 
    discount: '-56%',
    color: 'Silver',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 18, 
    name: 'Carved Rug Emperor 320 – Aqua', 
    price: '£28.54 – £116.77', 
    image: '/carved18.jpg', 
    hoverImage: '/carved18-hover.jpg', 
    discount: '-56%',
    color: 'Aqua',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 19, 
    name: 'Carved Rug Emperor 320 – Beige', 
    price: '£28.54 – £116.77', 
    image: '/carved19.jpg', 
    hoverImage: '/carved19-hover.jpg', 
    discount: '-56%',
    color: 'Beige',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 20, 
    name: 'Carved Rug Emperor 320 – Pink', 
    price: '£28.54 – £116.77', 
    image: '/carved20.jpg', 
    hoverImage: '/carved20-hover.jpg', 
    discount: '-56%',
    color: 'Pink',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 21, 
    name: 'Carved Rug Emperor 325 – Aqua', 
    price: '£28.54 – £116.77', 
    image: '/carved21.jpg', 
    hoverImage: '/carved21-hover.jpg', 
    discount: '-56%',
    color: 'Aqua',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 22, 
    name: 'Carved Rug Emperor 325 – Beige', 
    price: '£28.54 – £116.77', 
    image: '/carved22.jpg', 
    hoverImage: '/carved22-hover.jpg', 
    discount: '-56%',
    color: 'Beige',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 23, 
    name: 'Carved Rug Emperor 325 – Pink', 
    price: '£28.54 – £116.77', 
    image: '/carved23.jpg', 
    hoverImage: '/carved23-hover.jpg', 
    discount: '-56%',
    color: 'Pink',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 24, 
    name: 'Carved Rug Emperor 325 – Silver', 
    price: '£28.54 – £116.77', 
    image: '/carved24.jpg', 
    hoverImage: '/carved24-hover.jpg', 
    discount: '-56%',
    color: 'Silver',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 25, 
    name: 'Carved Rug Florence – Beige Brown', 
    price: '£15.13 – £84.76', 
    image: '/carved25.jpg', 
    hoverImage: '/carved25-hover.jpg', 
    discount: '-62%',
    isHot: true,
    color: 'Beige Brown',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 26, 
    name: 'Carved Rug Florence – Beige Red', 
    price: '£15.13 – £84.76', 
    image: '/carved26.jpg', 
    hoverImage: '/carved26-hover.jpg', 
    discount: '-62%',
    color: 'Beige Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 27, 
    name: 'Carved Rug Florence – Black Grey', 
    price: '£15.13 – £84.76', 
    image: '/carved27.jpg', 
    hoverImage: '/carved27-hover.jpg', 
    discount: '-62%',
    color: 'Black Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 28, 
    name: 'Carved Rug Florence – Black Purple', 
    price: '£15.13 – £84.76', 
    image: '/carved28.jpg', 
    hoverImage: '/carved28-hover.jpg', 
    discount: '-62%',
    color: 'Black Purple',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 29, 
    name: 'Carved Rug Florence – Black Red', 
    price: '£15.13 – £84.76', 
    image: '/carved29.jpg', 
    hoverImage: '/carved29-hover.jpg', 
    discount: '-62%',
    color: 'Black Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 30, 
    name: 'Carved Rug Florence – Black Teal', 
    price: '£15.13 – £84.76', 
    image: '/carved30.jpg', 
    hoverImage: '/carved30-hover.jpg', 
    discount: '-62%',
    color: 'Black Teal',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 31, 
    name: 'Carved Rug Florence – Black White', 
    price: '£15.13 – £84.76', 
    image: '/carved31.jpg', 
    hoverImage: '/carved31-hover.jpg', 
    discount: '-62%',
    color: 'Black White',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 32, 
    name: 'Carved Rug Florence – Brown Beige', 
    price: '£15.13 – £84.76', 
    image: '/carved32.jpg', 
    hoverImage: '/carved32-hover.jpg', 
    discount: '-62%',
    color: 'Brown Beige',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 33, 
    name: 'Carved Rug Florence – Brown Green', 
    price: '£15.13 – £84.76', 
    image: '/carved33.jpg', 
    hoverImage: '/carved33-hover.jpg', 
    discount: '-62%',
    color: 'Brown Green',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 34, 
    name: 'Carved Rug Florence – Brown Red', 
    price: '£15.13 – £84.76', 
    image: '/carved34.jpg', 
    hoverImage: '/carved34-hover.jpg', 
    discount: '-62%',
    color: 'Brown Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 35, 
    name: 'Carved Rug Florence – Grey Red', 
    price: '£15.13 – £84.76', 
    image: '/carved35.jpg', 
    hoverImage: '/carved35-hover.jpg', 
    discount: '-62%',
    color: 'Grey Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 36, 
    name: 'Carved Rug Florence – Red Black', 
    price: '£15.13 – £84.76', 
    image: '/carved36.jpg', 
    hoverImage: '/carved36-hover.jpg', 
    discount: '-62%',
    color: 'Red Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 37, 
    name: 'Carved Rug Multi – Circle Black', 
    price: '£14.70 – £116.77', 
    image: '/carved37.jpg', 
    hoverImage: '/carved37-hover.jpg', 
    discount: '-63%',
    color: 'Circle Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 38, 
    name: 'Carved Rug Multi – Circles Bright', 
    price: '£14.70 – £116.77', 
    image: '/carved38.jpg', 
    hoverImage: '/carved38-hover.jpg', 
    discount: '-63%',
    color: 'Circles Bright',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 39, 
    name: 'Carved Rug Multi – Cube', 
    price: '£14.70 – £116.77', 
    image: '/carved39.jpg', 
    hoverImage: '/carved39-hover.jpg', 
    discount: '-63%',
    color: 'Cube',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 40, 
    name: 'Carved Rug Multi – Diamond', 
    price: '£14.70 – £116.77', 
    image: '/carved40.jpg', 
    hoverImage: '/carved40-hover.jpg', 
    discount: '-63%',
    color: 'Diamond',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 41, 
    name: 'Carved Rug Multi – Geo Play', 
    price: '£14.70 – £116.77', 
    image: '/carved41.jpg', 
    hoverImage: '/carved41-hover.jpg', 
    discount: '-63%',
    color: 'Geo Play',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 42, 
    name: 'Carved Rug Multi – Geometric Triangle', 
    price: '£14.70 – £116.77', 
    image: '/carved42.jpg', 
    hoverImage: '/carved42-hover.jpg', 
    discount: '-63%',
    color: 'Geometric Triangle',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 43, 
    name: 'Carved Rug Multi – Groove', 
    price: '£14.70 – £116.77', 
    image: '/carved43.jpg', 
    hoverImage: '/carved43-hover.jpg', 
    discount: '-63%',
    isSoldOut: true,
    color: 'Groove',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 44, 
    name: 'Carved Rug Multi – Hexagon', 
    price: '£14.70 – £116.77', 
    image: '/carved44.jpg', 
    hoverImage: '/carved44-hover.jpg', 
    discount: '-63%',
    color: 'Hexagon',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 45, 
    name: 'Carved Rug Multi – Jazz', 
    price: '£14.70 – £116.77', 
    image: '/carved45.jpg', 
    hoverImage: '/carved45-hover.jpg', 
    discount: '-63%',
    color: 'Jazz',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 46, 
    name: 'Carved Rug Multi – Moonlight', 
    price: '£14.70 – £116.77', 
    image: '/carved46.jpg', 
    hoverImage: '/carved46-hover.jpg', 
    discount: '-63%',
    color: 'Moonlight',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 47, 
    name: 'Carved Rug Multi – Rectangles', 
    price: '£14.70 – £116.77', 
    image: '/carved47.jpg', 
    hoverImage: '/carved47-hover.jpg', 
    discount: '-63%',
    color: 'Rectangles',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 48, 
    name: 'Carved Rug Multi – Scales', 
    price: '£14.70 – £116.77', 
    image: '/carved48.jpg', 
    hoverImage: '/carved48-hover.jpg', 
    discount: '-63%',
    color: 'Scales',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 49, 
    name: 'Carved Rug Multi – Splash', 
    price: '£14.70 – £116.77', 
    image: '/carved49.jpg', 
    hoverImage: '/carved49-hover.jpg', 
    discount: '-63%',
    color: 'Splash',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 50, 
    name: 'Carved Rug Multi – Squares Bright', 
    price: '£14.70 – £116.77', 
    image: '/carved50.jpg', 
    hoverImage: '/carved50-hover.jpg', 
    discount: '-63%',
    color: 'Squares Bright',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 51, 
    name: 'Carved Rug Multi – Stripes', 
    price: '£14.70 – £116.77', 
    image: '/carved51.jpg', 
    hoverImage: '/carved51-hover.jpg', 
    discount: '-63%',
    color: 'Stripes',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 52, 
    name: 'Carved Rug Serenity 205 – Black', 
    price: '£28.54 – £116.77', 
    image: '/carved52.jpg', 
    hoverImage: '/carved52-hover.jpg', 
    discount: '-56%',
    color: 'Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 53, 
    name: 'Carved Rug Serenity 205 – Grey', 
    price: '£28.54 – £116.77', 
    image: '/carved53.jpg', 
    hoverImage: '/carved53-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 54, 
    name: 'Carved Rug Serenity 205 – Stone', 
    price: '£28.54 – £116.77', 
    image: '/carved54.jpg', 
    hoverImage: '/carved54-hover.jpg', 
    discount: '-56%',
    color: 'Stone',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 55, 
    name: 'Carved Rug Serenity 208 – Black', 
    price: '£28.54 – £116.77', 
    image: '/carved55.jpg', 
    hoverImage: '/carved55-hover.jpg', 
    discount: '-56%',
    color: 'Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 56, 
    name: 'Carved Rug Serenity 208 – Grey', 
    price: '£28.54 – £116.77', 
    image: '/carved56.jpg', 
    hoverImage: '/carved56-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 57, 
    name: 'Carved Rug Serenity 208 – Stone', 
    price: '£28.54 – £116.77', 
    image: '/carved57.jpg', 
    hoverImage: '/carved57-hover.jpg', 
    discount: '-56%',
    color: 'Stone',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 58, 
    name: 'Carved Rug Serenity 211 – Black', 
    price: '£28.54 – £116.77', 
    image: '/carved58.jpg', 
    hoverImage: '/carved58-hover.jpg', 
    discount: '-56%',
    color: 'Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 59, 
    name: 'Carved Rug Serenity 211 – Grey', 
    price: '£28.54 – £116.77', 
    image: '/carved59.jpg', 
    hoverImage: '/carved59-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 60, 
    name: 'Carved Rug Serenity 211 – Stone', 
    price: '£28.54 – £116.77', 
    image: '/carved60.jpg', 
    hoverImage: '/carved60-hover.jpg', 
    discount: '-56%',
    color: 'Stone',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 61, 
    name: 'Carved Rug Serenity 268 – Black', 
    price: '£28.54 – £116.77', 
    image: '/carved61.jpg', 
    hoverImage: '/carved61-hover.jpg', 
    discount: '-56%',
    color: 'Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 62, 
    name: 'Carved Rug Serenity 268 – Grey', 
    price: '£28.54 – £116.77', 
    image: '/carved62.jpg', 
    hoverImage: '/carved62-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 63, 
    name: 'Carved Rug Serenity 268 – Stone', 
    price: '£28.54 – £116.77', 
    image: '/carved63.jpg', 
    hoverImage: '/carved63-hover.jpg', 
    discount: '-56%',
    color: 'Stone',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 64, 
    name: 'Carved Rug Serenity 271 – Black', 
    price: '£28.54 – £116.77', 
    image: '/carved64.jpg', 
    hoverImage: '/carved64-hover.jpg', 
    discount: '-56%',
    color: 'Black',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 65, 
    name: 'Carved Rug Serenity 271 – Grey', 
    price: '£28.54 – £116.77', 
    image: '/carved65.jpg', 
    hoverImage: '/carved65-hover.jpg', 
    discount: '-56%',
    color: 'Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 66, 
    name: 'Carved Rug Serenity 271 – Stone', 
    price: '£28.54 – £116.77', 
    image: '/carved66.jpg', 
    hoverImage: '/carved66-hover.jpg', 
    discount: '-56%',
    color: 'Stone',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 67, 
    name: 'Havana Carved Rug – Beige Brown', 
    price: '£15.13 – £116.77', 
    image: '/carved67.jpg', 
    hoverImage: '/carved67-hover.jpg', 
    discount: '-43%',
    color: 'Beige Brown',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 68, 
    name: 'Havana Carved Rug – Beige Red', 
    price: '£15.13 – £116.77', 
    image: '/carved68.jpg', 
    hoverImage: '/carved68-hover.jpg', 
    discount: '-43%',
    isSoldOut: true,
    color: 'Beige Red',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 69, 
    name: 'Havana Carved Rug – Black Grey', 
    price: '£15.13 – £116.77', 
    image: '/carved69.jpg', 
    hoverImage: '/carved69-hover.jpg', 
    discount: '-43%',
    isSoldOut: true,
    color: 'Black Grey',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 70, 
    name: 'Havana Carved Rug – Black Red', 
    price: '£15.13 – £116.77', 
    image: '/carved70.jpg', 
    hoverImage: '/carved70-hover.jpg', 
    discount: '-43%',
    color: 'Black Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 71, 
    name: 'Havana Carved Rug – Black Teal', 
    price: '£15.13 – £116.77', 
    image: '/carved71.jpg', 
    hoverImage: '/carved71-hover.jpg', 
    discount: '-43%',
    color: 'Black Teal',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 72, 
    name: 'Havana Carved Rug – Brown Beige', 
    price: '£15.13 – £116.77', 
    image: '/carved72.jpg', 
    hoverImage: '/carved72-hover.jpg', 
    discount: '-43%',
    isSoldOut: true,
    color: 'Brown Beige',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 73, 
    name: 'Havana Carved Rug – Brown Red', 
    price: '£15.13 – £116.77', 
    image: '/carved73.jpg', 
    hoverImage: '/carved73-hover.jpg', 
    discount: '-43%',
    color: 'Brown Red',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 74, 
    name: 'Havana Carved Rug – Dark Grey', 
    price: '£15.13 – £116.77', 
    image: '/carved74.jpg', 
    hoverImage: '/carved74-hover.jpg', 
    discount: '-43%',
    isSoldOut: true,
    color: 'Dark Grey',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 75, 
    name: 'Havana Carved Rug – Dark Grey Blue', 
    price: '£15.13 – £116.77', 
    image: '/carved75.jpg', 
    hoverImage: '/carved75-hover.jpg', 
    discount: '-43%',
    color: 'Dark Grey Blue',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 76, 
    name: 'Havana Carved Rug – Grey Black', 
    price: '£15.13 – £116.77', 
    image: '/carved76.jpg', 
    hoverImage: '/carved76-hover.jpg', 
    discount: '-43%',
    isSoldOut: true,
    color: 'Grey Black',
    sizes: {
      size1: false,
      size2: false,
      size3: false,
      size4: false
    }
  },
  { 
    id: 77, 
    name: 'Havana Carved Rug – Grey Ochre', 
    price: '£15.13 – £116.77', 
    image: '/carved77.jpg', 
    hoverImage: '/carved77-hover.jpg', 
    discount: '-43%',
    color: 'Grey Ochre',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  },
  { 
    id: 78, 
    name: 'Havana Carved Rug – Purple Grey', 
    price: '£15.13 – £116.77', 
    image: '/carved78.jpg', 
    hoverImage: '/carved78-hover.jpg', 
    discount: '-70%',
    color: 'Purple Grey',
    sizes: {
      size1: true,
      size2: true,
      size3: true,
      size4: true
    }
  }
];

const CarvedRugsPage = () => {
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

  // Filter products based on price and color
  const filteredProducts = products.filter(product => {
    const [minPrice, maxPrice] = priceRange;
    const price = parseFloat(product.price.split('£')[1].split('–')[0].trim());
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    return price >= minPrice && price <= maxPrice && colorMatch;
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
      const prefixedId = `carved_${id}`;
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
              !item.id.startsWith('carved_')
            )
          : [];
        
        const newItems = products
          .filter((_, i) => newWishlist.includes(`carved_${i + 1}`))
          .map((item) => ({
            id: `carved_${item.id}`,
            src: item.image,
            hoverSrc: item.hoverImage,
            title: item.name,
            price: item.price,
            discount: item.discount
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
            src="/category-bannerrugs.jpg"
            alt="Carved Rugs Category"
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
                onClick={() => router.push('/')}
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
              }}>Carved Rugs</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of elegant carved rugs, perfect for adding texture and style to any space
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
                      { id: 'size1', label: '60cm X 220cm (2ft X 7.2ft)' },
                      { id: 'size2', label: '120cm X 170cm (4ft X 5.5ft)' },
                      { id: 'size3', label: '160cm X 230cm (5.2ft X 7.5ft)' },
                      { id: 'size4', label: '200cm X 290cm (6.5ft X 9.5ft)' }
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
                      transform: wishlist.includes(`carved_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`carved_${product.id}`) ? '#e53935' : 'none'}
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
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
                    marginBottom: '12px'
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
                        {size === 'size1' && '60x220cm'}
                        {size === 'size2' && '120x170cm'}
                        {size === 'size3' && '160x230cm'}
                        {size === 'size4' && '200x290cm'}
                      </span>
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

export default CarvedRugsPage; 