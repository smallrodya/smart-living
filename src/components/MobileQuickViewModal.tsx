import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useBasket } from '@/context/BasketContext';
import toast from 'react-hot-toast';

interface BeddingSize {
  size: string;
  price: number;
  salePrice: number;
  sku?: string;
  stock?: number;
}

interface FootwearSize {
  size: string;
  regularPrice: number;
  salePrice: number;
  sku: string;
  stock: number;
}

interface TowelSize {
  size: string;
  regularPrice: number;
  salePrice: number;
  sku: string;
  stock: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  features: string;
  price: string;
  category: string;
  subcategory: string;
  sku: string;
  beddingSizes?: BeddingSize[];
  throwsTowelsStylePrices?: TowelSize[];
  beddingColors?: string[];
  throwsTowelsColors?: string[];
  beddingStyles?: string[];
  throwsTowelsStyles?: string[];
  images?: string[];
  discount?: number;
  isSoldOut?: boolean;
  isHot?: boolean;
  rugsMatsSizes?: {
    size: string;
    price: number;
    salePrice: number;
    sku?: string;
    stock?: number;
  }[];
  rugsMatsColors?: string[];
  clearanceDiscount?: number;
  outdoorPrice?: {
    sku: string;
    regularPrice: number;
    salePrice: number;
    stock: number;
  };
  outdoorColors?: string[];
  clothingStylePrices?: {
    size: string;
    regularPrice: number;
    salePrice: number;
    sku: string;
    stock: number;
  }[];
  clothingStyles?: string[];
  clothingColors?: string[];
  footwearSizes?: FootwearSize[];
}

interface MobileQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function MobileQuickViewModal({ product, onClose }: MobileQuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { addItem } = useBasket();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Добавляем эффект для управления скроллом
  useEffect(() => {
    if (product) { // Блокируем скролл только если модальное окно открыто
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      
      // Блокируем скролл на основной странице
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Возвращаем функцию очистки
      return () => {
        // Разблокируем скролл при закрытии модального окна
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // Восстанавливаем позицию скролла
        window.scrollTo(0, scrollY);
      };
    }
  }, [product]); // Эффект срабатывает при изменении product

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !isFullscreen) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, isFullscreen]);

  if (!product) return null;

  // Обработка свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Свайп влево
        setCurrentImageIndex((prev) => 
          prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
        );
      } else {
        // Свайп вправо
        setCurrentImageIndex((prev) => 
          prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
        );
      }
    }
  };

  const handleAddToCart = () => {
    if (product.isSoldOut || (product.category === 'OUTDOOR' && (!product.outdoorPrice || product.outdoorPrice.stock === 0)) || (product.category !== 'OUTDOOR' && isSelectedSizeOutOfStock())) {
      toast.error('This product is out of stock');
      return;
    }

    if (product.category === 'OUTDOOR') {
      if (!product.outdoorPrice) {
        toast.error('Product data is incomplete');
        return;
      }

      const price = product.discount 
        ? product.outdoorPrice.salePrice * (1 - product.discount / 100)
        : product.outdoorPrice.salePrice;

      addItem({
        id: product._id,
        title: product.title,
        price,
        image: product.images?.[0] || '/placeholder.jpg',
        category: product.category,
        sku: product.outdoorPrice.sku,
        quantity: quantity,
        stock: product.outdoorPrice.stock,
        size: 'One Size',
        clearanceDiscount: product.clearanceDiscount
      });
      toast.success('Product added to cart');
      onClose();
    } else if (product.category === 'FOOTWEAR') {
      if (!selectedSize) {
        toast.error('Please select a size');
        return;
      }

      const size = product.footwearSizes?.find(s => s.size === selectedSize);
      if (!size) {
        toast.error('Selected size not found');
        return;
      }

      const price = product.discount 
        ? size.salePrice * (1 - product.discount / 100)
        : size.salePrice;

      addItem({
        id: `${product._id}-${selectedSize}`,
        title: product.title,
        size: selectedSize,
        price,
        image: product.images?.[0] || '/placeholder.jpg',
        category: product.category,
        sku: size.sku,
        quantity: quantity,
        stock: size.stock,
        clearanceDiscount: product.clearanceDiscount
      });
      toast.success('Product added to cart');
      onClose();
    } else if (product.category === 'CLOTHING') {
      if (!selectedSize) {
        toast.error('Please select a style');
        return;
      }

      const style = product.clothingStylePrices?.find(s => s.size === selectedSize);
      if (!style) {
        toast.error('Selected style not found');
        return;
      }

      const price = product.discount 
        ? style.salePrice * (1 - product.discount / 100)
        : style.salePrice;

      addItem({
        id: `${product._id}-${selectedSize}`,
        title: product.title,
        size: selectedSize,
        price,
        image: product.images?.[0] || '/placeholder.jpg',
        category: product.category,
        sku: style.sku,
        quantity: quantity,
        stock: style.stock,
        clearanceDiscount: product.clearanceDiscount
      });
      toast.success('Product added to cart');
      onClose();
    } else {
      if (!selectedSize) {
        toast.error('Please select a style');
        return;
      }

      let price = 0;
      let sku = '';
      let stock = 0;

      if (product.category === 'RUGS & MATS') {
        const size = product.rugsMatsSizes?.find(s => s.size === selectedSize);
        if (size) {
          price = size.salePrice;
          sku = size.sku || `${product.sku}-${selectedSize}`;
          stock = size.stock || 0;
        }
      } else if (product.category === 'THROWS & TOWELS') {
        const style = product.throwsTowelsStylePrices?.find(s => s.size === selectedSize);
        if (style) {
          price = product.discount 
            ? style.salePrice * (1 - product.discount / 100)
            : style.salePrice;
          sku = style.sku;
          stock = style.stock;
        }
      } else if (product.beddingSizes) {
        const size = product.beddingSizes.find(s => s.size === selectedSize);
        if (size) {
          price = size.salePrice;
          sku = size.sku || `${product.sku}-${selectedSize}`;
          stock = size.stock || 0;
        }
      }

      if (price > 0) {
        addItem({
          id: `${product._id}-${selectedSize}`,
          title: product.title,
          size: selectedSize,
          price,
          image: product.images?.[0] || '/placeholder.jpg',
          category: product.category,
          sku,
          quantity: quantity,
          stock,
          clearanceDiscount: product.clearanceDiscount
        });
        toast.success('Product added to cart');
        onClose();
      } else {
        console.error('Error adding to cart:', {
          price,
          selectedSize,
          product,
          style: product.throwsTowelsStylePrices?.find(s => s.size === selectedSize)
        });
        toast.error('Unable to add product to cart. Please try again.');
      }
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const formatPriceRange = (product: Product) => {
    // OUTDOOR категория
    if (product.category === 'OUTDOOR') {
      if (!product.outdoorPrice) return '£0.00';
      const price = product.discount 
        ? product.outdoorPrice.salePrice * (1 - product.discount / 100)
        : product.outdoorPrice.salePrice;
      return formatPrice(price);
    }

    // FOOTWEAR категория
    if (product.category === 'FOOTWEAR') {
      if (!product.footwearSizes || product.footwearSizes.length === 0) return '£0.00';
      const prices = product.footwearSizes.map(size => {
        if (product.discount) {
          return size.salePrice * (1 - product.discount / 100);
        }
        return size.salePrice;
      });
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // THROWS & TOWELS категория
    if (product.category === 'THROWS & TOWELS') {
      if (!product.throwsTowelsStylePrices || product.throwsTowelsStylePrices.length === 0) return '£0.00';
      const prices = product.throwsTowelsStylePrices.map(style => {
        if (product.clearanceDiscount) {
          const discountedPrice = style.salePrice * (1 - product.clearanceDiscount / 100);
          return discountedPrice;
        }
        return style.salePrice;
      });
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // CLOTHING категория
    if (product.category === 'CLOTHING') {
      if (!product.clothingStylePrices || product.clothingStylePrices.length === 0) return '£0.00';
      const prices = product.clothingStylePrices.map(style => {
        if (product.clearanceDiscount) {
          const discountedPrice = style.salePrice * (1 - product.clearanceDiscount / 100);
          return discountedPrice;
        }
        return style.salePrice;
      });
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // RUGS & MATS категория
    if (product.category === 'RUGS & MATS') {
      if (!product.rugsMatsSizes || product.rugsMatsSizes.length === 0) return '£0.00';
      const prices = product.rugsMatsSizes.map(size => {
        if (product.clearanceDiscount) {
          const discountedPrice = size.salePrice * (1 - product.clearanceDiscount / 100);
          return discountedPrice;
        }
        return size.salePrice;
      });
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // CURTAINS категория (используем beddingSizes как curtainsSizes)
    if (product.category === 'CURTAINS') {
      if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
      const prices = product.beddingSizes.map(size => {
        if (product.clearanceDiscount) {
          const discountedPrice = size.salePrice * (1 - product.clearanceDiscount / 100);
          return discountedPrice;
        }
        return size.salePrice;
      });
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // BEDDING и другие категории (по умолчанию)
    if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
    const prices = product.beddingSizes.map(size => {
      if (product.clearanceDiscount) {
        const discountedPrice = size.salePrice * (1 - product.clearanceDiscount / 100);
        return discountedPrice;
      }
      return size.salePrice;
    });
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const getOriginalPriceRange = (product: Product) => {
    // OUTDOOR категория
    if (product.category === 'OUTDOOR') {
      if (!product.outdoorPrice) return '£0.00';
      return formatPrice(product.outdoorPrice.regularPrice);
    }

    // FOOTWEAR категория
    if (product.category === 'FOOTWEAR') {
      if (!product.footwearSizes || product.footwearSizes.length === 0) return '£0.00';
      const prices = product.footwearSizes.map(size => size.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // THROWS & TOWELS категория
    if (product.category === 'THROWS & TOWELS') {
      if (!product.throwsTowelsStylePrices || product.throwsTowelsStylePrices.length === 0) return '£0.00';
      const prices = product.throwsTowelsStylePrices.map(style => style.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // CLOTHING категория
    if (product.category === 'CLOTHING') {
      if (!product.clothingStylePrices || product.clothingStylePrices.length === 0) return '£0.00';
      const prices = product.clothingStylePrices.map(style => style.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // RUGS & MATS категория
    if (product.category === 'RUGS & MATS') {
      if (!product.rugsMatsSizes || product.rugsMatsSizes.length === 0) return '£0.00';
      const prices = product.rugsMatsSizes.map(size => size.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // CURTAINS категория
    if (product.category === 'CURTAINS') {
      if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
      const prices = product.beddingSizes.map(size => size.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    // BEDDING и другие категории (по умолчанию)
    if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
    const prices = product.beddingSizes.map(size => size.salePrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size === selectedSize ? '' : size);
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
  };

  const handleFullscreenSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentImageIndex((prev) => 
        prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
      );
    }
  };

  function isSelectedSizeOutOfStock() {
    if (!product || !selectedSize) return false;
    if (product.category === 'FOOTWEAR') {
      const size = product.footwearSizes?.find(s => s.size === selectedSize);
      return !size || size.stock === 0;
    }
    if (product.category === 'THROWS & TOWELS') {
      const style = product.throwsTowelsStylePrices?.find(s => s.size === selectedSize);
      return !style || style.stock === 0;
    }
    if (product.category === 'RUGS & MATS') {
      const size = product.rugsMatsSizes?.find(s => s.size === selectedSize);
      return !size || (size.stock || 0) === 0;
    }
    if (product.category === 'CLOTHING') {
      const size = product.clothingStylePrices?.find(s => s.size === selectedSize);
      return !size || size.stock === 0;
    }
    if (product.beddingSizes) {
      const size = product.beddingSizes.find(s => s.size === selectedSize);
      return !size || (size.stock || 0) === 0;
    }
    return false;
  }

  const getSelectedStock = () => {
    if (!product || !selectedSize) return 0;
    if (product.category === 'FOOTWEAR') {
      const size = product.footwearSizes?.find(s => s.size === selectedSize);
      return size?.stock || 0;
    }
    if (product.category === 'THROWS & TOWELS') {
      const style = product.throwsTowelsStylePrices?.find(s => s.size === selectedSize);
      return style?.stock || 0;
    }
    if (product.category === 'RUGS & MATS') {
      const size = product.rugsMatsSizes?.find(s => s.size === selectedSize);
      return size?.stock || 0;
    }
    if (product.category === 'CLOTHING') {
      const size = product.clothingStylePrices?.find(s => s.size === selectedSize);
      return size?.stock || 0;
    }
    if (product.beddingSizes) {
      const size = product.beddingSizes.find(s => s.size === selectedSize);
      return size?.stock || 0;
    }
    return 0;
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        height: '100vh',
        width: '100vw',
        overscrollBehavior: 'contain',
      }}>
        <div ref={modalRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            background: '#fff',
            padding: '16px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#222',
              margin: 0,
              flex: 1,
              paddingRight: '16px'
            }}>
              {product.title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            maxHeight: '100vh',
            minHeight: 0,
            overscrollBehavior: 'contain',
            background: '#fff',
          }}>
            {/* Images */}
            <div 
              ref={imageContainerRef}
              style={{
                width: '100%',
                height: '300px',
                position: 'relative',
                overflow: 'hidden',
                touchAction: 'pan-y pinch-zoom'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {product.images && product.images.length > 0 && product.images[currentImageIndex] ? (
                <>
                  <Image
                    key={`main-${product._id}-${currentImageIndex}`}
                    src={product.images[currentImageIndex] || '/placeholder.jpg'}
                    alt={product.title}
                    fill
                    priority
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                  <button
                    onClick={handleImageClick}
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 3,
                      backdropFilter: 'blur(4px)',
                      transition: 'background-color 0.2s ease'
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation(); // Предотвращаем срабатывание свайпа
                      handleImageClick();
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                    </svg>
                  </button>
                  {product.discount && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: '#e53935',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '12px',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(229,57,53,0.2)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 2
                    }}>
                      -{product.discount}%
                    </span>
                  )}
                  {product.isHot && (
                    <span style={{
                      position: 'absolute',
                      top: product.discount ? '52px' : '8px',
                      left: '8px',
                      background: '#000',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '12px',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 2
                    }}>
                      HOT
                    </span>
                  )}
                </>
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  No image
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                padding: '12px',
                background: '#fff'
              }}>
                {product.images.map((image, index) => (
                  image ? (
                    <button
                      key={`thumb-${product._id}-${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: currentImageIndex === index ? '2px solid #222' : '2px solid transparent',
                        padding: 0,
                        cursor: 'pointer',
                        background: 'none',
                        margin: 0,
                        touchAction: 'manipulation'
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        loading="eager"
                        style={{ 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </button>
                  ) : null
                ))}
              </div>
            )}

            {/* Price and Add to Cart */}
            <div style={{
              padding: '16px',
              background: '#fff',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{
                color: '#e53935',
                fontWeight: 700,
                fontSize: '20px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexWrap: 'nowrap',
                minWidth: 0,
                overflow: 'hidden',
              }}>
                {product.category === 'OUTDOOR' && product.outdoorPrice ? (
                  <>
                    {product.discount ? (
                      <>
                        <span style={{
                          color: '#999',
                          textDecoration: 'line-through',
                          fontSize: '16px'
                        }}>
                          £{product.outdoorPrice.regularPrice.toFixed(2)}
                        </span>
                        <span style={{
                          color: '#e53935',
                          fontSize: '24px'
                        }}>
                          £{product.outdoorPrice.salePrice.toFixed(2)}
                        </span>
                        <span style={{
                          background: '#e53935',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {product.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span>£{product.outdoorPrice.salePrice.toFixed(2)}</span>
                    )}
                  </>
                ) : (
                  product.clearanceDiscount ? (
                    <>
                      <span style={{
                        color: '#999',
                        textDecoration: 'line-through',
                        fontSize: '16px'
                      }}>
                        {getOriginalPriceRange(product)}
                      </span>
                      <span style={{
                        color: '#e53935',
                        fontSize: '24px'
                      }}>
                        {formatPriceRange(product)}
                      </span>
                      <span style={{
                        background: '#e53935',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {product.clearanceDiscount}% OFF
                      </span>
                    </>
                  ) : (
                    formatPriceRange(product)
                  )
                )}
              </div>

              {/* Sizes */}
              {(product.category !== 'OUTDOOR') && (product.beddingSizes || product.throwsTowelsStylePrices || product.rugsMatsSizes || product.clothingStylePrices || product.footwearSizes) && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    {product.category === 'THROWS & TOWELS' ? 'Available Styles' : 'Available Sizes'}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {product.footwearSizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size.size)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSize === size.size ? '#222' : '#eee',
                          background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          width: '100%',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{size.size}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: size.stock > 0 ? '#4CAF50' : '#e53935',
                            fontWeight: 500
                          }}>
                            {size.stock > 0 ? `${size.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#e53935', fontWeight: 600 }}>
                            {formatPrice(product.clearanceDiscount
                              ? size.salePrice * (1 - product.clearanceDiscount / 100)
                              : (product.discount
                                ? size.salePrice * (1 - product.discount / 100)
                                : size.salePrice)
                            )}
                          </span>
                          {selectedSize === size.size && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                    {product.clothingStylePrices?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size.size)}
                        style={{
                          padding: '16px 20px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: selectedSize === size.size ? '#222' : '#eee',
                          background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          width: '100%',
                          boxShadow: selectedSize === size.size ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{size.size}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: size.stock > 0 ? '#4CAF50' : '#e53935',
                            fontWeight: 500
                          }}>
                            {size.stock > 0 ? `${size.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: '#e53935', fontWeight: 600 }}>
                            {formatPrice(product.clearanceDiscount
                              ? size.salePrice * (1 - product.clearanceDiscount / 100)
                              : (product.discount
                                ? size.salePrice * (1 - product.discount / 100)
                                : size.salePrice)
                            )}
                          </span>
                          {selectedSize === size.size && (
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
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                    {product.beddingSizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size.size)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSize === size.size ? '#222' : '#eee',
                          background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          width: '100%',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{size.size}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: (size.stock || 0) > 0 ? '#4CAF50' : '#e53935',
                            fontWeight: 500
                          }}>
                            {(size.stock || 0) > 0 ? `${size.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#e53935', fontWeight: 600 }}>
                            {formatPrice(product.clearanceDiscount
                              ? size.salePrice * (1 - product.clearanceDiscount / 100)
                              : size.salePrice
                            )}
                          </span>
                          {selectedSize === size.size && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                    {product.rugsMatsSizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size.size)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSize === size.size ? '#222' : '#eee',
                          background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          width: '100%',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{size.size}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: (size.stock || 0) > 0 ? '#4CAF50' : '#e53935',
                            fontWeight: 500
                          }}>
                            {(size.stock || 0) > 0 ? `${size.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#e53935', fontWeight: 600 }}>
                            {formatPrice(product.clearanceDiscount
                              ? size.salePrice * (1 - product.clearanceDiscount / 100)
                              : size.salePrice
                            )}
                          </span>
                          {selectedSize === size.size && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                    {product.throwsTowelsStylePrices?.map((style, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(style.size)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSize === style.size ? '#222' : '#eee',
                          background: selectedSize === style.size ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          width: '100%',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{style.size}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: style.stock > 0 ? '#4CAF50' : '#e53935',
                            fontWeight: 500
                          }}>
                            {style.stock > 0 ? `${style.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#e53935', fontWeight: 600 }}>
                            {formatPrice(product.clearanceDiscount
                              ? style.salePrice * (1 - product.clearanceDiscount / 100)
                              : (product.discount
                                ? style.salePrice * (1 - product.discount / 100)
                                : style.salePrice)
                            )}
                          </span>
                          {selectedSize === style.size && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              {(
                (product.category === 'OUTDOOR' && product.outdoorPrice && product.outdoorPrice.stock > 0) ||
                (product.category !== 'OUTDOOR' && selectedSize && getSelectedStock() > 0)
              ) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: '1px solid #eee',
                      background: '#fafafa',
                      color: quantity <= 1 ? '#ccc' : '#222',
                      fontSize: 22,
                      fontWeight: 600,
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: 32, textAlign: 'center', fontSize: 18, fontWeight: 600 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min((product.category === 'OUTDOOR' ? product.outdoorPrice?.stock || 1 : getSelectedStock()), q + 1))}
                    disabled={quantity >= (product.category === 'OUTDOOR' ? product.outdoorPrice?.stock || 1 : getSelectedStock())}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: '1px solid #eee',
                      background: '#fafafa',
                      color: quantity >= (product.category === 'OUTDOOR' ? product.outdoorPrice?.stock || 1 : getSelectedStock()) ? '#ccc' : '#222',
                      fontSize: 22,
                      fontWeight: 600,
                      cursor: quantity >= (product.category === 'OUTDOOR' ? product.outdoorPrice?.stock || 1 : getSelectedStock()) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                  <span style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>
                    in stock: {product.category === 'OUTDOOR' ? product.outdoorPrice?.stock : getSelectedStock()}
                  </span>
                </div>
              )}

              {!product.isSoldOut && (
                <button
                  onClick={handleAddToCart}
                  disabled={product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? '#bdbdbd' : '#222',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 'not-allowed' : 'pointer',
                    filter: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 'blur(1px) grayscale(0.5)' : 'none',
                    opacity: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 0.7 : 1,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {product.isSoldOut ? 'Out of Stock' : (product.category === 'OUTDOOR' ? 'Add to Cart' : (selectedSize ? 'Add to Cart' : (product.category === 'THROWS & TOWELS' ? 'Select Style' : 'Select Size')))}
                </button>
              )}
            </div>

            {/* Sections */}
            <div style={{ padding: '16px' }}>
              {/* Description Section */}
              <div style={{
                marginBottom: '18px',
                background: '#f8f9fa',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '18px 16px',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#222', margin: 0, letterSpacing: 0.2 }}>Description</h3>
                </div>
                <div style={{ color: '#444', fontSize: 15, lineHeight: 1.7, marginBottom: 0, whiteSpace: 'pre-line' }}>
                  {product.description}
                </div>
              </div>
              {/* Features Section */}
              {product.features && (
                <div style={{
                  marginBottom: '18px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  padding: '18px 16px',
                  border: '1px solid #f0f0f0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#222', margin: 0, letterSpacing: 0.2 }}>Features</h3>
                  </div>
                  <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', color: '#444', fontSize: 15, lineHeight: 1.7 }}>
                    {typeof product.features === 'string'
                      ? product.features.split(/\n|,/).filter(Boolean).map((f, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
                            <span>{f.trim()}</span>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              )}

              {/* Colors */}
              {(product.category !== 'OUTDOOR') && (product.beddingColors || product.throwsTowelsColors || product.rugsMatsColors || product.clothingColors) && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: '#222'
                  }}>
                    Available Colors
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {product.clothingColors?.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid #eee',
                          background: '#f8f9fa',
                          color: '#444',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        {color}
                      </div>
                    ))}
                    {product.beddingColors?.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #eee',
                          background: '#f8f9fa',
                          color: '#444',
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        {color}
                      </div>
                    ))}
                    {product.throwsTowelsColors?.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #eee',
                          background: '#f8f9fa',
                          color: '#444',
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        {color}
                      </div>
                    ))}
                    {product.rugsMatsColors?.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #eee',
                          background: '#f8f9fa',
                          color: '#444',
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image View */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff'
          }}>
            <span style={{ fontSize: '14px' }}>
              {currentImageIndex + 1} / {product.images?.length}
            </span>
            <button
              onClick={handleFullscreenClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Image */}
          <div 
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => {
              const swipeThreshold = 50;
              const diff = touchStartX.current - touchEndX.current;

              if (Math.abs(diff) > swipeThreshold) {
                handleFullscreenSwipe(diff > 0 ? 'left' : 'right');
              }
            }}
          >
            {product.images && (
              <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                priority
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            <button
              onClick={() => handleFullscreenSwipe('right')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => handleFullscreenSwipe('left')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
} 