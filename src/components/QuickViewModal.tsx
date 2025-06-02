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
    <div className="modal-overlay">
      <div className="modal-container">
        <button
          onClick={onClose}
          className="close-button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="modal-content">
          {/* Left column - Images */}
          <div className="image-column">
            <div className="main-image">
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
                    <span className="discount-badge">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isHot && (
                    <span className="hot-badge">
                      HOT
                    </span>
                  )}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1))}
                        className="nav-button prev-button"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === (product.images?.length || 1) - 1 ? 0 : prev + 1))}
                        className="nav-button next-button"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="no-image">
                  No image
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="thumbnails-grid">
                {product.images.map((image, index) => (
                  <button
                    key={`thumb-${product._id}-${index}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`thumbnail-button ${currentImageIndex === index ? 'active' : ''}`}
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
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>

            {/* Price display */}
            <div className="price-display">
              {product.category === 'OUTDOOR' && product.outdoorPrice ? (
                <>
                  {product.discount ? (
                    <>
                      <span style={{
                        color: '#999',
                        textDecoration: 'line-through',
                        fontSize: '20px'
                      }}>
                        £{product.outdoorPrice.regularPrice.toFixed(2)}
                      </span>
                      <span style={{
                        color: '#e53935',
                        fontSize: '28px'
                      }}>
                        £{product.outdoorPrice.salePrice.toFixed(2)}
                      </span>
                      <span style={{
                        background: '#e53935',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '14px',
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
                      fontSize: '20px'
                    }}>
                      {getOriginalPriceRange(product)}
                    </span>
                    <span style={{
                      color: '#e53935',
                      fontSize: '28px'
                    }}>
                      {formatPriceRange(product)}
                    </span>
                    <span style={{
                      background: '#e53935',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px',
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
            <div className="product-sections">
              <button
                onClick={() => toggleSection('description')}
                className="section-button"
              >
                <h3 className="section-title">
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
                <p className="section-content">
                  {product.description}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="product-sections">
              <button
                onClick={() => toggleSection('features')}
                className="section-button"
              >
                <h3 className="section-title">
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
                <p className="section-content">
                  {product.features}
                </p>
              )}
            </div>

            {/* Shipping */}
            <div className="product-sections">
              <button
                onClick={() => toggleSection('shipping')}
                className="section-button"
              >
                <h3 className="section-title">
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
                <div className="section-content">
                  <div>
                    <h4>Free Mainland UK Delivery</h4>
                    <p>We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>
                  </div>

                  <div>
                    <h4>Same-Day Dispatch</h4>
                    <p>Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>
                  </div>

                  <div>
                    <h4>Delivery Timeframes</h4>
                    <p>Standard Delivery (Free): Estimated delivery within 2 to 5 working days.<br />
                    Express Delivery (Paid): Delivered on the next working day.</p>
                  </div>

                  <div>
                    <h4>Packaging Information</h4>
                    <p>Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. This does not impact the quality or performance of the product.</p>
                  </div>

                  <div>
                    <h4>Order Tracking</h4>
                    <p>A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>
                  </div>

                  <div>
                    <h4>Need Help?</h4>
                    <p>If you experience any issues with your delivery, our customer service team is happy to assist.</p>
                    <div>
                      <p>📧 Email: support@smart-living.co.uk</p>
                      <p>📞 Phone: 01384 521170</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sizes */}
            {(product.beddingSizes || product.throwsTowelsStylePrices || product.rugsMatsSizes || product.clothingStylePrices || product.footwearSizes) && (
              <div className="sizes-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                  {product.category === 'THROWS & TOWELS' || product.category === 'CLOTHING' ? 'Available Styles' : 'Available Sizes'}
                </h3>
                <div className="sizes-grid">
                  {product.footwearSizes?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(size.size)}
                      className={`size-button ${selectedSize === size.size ? 'active' : ''}`}
                    >
                      <span>{size.size}</span>
                      <div className="size-details">
                        <span className="price">
                          {formatPrice(product.discount 
                            ? size.salePrice * (1 - product.discount / 100)
                            : size.salePrice)}
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
                  {product.clothingStylePrices?.map((style, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(style.size)}
                      className={`size-button ${selectedSize === style.size ? 'active' : ''}`}
                    >
                      <span>{style.size}</span>
                      <div className="size-details">
                        <span className="price">
                          {formatPrice(product.discount 
                            ? style.salePrice * (1 - product.discount / 100)
                            : style.salePrice)}
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
                  {product.beddingSizes?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(size.size)}
                      className={`size-button ${selectedSize === size.size ? 'active' : ''}`}
                    >
                      <span>{size.size}</span>
                      <div className="size-details">
                        <span className="price">
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
                      className={`size-button ${selectedSize === size.size ? 'active' : ''}`}
                    >
                      <span>{size.size}</span>
                      <div className="size-details">
                        <span className="price">
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
              <div className="colors-section">
                <h3 className="section-title">
                  Available Colors
                </h3>
                <div className="colors-grid">
                  {product.beddingColors?.map((color, index) => (
                    <div
                      key={index}
                      className="color-box"
                    >
                      {color}
                    </div>
                  ))}
                  {product.throwsTowelsColors?.map((color, index) => (
                    <div
                      key={index}
                      className="color-box"
                    >
                      {color}
                    </div>
                  ))}
                  {product.rugsMatsColors?.map((color, index) => (
                    <div
                      key={index}
                      className="color-box"
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
                disabled={product.category !== 'OUTDOOR' && !selectedSize}
                className={`add-to-cart-button ${(product.category === 'OUTDOOR' || selectedSize) ? 'active' : 'disabled'}`}
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
                {product.category === 'OUTDOOR' ? 'Add to Cart' : (selectedSize ? 'Add to Cart' : 'Select Size')}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(5px);
        }

        .modal-container {
          background: #fff;
          border-radius: 24px;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
        }

        .image-column {
          width: 100%;
        }

        .main-image {
          width: 100%;
          height: 500px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .thumbnails-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 10px 0;
          width: 100%;
        }

        .product-info {
          padding: 20px 0;
        }

        .product-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #222;
          line-height: 1.2;
        }

        .price-display {
          color: #e53935;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .product-sections {
          margin-bottom: 32px;
        }

        .section-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          margin-bottom: ${openSection === 'description' || openSection === 'features' || openSection === 'shipping' ? '16px' : '0'};
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #222;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .section-content {
          color: #666;
          line-height: 1.8;
          font-size: 16px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin: 0;
        }

        .sizes-section {
          margin-bottom: 32px;
        }

        .sizes-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .size-button {
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #eee;
          background: transparent;
          color: #444;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          width: 100%;
          box-shadow: none;
        }

        .size-button:hover {
          border-color: #222;
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .size-button.active {
          border-color: #222;
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .colors-section {
          margin-bottom: 24px;
        }

        .colors-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .color-box {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #eee;
          background: #f8f9fa;
          color: #444;
          font-size: 14px;
          font-weight: 500;
        }

        .add-to-cart-button {
          width: 100%;
          padding: 20px;
          background: #222;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .add-to-cart-button.disabled {
          background: #ccc;
          cursor: not-allowed;
          box-shadow: none;
        }

        .add-to-cart-button.active {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .modal-container {
            max-height: 100vh;
            border-radius: 0;
            width: 100%;
            height: 100%;
          }

          .close-button {
            top: 12px;
            right: 12px;
            width: 36px;
            height: 36px;
          }

          .modal-content {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }

          .main-image {
            height: 300px;
            border-radius: 12px;
            margin-bottom: 12px;
          }

          .thumbnails-grid {
            gap: 8px;
          }

          .product-info {
            padding: 0;
          }

          .product-title {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .price-display {
            font-size: 24px;
            margin-bottom: 16px;
            flex-wrap: wrap;
          }

          .product-sections,
          .sizes-section {
            margin-bottom: 20px;
          }

          .colors-section {
            margin-bottom: 16px;
          }

          .add-to-cart-button {
            padding: 16px;
            font-size: 16px;
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
} 