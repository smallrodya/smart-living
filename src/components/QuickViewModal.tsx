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
  isClearance?: boolean;
  clearanceDiscount?: number;
}

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { addItem } = useBasket();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    let price = 0;
    let sku = '';
    let stock = 0;

    if (product.beddingSizes) {
      const size = product.beddingSizes.find(s => s.size === selectedSize);
      if (size) {
        price = size.salePrice;
        sku = size.sku || `${product.sku}-${selectedSize}`;
        stock = size.stock || 0;
      }
    } else if (product.throwsTowelsStylePrices) {
      const size = product.throwsTowelsStylePrices.find(s => s.size === selectedSize);
      if (size) {
        price = size.salePrice;
        sku = size.sku || `${product.sku}-${selectedSize}`;
        stock = size.stock || 0;
      }
    } else if (product.rugsMatsSizes) {
      const size = product.rugsMatsSizes.find(s => s.size === selectedSize);
      if (size) {
        price = size.salePrice;
        sku = size.sku || `${product.sku}-${selectedSize}`;
        stock = size.stock || 0;
      }
    }

    if (price > 0 && product.images && product.images.length > 0) {
      addItem({
        id: `${product._id}-${selectedSize}`,
        title: product.title,
        size: selectedSize,
        price,
        image: product.images[0],
        category: product.category,
        sku,
        quantity: 1,
        stock
      });
      toast.success('Product added to cart');
      onClose();
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const formatPriceRange = (product: Product) => {
    if (product.beddingSizes && product.beddingSizes.length > 0) {
      const prices = product.beddingSizes.map(size => size.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    } else if (product.throwsTowelsStylePrices && product.throwsTowelsStylePrices.length > 0) {
      const prices = product.throwsTowelsStylePrices.map(style => style.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    return '£0.00';
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
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
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
                ))}
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

            <div style={{
              color: '#e53935',
              fontWeight: 700,
              fontSize: '28px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {product.discount || product.isClearance ? (
                <>
                  {formatPriceRange(product)}
                  <span style={{
                    color: '#999',
                    textDecoration: 'line-through',
                    fontSize: '20px'
                  }}>
                    {formatPriceRange({ ...product, discount: undefined, isClearance: false })}
                  </span>
                  <span style={{
                    background: '#e53935',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 600
                  }}>
                    {product.discount ? `-${product.discount}%` : product.clearanceDiscount ? `-${product.clearanceDiscount}%` : ''} OFF
                  </span>
                </>
              ) : (
                formatPriceRange(product)
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '32px' }}>
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
                  marginBottom: openSection === 'description' ? '16px' : '0'
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
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Description
                </h3>
                <svg
                  width="24"
                  height="24"
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
                  lineHeight: '1.8',
                  fontSize: '16px',
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  margin: 0
                }}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Features */}
            <div style={{ marginBottom: '32px' }}>
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
                  marginBottom: openSection === 'features' ? '16px' : '0'
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
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Features
                </h3>
                <svg
                  width="24"
                  height="24"
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
                  lineHeight: '1.8',
                  fontSize: '16px',
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  margin: 0
                }}>
                  {product.features}
                </p>
              )}
            </div>

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

            {/* Sizes */}
            {(product.beddingSizes || product.throwsTowelsStylePrices || product.rugsMatsSizes) && (
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
                  Available Sizes
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {product.beddingSizes?.map((size, index) => (
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
                      <span>{size.size}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(size.salePrice)}
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
                  {product.throwsTowelsStylePrices?.map((size, index) => (
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
                      <span>{size.size}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#e53935', fontWeight: 600 }}>
                          {formatPrice(size.salePrice)}
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
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#222';
                          e.currentTarget.style.background = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size.size) {
                          e.currentTarget.style.borderColor = '#eee';
                          e.currentTarget.style.background = 'transparent';
                        }
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
            {(product.beddingColors || product.throwsTowelsColors) && (
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
                  {product.beddingColors?.map((color, index) => (
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
                  {product.throwsTowelsColors?.map((color, index) => (
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
                </div>
              </div>
            )}

            {/* Add to Cart button */}
            {!product.isSoldOut && (
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: selectedSize ? '#222' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: selectedSize ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: selectedSize ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedSize) {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSize) {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }
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
                {selectedSize ? 'Add to Cart' : 'Select Size'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 