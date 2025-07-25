import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useBasket } from '@/context/BasketContext';
import toast from 'react-hot-toast';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileQuickViewModal from './MobileQuickViewModal';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

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

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { addItem } = useBasket();
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Function to get the target size based on current page
  const getTargetSize = () => {
    if (pathname.includes('/shop/single')) return 'Single';
    if (pathname.includes('/shop/double')) return 'Double';
    if (pathname.includes('/shop/king')) return 'King';
    if (pathname.includes('/shop/super-king')) return 'Super King';
    if (pathname.includes('/shop/crib') || pathname.includes('/shop/kids-bedding')) return 'Crib';
    return null; // No specific size filter
  };

  // Function to filter sizes based on current page
  const getFilteredSizes = (sizes: any[]) => {
    const targetSize = getTargetSize();
    if (!targetSize) return sizes; // Show all sizes if no specific page
    
    return sizes.filter(size => size.size === targetSize);
  };

  // Function to filter bedding sizes
  const getFilteredBeddingSizes = () => {
    if (!product?.beddingSizes) return [];
    return getFilteredSizes(product.beddingSizes);
  };

  // Function to filter rugs/mats sizes
  const getFilteredRugsMatsSizes = () => {
    if (!product?.rugsMatsSizes) return [];
    return getFilteredSizes(product.rugsMatsSizes);
  };

  // Function to filter throws/towels styles
  const getFilteredThrowsTowelsStyles = () => {
    if (!product?.throwsTowelsStylePrices) return [];
    return getFilteredSizes(product.throwsTowelsStylePrices);
  };

  // Function to filter clothing styles
  const getFilteredClothingStyles = () => {
    if (!product?.clothingStylePrices) return [];
    return getFilteredSizes(product.clothingStylePrices);
  };

  // Function to filter footwear sizes
  const getFilteredFootwearSizes = () => {
    if (!product?.footwearSizes) return [];
    return getFilteredSizes(product.footwearSizes);
  };

  // Auto-select the target size when modal opens
  useEffect(() => {
    const targetSize = getTargetSize();
    if (targetSize) {
      // Check if the target size exists in the product
      const hasTargetSize = 
        (product?.beddingSizes?.some(s => s.size === targetSize)) ||
        (product?.rugsMatsSizes?.some(s => s.size === targetSize)) ||
        (product?.throwsTowelsStylePrices?.some(s => s.size === targetSize)) ||
        (product?.clothingStylePrices?.some(s => s.size === targetSize)) ||
        (product?.footwearSizes?.some(s => s.size === targetSize));
      
      if (hasTargetSize) {
        setSelectedSize(targetSize);
      }
    }
  }, [product]);

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

  // Загрузка отзывов
  useEffect(() => {
    if (!product?._id) return;
    fetch(`/api/products/${product!._id}/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(() => setReviews([]));
  }, [product?._id, reviewSuccess]);

  // Отправка отзыва
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError(null);
    setReviewSuccess(false);
    try {
      const res = await fetch(`/api/products/${product!._id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: reviewRating,
          text: reviewText,
          userName: reviewName
        })
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setReviewText('');
      setReviewRating(5);
      setReviewName('');
      setReviewSuccess(true);
    } catch (e: any) {
      setReviewError(e.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (isMobile) {
    return <MobileQuickViewModal product={product} onClose={onClose} />;
  }

  if (!product) return null;

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
      toast.custom((t) => (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: '#222', fontWeight: 600 }}>Product added to cart</span>
          <Link href="/basket" style={{ marginLeft: 16, background: '#222', color: '#fff', borderRadius: 8, padding: '8px 18px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }} onClick={() => toast.dismiss(t.id)}>
            Basket
          </Link>
        </div>
      ));
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
      toast.custom((t) => (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: '#222', fontWeight: 600 }}>Product added to cart</span>
          <Link href="/basket" style={{ marginLeft: 16, background: '#222', color: '#fff', borderRadius: 8, padding: '8px 18px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }} onClick={() => toast.dismiss(t.id)}>
            Basket
          </Link>
        </div>
      ));
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
      toast.custom((t) => (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: '#222', fontWeight: 600 }}>Product added to cart</span>
          <Link href="/basket" style={{ marginLeft: 16, background: '#222', color: '#fff', borderRadius: 8, padding: '8px 18px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }} onClick={() => toast.dismiss(t.id)}>
            Basket
          </Link>
        </div>
      ));
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
        toast.custom((t) => (
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ color: '#222', fontWeight: 600 }}>Product added to cart</span>
            <Link href="/basket" style={{ marginLeft: 16, background: '#222', color: '#fff', borderRadius: 8, padding: '8px 18px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }} onClick={() => toast.dismiss(t.id)}>
              Basket
            </Link>
          </div>
        ));
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

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return 'N/A';
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(5px)'
    }}>
      <div ref={modalRef} style={{
        background: '#fff',
        borderRadius: '24px',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          padding: '40px'
        }}>
          {/* Left column - Images */}
          <div>
            <div style={{
              width: '100%',
              height: '500px',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
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
                      backdropFilter: 'blur(4px)',
                      zIndex: 2
                    }}>
                      -{product.discount}%
                    </span>
                  )}
                  {product.isHot && (
                    <span style={{
                      position: 'absolute',
                      top: product.discount ? '67px' : '12px',
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
                      backdropFilter: 'blur(4px)',
                      zIndex: 2
                    }}>
                      HOT
                    </span>
                  )}
                  {/* Fullscreen button */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      zIndex: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1))}
                        style={{
                          position: 'absolute',
                          left: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          zIndex: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === (product.images?.length || 1) - 1 ? 0 : prev + 1))}
                        style={{
                          position: 'absolute',
                          right: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          zIndex: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    </>
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
                gap: '12px',
                padding: '10px 0',
                width: '100%'
              }}>
                {product.images.map((image, index) => (
                  image ? (
                    <button
                      key={`thumb-${product._id}-${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: currentImageIndex === index ? '2px solid #222' : '2px solid transparent',
                        padding: 0,
                        cursor: 'pointer',
                        background: 'none',
                        margin: 0,
                        transition: 'all 0.2s ease',
                        boxShadow: currentImageIndex === index ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (currentImageIndex !== index) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentImageIndex !== index) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <Image
                        key={`thumb-img-${product._id}-${index}`}
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

            {/* Size Guide Image for Bedding Category */}
            {product.category === 'BEDDING' && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: '#222',
                  textAlign: 'center'
                }}>
                  Size Guide
                </h4>
                <div style={{
                  width: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <Image
                    src="/SizesDuvetSets.jpg"
                    alt="Duvet Set Size Guide"
                    width={400}
                    height={300}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right column - Product info */}
          <div style={{ padding: '20px 0' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#222',
              lineHeight: '1.2'
            }}>
              {product.title}
            </h2>

            {/* Price display */}
            <div style={{
              color: '#e53935',
              fontWeight: 700,
              fontSize: '28px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {(() => {
                function getMinPrices(product: Product) {
                  let sale = 0, regular = 0;
                  if (product!.category === 'OUTDOOR' && product!.outdoorPrice) {
                    sale = product!.outdoorPrice.salePrice;
                    regular = product!.outdoorPrice.regularPrice;
                  } else if (product!.category === 'FOOTWEAR' && product!.footwearSizes?.length) {
                    sale = Math.min(...product!.footwearSizes.map((s: any) => s.salePrice));
                    regular = Math.min(...product!.footwearSizes.map((s: any) => s.regularPrice ?? s.price ?? s.salePrice));
                  } else if (product!.category === 'THROWS & TOWELS' && product!.throwsTowelsStylePrices?.length) {
                    sale = Math.min(...product!.throwsTowelsStylePrices.map((s: any) => s.salePrice));
                    regular = Math.min(...product!.throwsTowelsStylePrices.map((s: any) => s.regularPrice ?? s.price ?? s.salePrice));
                  } else if (product!.category === 'CLOTHING' && product!.clothingStylePrices?.length) {
                    sale = Math.min(...product!.clothingStylePrices.map((s: any) => s.salePrice));
                    regular = Math.min(...product!.clothingStylePrices.map((s: any) => s.regularPrice ?? s.price ?? s.salePrice));
                  } else if (product!.category === 'RUGS & MATS' && product!.rugsMatsSizes?.length) {
                    sale = Math.min(...product!.rugsMatsSizes.map((s: any) => s.salePrice));
                    regular = Math.min(...product!.rugsMatsSizes.map((s: any) => s.regularPrice ?? s.price ?? s.salePrice));
                  } else if (product!.beddingSizes?.length) {
                    sale = Math.min(...product!.beddingSizes.map((s: any) => s.salePrice));
                    regular = Math.min(...product!.beddingSizes.map((s: any) => s.regularPrice ?? s.price ?? s.salePrice));
                  }
                  return { sale, regular };
                }
                const { sale, regular } = getMinPrices(product!);
                let priceBlock = null;
                if (selectedSize) {
                  // Найти выбранный объект размера/стиля
                  let selectedObj = null;
                  if (product.beddingSizes) selectedObj = product.beddingSizes.find(s => s.size === selectedSize);
                  if (!selectedObj && product.throwsTowelsStylePrices) selectedObj = product.throwsTowelsStylePrices.find(s => s.size === selectedSize);
                  if (!selectedObj && product.rugsMatsSizes) selectedObj = product.rugsMatsSizes.find(s => s.size === selectedSize);
                  if (!selectedObj && product.clothingStylePrices) selectedObj = product.clothingStylePrices.find(s => s.size === selectedSize);
                  if (!selectedObj && product.footwearSizes) selectedObj = product.footwearSizes.find(s => s.size === selectedSize);
                  if (selectedObj) {
                    let sale = 0;
                    let regular = 0;
                    if ('salePrice' in selectedObj && typeof selectedObj.salePrice === 'number') sale = selectedObj.salePrice;
                    if ('regularPrice' in selectedObj && typeof selectedObj.regularPrice === 'number') regular = selectedObj.regularPrice;
                    if (!regular && 'price' in selectedObj && typeof selectedObj.price === 'number') regular = selectedObj.price;
                    if (!sale && 'price' in selectedObj && typeof selectedObj.price === 'number') sale = selectedObj.price;
                    if (!regular) regular = sale;
                    if (sale < regular) {
                      priceBlock = <>
                        <span style={{ fontWeight: 500, color: '#222', marginRight: 8 }}>From:</span>
                        <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '20px', marginRight: 8 }}>£{regular.toFixed(2)}</span>
                        <span style={{ color: '#e53935', fontWeight: 700, fontSize: '28px' }}>£{sale.toFixed(2)}</span>
                      </>;
                    } else {
                      priceBlock = <>
                        <span style={{ fontWeight: 500, color: '#222', marginRight: 8 }}>From:</span>
                        <span style={{ color: '#222', fontWeight: 700, fontSize: '28px' }}>£{regular.toFixed(2)}</span>
                      </>;
                    }
                  }
                }
                if (!priceBlock) {
                  // fallback: минимальная цена (как сейчас)
                  if (sale < regular && sale > 0) {
                    priceBlock = <>
                      <span style={{ fontWeight: 500, color: '#222', marginRight: 8 }}>From:</span>
                      <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '20px', marginRight: 8 }}>£{regular.toFixed(2)}</span>
                      <span style={{ color: '#e53935', fontWeight: 700, fontSize: '28px' }}>£{sale.toFixed(2)}</span>
                    </>;
                  } else if (sale > 0) {
                    priceBlock = <>
                      <span style={{ fontWeight: 500, color: '#222', marginRight: 8 }}>From:</span>
                      <span style={{ color: '#222', fontWeight: 700, fontSize: '28px' }}>£{regular.toFixed(2)}</span>
                    </>;
                  }
                }
                return priceBlock;
              })()}
            </div>

            {/* Sizes */}
            {(product.category !== 'OUTDOOR') && (product.beddingSizes || product.throwsTowelsStylePrices || product.rugsMatsSizes || product.clothingStylePrices || product.footwearSizes) && (
              <div style={{ marginBottom: '32px' }}>
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
                  gap: '12px'
                }}>
                  {getFilteredFootwearSizes().map((size, index) => (
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
                      onMouseEnter={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>{size.size}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(product.clearanceDiscount
                            ? size.salePrice * (1 - product.clearanceDiscount / 100)
                            : size.salePrice
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
                  {getFilteredThrowsTowelsStyles().map((style, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(style.size)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: selectedSize === style.size ? '#222' : '#eee',
                        background: selectedSize === style.size ? '#f8f9fa' : 'transparent',
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
                        boxShadow: selectedSize === style.size ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== style.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== style.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>{style.size}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  {getFilteredBeddingSizes().map((size, index) => (
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
                      onMouseEnter={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>{size.size}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(product.clearanceDiscount
                            ? size.salePrice * (1 - product.clearanceDiscount / 100)
                            : size.salePrice
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
                  {getFilteredRugsMatsSizes().map((size, index) => (
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
                      onMouseEnter={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>{size.size}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(product.clearanceDiscount
                            ? size.salePrice * (1 - product.clearanceDiscount / 100)
                            : size.salePrice
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
                  {getFilteredClothingStyles().map((size, index) => (
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
                      onMouseEnter={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>{size.size}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(product.clearanceDiscount
                            ? size.salePrice * (1 - product.clearanceDiscount / 100)
                            : size.salePrice
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
              </div>
            )}

            {/* Add to Cart button */}
            {!((product.category === 'OUTDOOR' && product.outdoorPrice && product.outdoorPrice.stock === 0) || product.isSoldOut) && (
              <button
                onClick={handleAddToCart}
                disabled={product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? '#bdbdbd' : '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 'not-allowed' : 'pointer',
                  filter: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 'blur(1px) grayscale(0.5)' : 'none',
                  opacity: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: (product.isSoldOut || (product.category === 'OUTDOOR' ? (!product.outdoorPrice || product.outdoorPrice.stock === 0) : (!selectedSize || isSelectedSizeOutOfStock()))) ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <svg
                  width="24"
                  height="24"
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
                {product.isSoldOut ? 'Out of Stock' : (product.category === 'OUTDOOR' ? 'Add to Basket' : (selectedSize ? 'Add to Basket' : (product.category === 'THROWS & TOWELS' ? 'Select Style' : 'Select Size')))}
              </button>
            )}
            {(product.category === 'OUTDOOR' && product.outdoorPrice && product.outdoorPrice.stock === 0) && (
              <button
                disabled
                style={{
                  width: '100%',
                  padding: '20px',
                  background: '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                  marginTop: '0',
                  marginBottom: '0',
                  opacity: 1
                }}
              >
                Out of stock
              </button>
            )}

            {/* Description Section */}
            <div style={{
              marginBottom: '32px',
              background: '#f8f9fa',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '28px 32px',
              border: '1px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0, letterSpacing: 0.2 }}>Description</h3>
              </div>
              <div style={{ color: '#444', fontSize: 16, lineHeight: 1.7, marginBottom: 0, whiteSpace: 'pre-line' }}>
                {product.description}
              </div>
            </div>

            {/* Features Section */}
            {product.features && (
              <div style={{
                marginBottom: '32px',
                background: '#f8f9fa',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '28px 32px',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0, letterSpacing: 0.2 }}>Features</h3>
                </div>
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', color: '#444', fontSize: 16, lineHeight: 1.7 }}>
                  {typeof product.features === 'string'
                    ? product.features.split(/\n|,/).filter(Boolean).map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
                          <span>{f.trim()}</span>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}

            {/* Shipping */}
            <div style={{ marginBottom: '32px' }}>
              <button
                onClick={() => toggleSection('shipping')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  cursor: 'pointer',
                  marginBottom: openSection === 'shipping' ? '16px' : '0'
                }}
              >
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#222',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  Shipping
                </h3>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: openSection === 'shipping' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {openSection === 'shipping' && (
                <div style={{
                  color: '#666',
                  lineHeight: '1.8',
                  fontSize: '16px',
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  margin: 0
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Free Mainland UK Delivery</h4>
                    <p>We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Same-Day Dispatch</h4>
                    <p>Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Delivery Timeframes</h4>
                    <p>Standard Delivery (Free): Estimated delivery within 2 to 5 working days.<br />
                    Express Delivery (Paid): Delivered on the next working day.</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Packaging Information</h4>
                    <p>Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. This does not impact the quality or performance of the product.</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Order Tracking</h4>
                    <p>A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>
                  </div>

                  <div>
                    <h4 style={{ color: '#222', marginBottom: '8px', fontSize: '18px' }}>Need Help?</h4>
                    <p>If you experience any issues with your delivery, our customer service team is happy to assist.</p>
                    <div style={{ marginTop: '8px' }}>
                      <p>📧 Email: support@smart-living.co.uk</p>
                      <p>📞 Phone: 01384 521170</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Секция отзывов */}
            <div style={{ marginBottom: 32, background: '#f8f9fa', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '28px 32px', border: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0, letterSpacing: 0.2 }}>Reviews</h3>
          </div>
              {/* Форма отзыва */}
              <form onSubmit={handleReviewSubmit} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                  <input type="text" placeholder="Your name (optional)" value={reviewName} onChange={e => setReviewName(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
                  <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }}>
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{'★'.repeat(r)}</option>)}
                  </select>
                </div>
                <textarea required minLength={5} maxLength={1000} placeholder="Your review..." value={reviewText} onChange={e => setReviewText(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', minHeight: 60, marginBottom: 8 }} />
                <button type="submit" disabled={reviewLoading} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }}>Submit review</button>
                {reviewError && <div style={{ color: 'red', marginTop: 8 }}>{reviewError}</div>}
                {reviewSuccess && <div style={{ color: 'green', marginTop: 8 }}>Review submitted for moderation!</div>}
              </form>
              {/* Список отзывов */}
              <div>
                {reviews.length === 0 && <div style={{ color: '#888' }}>No reviews yet.</div>}
                {reviews.map((r, i) => (
                  <div key={r._id || i} style={{ marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ color: '#e53935', fontWeight: 700 }}>{'★'.repeat(r.rating)}</span>
                      <span style={{ color: '#222', fontWeight: 600 }}>{r.userName || 'Anonymous'}</span>
                      <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ color: '#444', fontSize: 16 }}>{r.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && product && product.images && product.images.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 10,
                backdropFilter: 'blur(4px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Main image */}
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />

            {/* Navigation buttons */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1))}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1))}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            {product.images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                backdropFilter: 'blur(4px)'
              }}>
                {currentImageIndex + 1} / {product.images.length}
              </div>
            )}

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                padding: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)'
              }}>
                {product.images.map((image, index) => (
                  <button
                    key={`fullscreen-thumb-${index}`}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: currentImageIndex === index ? '2px solid #fff' : '2px solid transparent',
                      padding: 0,
                      cursor: 'pointer',
                      background: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (currentImageIndex !== index) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentImageIndex !== index) {
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - thumbnail ${index + 1}`}
                      width={60}
                      height={60}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 