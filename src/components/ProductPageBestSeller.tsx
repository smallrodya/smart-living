'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Magnifier } from 'react-image-magnifiers';

interface ProductDimensions {
  single: string;
  double: string;
  king: string;
  superKing: string;
}

interface ProductDescription {
  main: string;
  features: string[];
}

interface ProductAdditional {
  material: string;
  dimensions: ProductDimensions;
  washing: string;
  note: string;
  colors: string;
}

interface ProductSize {
  id: string;
  label: string;
}

interface Product {
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  images: string[];
  description: ProductDescription;
  additional: ProductAdditional;
  sizes: ProductSize[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

interface ProductPageBestSellerProps {
  product: Product;
}

const ProductPageBestSeller: React.FC<ProductPageBestSellerProps> = ({ product }) => {
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
    const itemId = `${product.title}_${product.selectedSize}`;
    const existing = basket.find((item: any) => item.id === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      basket.push({
        id: itemId,
        title: product.title,
        size: product.selectedSize,
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
          background: '#fff',
          borderRadius: 16,
          padding: isMobile ? 16 : 24,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}>
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
            marginBottom: 24,
          }}>
            <span style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 700,
              color: '#e53935',
            }}>
              {product.price}
            </span>
            <span style={{
              fontSize: isMobile ? 16 : 20,
              color: '#666',
              textDecoration: 'line-through',
            }}>
              {product.oldPrice}
            </span>
            {(() => {
              const priceNum = parseFloat((product.price || '').replace(/[^\d.]/g, ''));
              if (!isNaN(priceNum) && quantity > 1) {
                return (
                  <span style={{
                    fontSize: isMobile ? 18 : 22,
                    color: '#222',
                    fontWeight: 600,
                    marginLeft: 16,
                  }}>
                    = £{(priceNum * quantity).toFixed(2)}
                  </span>
                );
              }
              return null;
            })()}
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              color: '#222',
            }}>
              Choose An Option
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {product.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => product.onSizeChange(size.id)}
                  style={{
                    padding: '12px 16px',
                    border: `2px solid ${product.selectedSize === size.id ? '#e53935' : '#ddd'}`,
                    borderRadius: 8,
                    background: product.selectedSize === size.id ? '#fff5f5' : '#fff',
                    color: '#222',
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (product.selectedSize !== size.id) {
                      e.currentTarget.style.borderColor = '#e53935';
                      e.currentTarget.style.background = '#fff5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.selectedSize !== size.id) {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.background = '#fff';
                    }
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                style={{
                  width: 40,
                  height: 40,
                  border: 'none',
                  background: '#f5f5f5',
                  color: '#222',
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#eee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                }}
              >
                -
              </button>
              <span style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 500,
                color: '#222',
              }}>
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                style={{
                  width: 40,
                  height: 40,
                  border: 'none',
                  background: '#f5f5f5',
                  color: '#222',
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#eee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: isMobile ? 'stretch' : 'flex-start',
            width: isMobile ? '100%' : 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: isMobile ? '100%' : 'auto' }}>
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
                onClick={handleAddToBasket}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d32f2f';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#e53935';
                  e.currentTarget.style.transform = 'translateY(0)';
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
                background: '#fff',
                color: '#e53935',
                border: '2px solid #e53935',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff5f5';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            marginTop: 32,
            borderTop: '1px solid #eee',
            paddingTop: 24,
          }}>
            <div style={{
              display: 'flex',
              gap: 24,
              marginBottom: 24,
              borderBottom: '1px solid #eee',
            }}>
              <button
                onClick={() => setActiveTab('description')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'description' ? '#e53935' : '#666',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderBottom: activeTab === 'description' ? '2px solid #e53935' : 'none',
                }}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'additional' ? '#e53935' : '#666',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderBottom: activeTab === 'additional' ? '2px solid #e53935' : 'none',
                }}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'shipping' ? '#e53935' : '#666',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderBottom: activeTab === 'shipping' ? '2px solid #e53935' : 'none',
                }}
              >
                Shipping
              </button>
            </div>

            {activeTab === 'description' && (
              <div style={{
                color: '#444',
                fontSize: 16,
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}>
                {product.description.main}
              </div>
            )}

            {activeTab === 'additional' && (
              <div style={{
                color: '#444',
                fontSize: 16,
                lineHeight: 1.6,
              }}>
                <div style={{ marginBottom: 16 }}>
                  <strong>Material:</strong> {product.additional.material}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>Colors:</strong> {product.additional.colors}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>Dimensions:</strong>
                  <div style={{ marginTop: 8, whiteSpace: 'pre-line' }}>
                    {product.additional.dimensions[product.selectedSize as keyof ProductDimensions]}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>Washing Instructions:</strong> {product.additional.washing}
                </div>
                <div style={{ marginTop: 24, color: '#666', fontStyle: 'italic' }}>
                  {product.additional.note}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{
                color: '#444',
                fontSize: 16,
                lineHeight: 1.6,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Free Mainland UK Delivery</h3>
                <p style={{ marginBottom: 16 }}>We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>

                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Same-Day Dispatch</h3>
                <p style={{ marginBottom: 16 }}>Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>

                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Delivery Timeframes</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <li>Standard Delivery (Free): Estimated delivery within 2 to 5 working days.</li>
                  <li>Express Delivery (Paid): Delivered on the next working day.</li>
                </ul>

                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Packaging Information</h3>
                <p style={{ marginBottom: 16 }}>Your bedding set will be carefully packaged to ensure it arrives in perfect condition.</p>

                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Order Tracking</h3>
                <p style={{ marginBottom: 16 }}>A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>

                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>Need Help?</h3>
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
  );
};

export default ProductPageBestSeller; 