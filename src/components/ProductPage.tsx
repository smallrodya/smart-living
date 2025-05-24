'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Magnifier } from 'react-image-magnifiers';

interface ProductDimensions {
  open: string;
  folded: string;
}

interface ProductDescription {
  main: string;
  features: string[];
}

interface ProductAdditional {
  material: string;
  dimensions: ProductDimensions;
}

interface Product {
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  images: string[];
  description: ProductDescription;
  additional: ProductAdditional;
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToBasket = () => {
    if (typeof window === 'undefined') return;
    const priceNum = parseFloat((product.price || '').replace(/[^\d.]/g, ''));
    const basketRaw = window.localStorage.getItem('basket');
    let basket = [];
    try {
      basket = basketRaw ? JSON.parse(basketRaw) : [];
    } catch {
      basket = [];
    }
    const itemId = `${product.title}`;
    const existing = basket.find((item: any) => item.id === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      basket.push({
        id: itemId,
        title: product.title,
        price: priceNum,
        quantity
      });
    }
    window.localStorage.setItem('basket', JSON.stringify(basket));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f8f8',
      padding: isMobile ? '12px' : '20px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 24 : 40,
        padding: isMobile ? '40px 12px' : '40px 20px',
      }}>
        {/* Image Gallery */}
        <div style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 16,
          padding: isMobile ? 12 : 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          height: 'fit-content',
        }}>
          {/* Back Button */}
          <button
            onClick={handleBack}
            style={{
              position: 'absolute',
              top: isMobile ? -50 : -55,
              left: 0,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1000,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            marginBottom: isMobile ? 12 : 20,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {isMobile ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width={600}
                height={600}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <Magnifier
                imageSrc={product.images[selectedImage]}
                imageAlt={product.title}
                mouseActivation="hover"
                dragToMove={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                magnifierSize="50%"
                magnifierBorderSize={2}
                magnifierBorderColor="#e53935"
              />
            )}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 2,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 2,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: '#e53935',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(229,57,53,0.2)',
            }}>
              {product.discount}
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: isMobile ? 8 : 10,
          }}>
            {product.images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: selectedImage === index ? '2px solid #e53935' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => setSelectedImage(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 16 : 24,
        }}>
          <div>
            <h1 style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 700,
              marginBottom: 16,
              color: '#222',
              lineHeight: 1.2,
            }}>
              {product.title}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}>
              <p style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: 700,
                color: '#e53935',
              }}>
                {product.price}
              </p>
              <p style={{
                fontSize: isMobile ? 16 : 18,
                fontWeight: 500,
                color: '#999',
                textDecoration: 'line-through',
              }}>
                {product.oldPrice}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 12,
              padding: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #eee',
              width: isMobile ? '100%' : 'fit-content',
              justifyContent: 'center',
            }}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                style={{
                  width: 40,
                  height: 40,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 24,
                  fontWeight: 300,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  borderRadius: '8px',
                  color: quantity > 1 ? '#222' : '#ccc',
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  if (quantity > 1) {
                    e.currentTarget.style.background = '#f8f8f8';
                    e.currentTarget.style.color = '#e53935';
                  }
                }}
                onMouseLeave={(e) => {
                  if (quantity > 1) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#222';
                  }
                }}
              >
                −
              </button>
              <span style={{
                width: 40,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 600,
                color: '#222',
                userSelect: 'none',
              }}>
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                style={{
                  width: 40,
                  height: 40,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 24,
                  fontWeight: 300,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  borderRadius: '8px',
                  color: '#222',
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f8f8';
                  e.currentTarget.style.color = '#e53935';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#222';
                }}
              >
                +
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: isMobile ? 'stretch' : 'flex-start', width: isMobile ? '100%' : 'auto' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
                <button
                  style={{
                    width: isMobile ? '100%' : 220,
                    minWidth: 180,
                    padding: '16px 0',
                    background: '#222',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'block',
                  }}
                  onClick={handleAddToBasket}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Add to Basket
                </button>
                {added && (
                  <span style={{ color: '#43a047', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: 16 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10 18 4 12" /></svg>
                    Added to basket!
                  </span>
                )}
              </div>
              <button
                style={{
                  width: isMobile ? '100%' : 220,
                  minWidth: 180,
                  padding: '16px 0',
                  background: '#e53935',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(229,57,53,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Buy Now
              </button>
            </div>
          </div>

          <div style={{
            marginTop: 16,
            padding: '16px',
            background: '#f8f8f8',
            borderRadius: 8,
            fontSize: isMobile ? 13 : 14,
            color: '#666',
            lineHeight: 1.6,
          }}>
            {product.title.includes('Zero Gravity Chair with Cushion & Pillow – Black') ? (
              <>
                <p style={{ marginBottom: 8 }}>Reclining function : 90-166 Degree</p>
                <p>It is ideal for those lazy days of summer</p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: 8 }}>Reclines through many positions</p>
                <p style={{ marginBottom: 8 }}>Three Level Adjustment</p>
                <p>It is ideal for those lazy days of summer</p>
              </>
            )}
          </div>

          {/* Tabs */}
          <div style={{
            borderTop: '1px solid #eee',
            marginTop: 24,
          }}>
            <div style={{
              display: 'flex',
              gap: isMobile ? 16 : 32,
              marginBottom: 24,
              overflowX: isMobile ? 'auto' : 'visible',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: isMobile ? 8 : 0,
            }}>
              {['description', 'additional', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 0',
                    background: 'none',
                    border: 'none',
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 600,
                    color: activeTab === tab ? '#e53935' : '#666',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      width: '100%',
                      height: 2,
                      background: '#e53935',
                      transition: 'all 0.3s ease',
                    }} />
                  )}
                </button>
              ))}
            </div>

            <div style={{
              padding: '20px 0',
              color: '#666',
              lineHeight: 1.6,
              fontSize: isMobile ? 14 : 16,
            }}>
              {activeTab === 'description' && (
                <div>
                  <p>{product.description.main}</p>
                  <br />
                  <p>Features:</p>
                  <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                    {product.description.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'additional' && (
                <div>
                  <p>Product Specifications:</p>
                  <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                    <li>Material: {product.additional.material}</li>
                    <li>Dimensions (Open): {product.additional.dimensions.open}</li>
                    <li>Dimensions (Folded): {product.additional.dimensions.folded}</li>
                  </ul>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div>
                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Free Mainland UK Delivery</h3>
                  <p style={{ marginBottom: 16 }}>We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>

                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Same-Day Dispatch</h3>
                  <p style={{ marginBottom: 16 }}>Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>

                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Delivery Timeframes</h3>
                  <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                    <li>Standard Delivery (Free): Estimated delivery within 2 to 5 working days.</li>
                    <li>Express Delivery (Paid): Delivered on the next working day.</li>
                  </ul>

                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Packaging Information</h3>
                  <p style={{ marginBottom: 16 }}>Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. This does not impact the quality or performance of the product.</p>

                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Order Tracking</h3>
                  <p style={{ marginBottom: 16 }}>A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>

                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Need Help?</h3>
                  <p style={{ marginBottom: 8 }}>If you experience any issues with your delivery, our customer service team is happy to assist.</p>
                  <p>
                    📧 Email: <a href="mailto:support@smart-living.co.uk" style={{ color: '#e53935', textDecoration: 'none' }}>support@smart-living.co.uk</a>
                    <br />
                    📞 Phone: <a href="tel:01384521170" style={{ color: '#e53935', textDecoration: 'none' }}>01384 521170</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 