'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileReduceSpaceCarousel from './MobileReduceSpaceCarousel';
import { useRouter } from 'next/navigation';

interface WishlistItem {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  discount: string;
}

const images = [
  { src: '/reduce1.jpg', hoverSrc: '/reduce1-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', price: '£34.99', discount: '-65%' },
  { src: '/reduce2.jpg', hoverSrc: '/reduce2-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', price: '£34.90', discount: '-65%' },
  { src: '/reduce3.jpg', hoverSrc: '/reduce3-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Black', price: '£60.99', discount: '-49%' },
  { src: '/reduce4.jpg', hoverSrc: '/reduce4-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Grey', price: '£60.99', discount: '-49%' },
];

const DesktopReduceSpaceCarousel = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const handleWishlistToggle = (id: string) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id];
      
      const wishlistItems = images
        .filter(img => newWishlist.includes(img.src))
        .map(img => ({
          id: img.src,
          src: img.src,
          hoverSrc: img.hoverSrc,
          title: img.title,
          price: img.price,
          discount: img.discount
        }));
      
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      return newWishlist;
    });
  };

  const handleCardClick = (index: number) => {
    router.push(`/product/reduce/${index + 1}`);
  };

  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(index)}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={hoveredCard === index ? image.hoverSrc : image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-900">{image.title}</h3>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{image.price}</span>
                  {image.discount && (
                    <span className="ml-2 text-sm text-red-600">{image.discount}</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle(image.src);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={wishlist.includes(image.src) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ReduceSpaceCarousel() {
  return (
    <div>
      <DesktopReduceSpaceCarousel />
      <MobileReduceSpaceCarousel />
    </div>
  );
} 