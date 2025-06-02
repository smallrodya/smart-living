import { useState } from 'react';
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
  const { addItem } = useBasket();

  if (!product) return null;

  const handleAddToCart = () => {
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
        quantity: 1,
        stock: product.outdoorPrice.stock,
        size: 'One Size'
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
        quantity: 1,
        stock: size.stock
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
        quantity: 1,
        stock: style.stock
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
          quantity: 1,
          stock
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
    if (product.category === 'FOOTWEAR') {
      if (!product.footwearSizes || product.footwearSizes.length === 0) return '£0.00';
      const prices = product.footwearSizes.map(size => size.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    if (product.category === 'THROWS & TOWELS') {
      if (!product.throwsTowelsStylePrices || product.throwsTowelsStylePrices.length === 0) return '£0.00';
      const prices = product.throwsTowelsStylePrices.map(style => style.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }

    if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
    const prices = product.beddingSizes.map(size => size.salePrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size === selectedSize ? '' : size);
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
      flexDirection: 'column',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: '#fff',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
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
            fontSize: '20px',
            fontWeight: 600,
            color: '#222',
            margin: 0,
            flex: 1
          }}>
            {product.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
          overflow: 'auto',
          padding: '16px'
        }}>
          {/* Images */}
          <div style={{
            width: '100%',
            height: '300px',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            {product.images && product.images.length > 0 ? (
              <>
                <Image
                  key={`main-${product._id}-${currentImageIndex}`}
                  src={product.images[currentImageIndex]}
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
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1))}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === (product.images?.length || 1) - 1 ? 0 : prev + 1))}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
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
              gap: '8px',
              marginBottom: '16px'
            }}>
              {product.images.map((image, index) => (
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
                    margin: 0
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
              ))}
            </div>
          )}

          {/* Price display */}
          <div style={{
            color: '#e53935',
            fontWeight: 700,
            fontSize: '24px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
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

          {/* Description */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => toggleSection('description')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                marginBottom: openSection === 'description' ? '8px' : '0'
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#222',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Description
              </h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: openSection === 'description' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {openSection === 'description' && (
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: '14px',
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '8px',
                margin: 0
              }}>
                {product.description}
              </p>
            )}
          </div>

          {/* Features */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => toggleSection('features')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                marginBottom: openSection === 'features' ? '8px' : '0'
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#222',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Features
              </h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: openSection === 'features' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {openSection === 'features' && (
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: '14px',
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '8px',
                margin: 0
              }}>
                {product.features}
              </p>
            )}
          </div>

          {/* Shipping */}
          <div style={{ marginBottom: '16px' }}>
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
                marginBottom: openSection === 'shipping' ? '8px' : '0'
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#222',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
                Shipping
              </h3>
              <svg
                width="20"
                height="20"
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
                lineHeight: '1.6',
                fontSize: '14px',
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '8px',
                margin: 0
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Free Mainland UK Delivery</h4>
                  <p>We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Same-Day Dispatch</h4>
                  <p>Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Delivery Timeframes</h4>
                  <p>Standard Delivery (Free): Estimated delivery within 2 to 5 working days.<br />
                  Express Delivery (Paid): Delivered on the next working day.</p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Packaging Information</h4>
                  <p>Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. This does not impact the quality or performance of the product.</p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Order Tracking</h4>
                  <p>A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>
                </div>

                <div>
                  <h4 style={{ color: '#222', marginBottom: '4px', fontSize: '14px' }}>Need Help?</h4>
                  <p>If you experience any issues with your delivery, our customer service team is happy to assist.</p>
                  <div style={{ marginTop: '8px' }}>
                    <p>📧 Email: support@smart-living.co.uk</p>
                    <p>📞 Phone: 01384 521170</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sizes */}
          {(product.beddingSizes || product.throwsTowelsStylePrices || product.rugsMatsSizes || product.clothingStylePrices || product.footwearSizes) && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#222',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                {product.category === 'THROWS & TOWELS' || product.category === 'CLOTHING' ? 'Available Styles' : 'Available Sizes'}
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
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedSize === size.size ? '#222' : '#eee',
                      background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <span>{size.size}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e53935', fontWeight: 600 }}>
                        {formatPrice(product.discount 
                          ? size.salePrice * (1 - product.discount / 100)
                          : size.salePrice)}
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
                {product.clothingStylePrices?.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeSelect(style.size)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedSize === style.size ? '#222' : '#eee',
                      background: selectedSize === style.size ? '#f8f9fa' : 'transparent',
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <span>{style.size}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e53935', fontWeight: 600 }}>
                        {formatPrice(product.discount 
                          ? style.salePrice * (1 - product.discount / 100)
                          : style.salePrice)}
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
                {product.beddingSizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeSelect(size.size)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedSize === size.size ? '#222' : '#eee',
                      background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <span>{size.size}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e53935', fontWeight: 600 }}>
                        {formatPrice(size.salePrice)}
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
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedSize === size.size ? '#222' : '#eee',
                      background: selectedSize === size.size ? '#f8f9fa' : 'transparent',
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <span>{size.size}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e53935', fontWeight: 600 }}>
                        {formatPrice(size.salePrice)}
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
              </div>
            </div>
          )}

          {/* Colors */}
          {(product.beddingColors || product.throwsTowelsColors || product.rugsMatsColors) && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '8px',
                color: '#222'
              }}>
                Available Colors
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
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

        {/* Footer */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: '#fff',
          padding: '16px',
          borderTop: '1px solid #eee',
          zIndex: 10
        }}>
          {!product.isSoldOut && (
            <button
              onClick={handleAddToCart}
              disabled={product.category !== 'OUTDOOR' && !selectedSize}
              style={{
                width: '100%',
                padding: '16px',
                background: (product.category === 'OUTDOOR' || selectedSize) ? '#222' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: (product.category === 'OUTDOOR' || selectedSize) ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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
              {product.category === 'OUTDOOR' ? 'Add to Cart' : (selectedSize ? 'Add to Cart' : 'Select Size')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 